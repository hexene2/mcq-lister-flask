from pathlib import Path
import json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
DATA_FILE = Path(__file__).parent / "static" / "data" / "data.json"


def load_questions():
    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def save_questions(data):
    # Keep the app's existing JSON structure: a one-item list containing subjects.
    if not isinstance(data, list) or len(data) != 1 or not isinstance(data[0], dict):
        raise ValueError("Expected a list containing one subject object")
    with DATA_FILE.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
        file.write("\n")


@app.route("/")
def index():
    return render_template("dashboard.html")


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/study")
def study():
    return render_template("study.html")


@app.route("/edit")
def edit():
    return render_template("edit.html")


@app.route("/settings")
def settings():
    return render_template("settings.html")


@app.route("/api/questions", methods=["GET", "POST"])
def questions_api():
    if request.method == "GET":
        return jsonify(load_questions())
    data = request.get_json(silent=True)
    try:
        save_questions(data)
    except (ValueError, TypeError) as error:
        return jsonify({"error": str(error)}), 400
    return jsonify({"message": "Questions saved"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
