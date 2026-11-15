import json, sys, glob, os
sys.path.insert(0, '.')
T = [
("S01","Particle Zoo",False,"NEUTRINO HADRON LEPTON FERMION POSITRON GRAVITON TACHYON GLUON BOSON MESON COLLIDER"),
("S02","Plant Anatomy",False,"STAMEN XYLEM PHLOEM STOMATA CAMBIUM RHIZOME TENDRIL CUTICLE MERISTEM COTYLEDON RECEPTACLE PERIANTH EPIDERMIS"),
("S03","Neuroscience",False,"NEURON SYNAPSE DENDRITE MYELIN CEREBELLUM AMYGDALA DOPAMINE SEROTONIN CORTEX THALAMUS NEOCORTEX"),
("S04","Landmark Experiments",True,"MILLIKAN RUTHERFORD PAVLOV MICHELSON CAVENDISH FOUCAULT MENDEL GALVANI PASTEUR MILGRAM EDDINGTON"),
("S05","Measuring Instruments",False,"BAROMETER HYGROMETER SEXTANT CALIPER THEODOLITE ASTROLABE GYROSCOPE MICROMETER PIPETTE BURETTE SPIROMETER"),
("S06","Fossil Record",True,"TRILOBITE AMMONITE COPROLITE GASTROLITH MEGALODON MASTODON PTEROSAUR CAMBRIAN JURASSIC TRIASSIC AMBER"),
("S07","Organic Chemistry",False,"BENZENE ALDEHYDE POLYMER KETONE ISOMER AROMATIC METHANOL ACETONE ENANTIOMER TOLUENE PROPANE CARBOXYL"),
("S08","Eponymous Units",True,"FAHRENHEIT CELSIUS RANKINE ANGSTROM OERSTED MAXWELL ROENTGEN BECQUEREL COULOMB SIEVERT AMPERE NEWTON"),
("S09","Microbiology",False,"BACILLUS PLASMID FLAGELLUM MICROBE PATHOGEN ARCHAEA BIOFILM SPIROCHETE CULTURE PENICILLIN PROKARYOTE"),
("S10","Natural Selection",True,"DARWIN ADAPTATION MUTATION SPECIATION GALAPAGOS FITNESS HOMOLOGY VESTIGIAL PHYLOGENY ANCESTOR LAMARCK WALLACE"),
("S11","Thermodynamics",True,"ENTROPY ENTHALPY ADIABATIC ISOTHERMAL CARNOT CONVECTION CONDUCTION ISOBARIC EXOTHERMIC LATENT BOLTZMANN"),
("S12","Oceanography",True,"SALINITY HALOCLINE TSUNAMI CORIOLIS BATHYMETRY ABYSSAL TRENCH MARIANA PLANKTON ESTUARY UPWELLING"),
("S13","Immune System",False,"ANTIBODY ANTIGEN LYMPHOCYTE VACCINE MACROPHAGE HISTAMINE INTERFERON THYMUS IMMUNITY ALLERGEN"),
("S14","Mohs and Minerals",False,"QUARTZ FELDSPAR GYPSUM CALCITE PYRITE MAGNETITE HEMATITE CORUNDUM FLUORITE TOPAZ APATITE"),
("S15","Quantum Weirdness",True,"PLANCK HEISENBERG TUNNELING QUANTUM PAULI DIRAC EIGENSTATE QUBIT COPENHAGEN FEYNMAN SPINOR PHOTON ENTANGLE ORBITAL"),
("S16","Fungus Among Us",False,"MYCELIUM HYPHAE TRUFFLE MOREL LICHEN YEAST PORCINI SHIITAKE CHITIN AMANITA MYCOLOGY TOADSTOOL"),
("S17","Women in Science",True,"SOMERVILLE HERSCHEL MEITNER NOETHER LEAVITT GOODALL BURNELL MIRZAKHANI CHATELET GERMAIN DOUDNA ANNING CARSON"),
("S18","Cosmology",True,"INFLATION HUBBLE MULTIVERSE WORMHOLE QUASAR LEMAITRE HORIZON ANISOTROPY MICROWAVE EXPANSION PENZIAS GAMOW"),
("S19","Biochemistry",False,"ENZYME PROTEIN GLUCOSE LIPID PEPTIDE NUCLEOTIDE HEMOGLOBIN INSULIN COLLAGEN KERATIN SUBSTRATE GLYCOGEN"),
("S20","Taxonomy",True,"KINGDOM PHYLUM SPECIES LINNAEUS BINOMIAL CLADE VERTEBRATE ARTHROPOD MOLLUSK CHORDATE TAXON ECHINODERM CNIDARIAN AMPHIBIAN PRIMATE"),
]
used = {e['answer'] for r in json.load(open('../../content/puzzles.json')) for e in r['clueAnswers']}
for f in glob.glob('../../content/generated/batch-00[1-6].json'):
    used |= {e['answer'] for r in json.load(open(f)) for e in r['clueAnswers']}
for f in ('work/manual_sets-007.json', 'work/manual_sets-008.json'):
    if os.path.exists(f):
        used |= {w.upper() for m in json.load(open(f)) for w in m['words']}
import tiling as Tl, lexicon as lx
def nugly(x):
    g = Tl.good_tilings(x)
    return 99 if not g else sum(lx.ugly_boundaries(t, i == 0, i == len(g[0]) - 1) for i, t in enumerate(g[0]))
VET = '--vet' in sys.argv
out, vet = [], []
for fid, th, pn, ws in T:
    w, info = [], []
    for x in ws.split():
        if x in used: info.append(x + ':USED'); continue
        if not 5 <= len(x) <= 10: info.append(x + ':LEN'); continue
        u = nugly(x)
        if u == 99: info.append(x + ':NOTILE'); continue
        ok, why = lx.answer_ok(x)
        if not ok:
            if 'rare' in why or 'dictionary' in why: vet.append(x)
            else: info.append(x + ':' + why); continue
        w.append((x, u))
    allow = 1 if sum(1 for _, u in w if u == 0) < 7 else 0
    kept = [x for x, u in w if u == 0] + [x for x, u in w if u > 0][:allow]
    info += [x + ':UGLY' for x, u in w if x not in kept]
    out.append({"id": fid, "category": "themed", "theme": th, "allowProperNouns": pn, "words": kept})
    print(fid, len(kept), ' '.join('·'.join(Tl.good_tilings(x)[0]) for x in kept), '| dropped', info)
json.dump(out, open('work/manual_sets-009.json', 'w'), indent=1)
vet = [x for x in dict.fromkeys(vet) if any(x in m['words'] for m in out)]
print('to vet:', vet)
json.dump(vet, open(sys.argv[-1] if sys.argv[-1].endswith('.json') else '/dev/null','w'))
if VET:
    p = 'data/vetted_words.txt'; have = set(open(p).read().split())
    new = [x.lower() for x in vet if x.lower() not in have]
    if new:
        open(p, 'a').write('# batch 009 science rounds\n' + '\n'.join(new) + '\n')
