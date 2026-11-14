#!/usr/bin/env python3
"""Scrape 7 Little Words daily + bonus puzzles from 7littlewordsanswers.com.

PRIVATE / PERSONAL USE ONLY. Output goes to content/borrowed/ (gitignored) and is
third-party content that must never be published or committed.

robots.txt for the site (checked 2026-11-14): "User-agent: * / Disallow:" (all allowed).
Requests are rate-limited (>= 1.2 s apart) and raw HTML is cached under
content/borrowed/_raw/7lwanswers/ so re-runs don't refetch.

Usage: python3 -I tools/scrape/scrape_7lwanswers.py [--days N] [--end YYYY-MM-DD]
"""
import argparse
import datetime as dt
import hashlib
import json
import pathlib
import re
import sys
import time
import urllib.robotparser

import requests
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "content" / "borrowed"
CACHE = OUT_DIR / "_raw" / "7lwanswers"
BASE = "https://7littlewordsanswers.com"
UA = "Mozilla/5.0 (compatible; personal-puzzle-research/1.0)"
DELAY = 1.2

session = requests.Session()
session.headers["User-Agent"] = UA
_last = [0.0]

rp = urllib.robotparser.RobotFileParser()


def fetch(url: str) -> str:
    if url.startswith("//"):
        url = "https:" + url
    elif url.startswith("/"):
        url = BASE + url
    key = hashlib.sha1(url.encode()).hexdigest()
    path = CACHE / f"{key}.html"
    if path.exists():
        return path.read_text(encoding="utf-8")
    if not rp.can_fetch(UA, url):
        raise RuntimeError(f"robots.txt disallows {url}")
    wait = DELAY - (time.time() - _last[0])
    if wait > 0:
        time.sleep(wait)
    for attempt in range(3):
        try:
            r = session.get(url, timeout=30)
            _last[0] = time.time()
            if r.status_code == 200:
                path.write_text(r.text, encoding="utf-8")
                return r.text
            if r.status_code == 404:
                return ""
            print(f"  HTTP {r.status_code} {url}", file=sys.stderr)
        except requests.RequestException as e:
            print(f"  error {e} {url}", file=sys.stderr)
        time.sleep(5 * (attempt + 1))
    return ""


def norm(s: str) -> str:
    return re.sub(r"[^A-Z]", "", s.upper())


def clean_clue(s: str) -> str:
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip()


def parse_puzzle_page(html: str):
    """Return list of (clue, letters, href) from the first table on a puzzle page."""
    soup = BeautifulSoup(html, "lxml")
    table = soup.find("table")
    rows = []
    if not table:
        return rows
    for tr in table.select("tbody tr"):
        tds = tr.find_all("td")
        a = tr.find("a")
        if len(tds) < 3 or not a:
            continue
        m = re.search(r"(\d+)", tds[2].get_text())
        rows.append((clean_clue(a.get_text()), int(m.group(1)) if m else None, a["href"]))
    return rows


def parse_answer(html: str, letters, puzzle_url: str):
    """Answer from a clue page, only if that page belongs to puzzle_url.

    Clue pages are keyed by clue text, so a clue reused on another date shows that
    other date's answer. If the page's back-link points at our puzzle it is verified;
    otherwise we still accept it when the letter count matches (identical clue text +
    identical length is almost always the same answer), and reject it when not.
    """
    soup = BeautifulSoup(html, "lxml")
    target = puzzle_url.split("://", 1)[-1].split("/", 1)[-1]
    links = {(a.get("href") or "").rstrip("/").split("7littlewordsanswers.com/")[-1].lstrip("/")
             for a in soup.find_all("a")}
    if target not in links and not letters:
        return None
    cands = [norm(b.get_text()) for box in soup.select(".answer_box") for b in box.find_all("b")]
    cands = [c for c in cands if c]
    if letters:
        match = [c for c in cands if len(c) == letters]
        if match:
            return match[0]
        return None
    return cands[0] if cands else None


def date_slug(d: dt.date) -> str:
    return f"{d.strftime('%B').lower()}-{d.day}-{d.year}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=40)
    ap.add_argument("--end", default="2026-11-13")
    args = ap.parse_args()

    CACHE.mkdir(parents=True, exist_ok=True)
    # fetch robots.txt with our UA (urllib's default UA gets a 403 -> disallow-all)
    rp.parse(session.get(BASE + "/robots.txt", timeout=30).text.splitlines())

    retrieved = dt.date.today().isoformat()
    end = dt.date.fromisoformat(args.end)
    kinds = [("daily", "7-little-words-daily", "Daily"),
             ("bonus1", "7-little-words-bonus", "Bonus 1"),
             ("bonus2", "7-little-words-bonus-2", "Bonus 2"),
             ("bonus3", "7-little-words-bonus-3", "Bonus 3"),
             ("bonus4", "7-little-words-bonus-4", "Bonus 4")]
    puzzles, skipped = [], 0
    out_path = OUT_DIR / "puzzles-7littlewordsanswers.json"
    for i in range(args.days):
        d = end - dt.timedelta(days=i)
        for kind, prefix, label in kinds:
            url = f"{BASE}/{prefix}-{date_slug(d)}-answers"
            html = fetch(url)
            rows = parse_puzzle_page(html) if html else []
            if len(rows) != 7:
                print(f"skip {url}: {len(rows)} clues", file=sys.stderr)
                skipped += 1
                continue
            cas = []
            for clue, letters, href in rows:
                ans = parse_answer(fetch(href), letters, url)
                if not ans:
                    break
                cas.append({"clue": clue, "answer": ans})
            if len(cas) != 7 or len({c["answer"] for c in cas}) != 7:
                print(f"skip {url}: incomplete answers", file=sys.stderr)
                skipped += 1
                continue
            puzzles.append({
                "id": f"7lwa-{d.isoformat()}-{kind}",
                "title": f"7 Little Words {label} {d.strftime('%b')} {d.day} {d.year}",
                "theme": None,
                "clueAnswers": cas,
                "source": "borrowed",
                "sourceName": "7LittleWordsAnswers.com (fan answer site for Blue Ox Family Games' 7 Little Words)",
                "sourceUrl": url,
                "retrievedAt": retrieved,
            })
            print(f"ok {d} {kind}: {[c['answer'] for c in cas]}", flush=True)
        # checkpoint after each day
        out_path.write_text(json.dumps(puzzles, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"done: {len(puzzles)} puzzles, {skipped} skipped -> {out_path}")


if __name__ == "__main__":
    main()
