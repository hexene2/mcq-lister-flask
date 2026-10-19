import json, os, random
from pathlib import Path

topics = {
    "maths": [
        "Limits", "Matrices", "Probability", "Binomial Distribution",
        "Continuity", "Differentiation", "Integration"
    ],
    "chemistry": [
        "Some Basic Concepts of Chemistry", "Structure of Atom",
        "Chemical Bonding and Molecular Structure", "Thermodynamics",
        "Chemical Equilibrium", "Solutions", "Electrochemistry",
        "Chemical Kinetics", "General Organic Chemistry", "Hydrocarbons",
        "Coordination Compounds", "Amines", "Biomolecules"
    ],
    "physics": [
        "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane",
        "Laws of Motion", "Work, Energy and Power", "Rotational Motion",
        "Gravitation", "Thermodynamics", "Oscillations", "Waves",
        "Electrostatics", "Current Electricity", "Electromagnetic Induction",
        "Ray Optics", "Wave Optics", "Modern Physics", "Semiconductor Electronics"
    ],
    "biology": [
        "The Living World", "Biological Classification", "Plant Kingdom",
        "Animal Kingdom", "Cell: The Unit of Life", "Biomolecules",
        "Cell Cycle and Cell Division", "Human Physiology", "Human Reproduction",
        "Genetics and Evolution", "Human Health and Disease", "Biotechnology",
        "Ecology and Environment"
    ]
}

# Five UI-test question patterns per subject. These deliberately test the app's
# question/answers/correctAnswer/explanation/ELO handling, not exam readiness.
banks = {
    "maths": [
        ("Which expression is most directly associated with {topic}?",
         ["A limit", "A chromosome", "An electric circuit", "A food chain"], "A",
         "{topic} is a mathematics topic; limits are a mathematical concept."),
        ("If a question has four answer choices, how many items should its answers array contain?",
         ["2", "3", "4", "5"], "C",
         "The app schema uses exactly four choices in the answers array."),
        ("Which value is within the supported ELO range of 0 to 3000?",
         ["-100", "1500", "3500", "5000"], "B",
         "1500 lies between 0 and 3000."),
        ("Which field stores the letter of the correct option?",
         ["question", "elo", "correctAnswer", "explanation"], "C",
         "correctAnswer stores A, B, C, or D."),
        ("Which field should contain the working or reasoning for a solution?",
         ["answers", "explanation", "elo", "correctAnswer"], "B",
         "The explanation field contains the reasoning behind the answer.")
    ],
    "chemistry": [
        ("Which subject studies {topic}?",
         ["Chemistry", "Astronomy only", "Literature", "Geography"], "A",
         "{topic} is a topic in chemistry."),
        ("Which particle has a negative electric charge?",
         ["Proton", "Neutron", "Electron", "Alpha particle"], "C",
         "An electron carries a negative charge."),
        ("Which symbol represents the chemical element oxygen?",
         ["O", "Ox", "Oy", "Og"], "A",
         "The chemical symbol for oxygen is O."),
        ("At approximately room temperature, what is the pH of pure neutral water?",
         ["2", "5", "7", "12"], "C",
         "Pure water is approximately neutral at pH 7 at room temperature."),
        ("Which field in this dataset stores the solution reasoning?",
         ["elo", "answers", "explanation", "correctAnswer"], "C",
         "The explanation field stores the reasoning.")
    ],
    "physics": [
        ("Which subject studies {topic}?",
         ["Physics", "Botany only", "Grammar", "Political science"], "A",
         "{topic} is a topic in physics."),
        ("What is the SI unit of force?",
         ["Joule", "Newton", "Watt", "Pascal"], "B",
         "Force is measured in newtons (N)."),
        ("What is the SI unit of electric current?",
         ["Volt", "Ohm", "Ampere", "Coulomb"], "C",
         "Electric current is measured in amperes (A)."),
        ("Which quantity is a scalar?",
         ["Displacement", "Velocity", "Acceleration", "Mass"], "D",
         "Mass has magnitude but no direction, so it is a scalar."),
        ("Which field stores a question's difficulty rating?",
         ["answers", "elo", "question", "explanation"], "B",
         "The elo field stores the question's rating.")
    ],
    "biology": [
        ("Which subject studies {topic}?",
         ["Biology", "Algebra only", "Geology only", "Mechanics only"], "A",
         "{topic} is a topic in biology."),
        ("Which structure is commonly called the basic unit of life?",
         ["Cell", "Atom", "Tissue only", "Organ system"], "A",
         "The cell is the basic structural and functional unit of life."),
        ("Which molecule commonly stores hereditary information?",
         ["DNA", "Starch", "Water", "Cellulose"], "A",
         "DNA stores hereditary information in most organisms."),
        ("Which organelle is the main site of aerobic cellular respiration in eukaryotic cells?",
         ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"], "B",
         "Mitochondria are the main site of aerobic cellular respiration in eukaryotic cells."),
        ("Which field stores the explanation for a quiz answer?",
         ["elo", "answers", "explanation", "correctAnswer"], "C",
         "The explanation field stores the answer reasoning.")
    ]
}

elo_values = [100, 500, 900, 1300, 1800]
data = []

for subject, chapter_names in topics.items():
    subject_obj = {}
    for chapter in chapter_names:
        qs = []
        for i, (stem, options, correct, explanation) in enumerate(banks[subject]):
            qs.append({
                "question": stem.format(topic=chapter),
                "elo": elo_values[i],
                "answers": options[:],
                "correctAnswer": correct,
                "explanation": explanation.format(topic=chapter)
            })
        subject_obj[chapter] = {"questions": qs}
    data.append({subject: subject_obj})

out = Path("data1.json")
out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

# Validate JSON and summarize coverage.
loaded = json.loads(out.read_text(encoding="utf-8"))
counts = {subject: sum(len(ch["questions"]) for ch in item[subject].values())
          for item in loaded for subject in item}
total_topics = sum(len(chapters) for chapters in topics.values())
total_questions = sum(counts.values())

print(f"Created: {out}")
print(f"Topics: {total_topics}")
print(f"Questions: {total_questions} ({total_questions // total_topics} per topic)")
print("Questions by subject:", counts)
print("JSON validation: passed")
