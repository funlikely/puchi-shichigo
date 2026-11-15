import json, sys
sys.path.insert(0, '.')
T = [
("F01","Taskmaster: Champions","WIDDICOMBE BECKETT FIELDING MORTIMER TARBUCK GODLIMAN HERRING GAMBLE ZALTZMAN BAYNTON ROBINS KENDALL"),
("F02","Taskmaster: Behind the Tasks","HORNE DAVIES CHISWICK SECTION GILBERT FRINGE WELLS CHAMPIONS PRIZETASK TIEBREAK GOLDENHEAD"),
("F03","Star Trek: Crew Manifest","PICARD RIKER SCOTTY SISKO QUARK GUINAN JANEWAY CHEKOV UHURA SPOCK NEELIX TUVOK LAFORGE CRUSHER CHAKOTAY BASHIR TORRES ARCHER GARAK"),
("F04","Star Trek: Final Frontier","KOBAYASHI TRIBBLE DILITHIUM HORTA BETAZOID FERENGI ROMULAN HOLODECK DEFIANT REDSHIRT TALAXIAN BAJORAN CARDASSIAN"),
("F05","They Might Be Giants: Songbook","ISTANBUL BIRDHOUSE PARTICLE TRIANGLE FINGERTIPS MIASMA ENSOR GILGAMESH HAMMURABI SARGON NIGHTLIGHT"),
("F06","They Might Be Giants: Band Lore","FLANSBURGH LINNELL LINCOLN APOLLO FLOOD DIALASONG HOTDOG MALCOLM NANOBOTS QUIXOTE MAMMAL MINKCAR"),
("F07","Cosmere: Mistborn","ALLOMANCY FERUCHEMY HEMALURGY KELSIER SAZED WAXILLIUM WAYNE KANDRA TENSOON ATIUM LERASIUM INQUISITOR SCADRIAL"),
("F08","Cosmere: Roshar and Beyond","STORMLIGHT KALADIN SHALLAN DALINAR ADOLIN PATTERN WYNDLE NIGHTBLOOD WARBREAKER ELANTRIS TRESS SHADESMAR LIGHTSONG"),
("F09","The Good Place: Residents","ELEANOR CHIDI TAHANI JANET MICHAEL SHAWN DEREK MINDY KAMILAH JIANYU PILLBOI SIMONE BRENT VICKY HYPATIA TRENT GLENN"),
("F10","The Good Place: Afterlife Lore","BEARIMY SHIRTBALLS BORTLES JAGUARS MOLOTOV TROLLEY SCANLON FROYO ARIZONA MEDIUM SOULMATE ARCHITECT JUDGE POINTS"),
("F11","Project Hail Mary: Crew","RYLAND ROCKY ERIDIAN STRATT ILYUKHINA TEACHER AMNESIA AMAZE BLIPA ADRIAN AMMONIA CHORDS RADIATION SPIDER PRESSURE"),
("F12","Project Hail Mary: Science","ASTROPHAGE TAUMOEBA TAUCETI XENONITE PETROVA BEETLES SAHARA ANTARCTICA HAILMARY CENTRIFUGE"),
]
used = set(json.load(open('/tmp/claude-1000/-home-logstar-code-github-funlikely-puchi-shichigo/36e3ca03-cb83-47e7-90a8-d2b456079ce4/scratchpad/used.json')))
used |= {e['answer'] for r in json.load(open('../../content/generated/batch-005.json')) for e in r['clueAnswers']}
import tiling as Tl, lexicon as lx
def ugly(x):
    g = Tl.good_tilings(x)
    return not g or any(lx.ugly_boundaries(t, i == 0, i == len(g[0]) - 1) for i, t in enumerate(g[0]))
out = []
vet = []
for fid, th, ws in T:
    w = [x for x in ws.split() if x not in used and 5 <= len(x) <= 10]
    vet += w
    out.append({"id": fid, "category": "themed", "theme": th, "allowProperNouns": True, "words": w})
json.dump(out, open('work/manual_sets-006.json', 'w'), indent=1)
p = 'data/vetted_words.txt'; s = open(p).read(); have = set(s.split())
new = [x.lower() for x in dict.fromkeys(vet) if x.lower() not in have]
if new:
    open(p, 'a').write('# batch 006 fandom rounds\n' + '\n'.join(new) + '\n')
lx.vetted.cache_clear() if hasattr(lx.vetted, 'cache_clear') else None
for m in out:
    print(m['id'], len(m['words']), 'ugly:', [x for x in m['words'] if ugly(x)])
