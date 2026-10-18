from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/v2")
def v2():
    return render_template("extend.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)