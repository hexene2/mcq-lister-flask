
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


@app.route("/study")
def study():
    return render_template("extend.html")


@app.route("/edit")
def edit():
    return render_template("edit.html")


@app.route("/settings")
def settings():
    return render_template("settings.html")




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
