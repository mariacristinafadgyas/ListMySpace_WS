from flask import Flask, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route('/register', methods=['GET'])
def registration():
    """Renders the registration page."""
    return render_template("register.html")


@app.route('/login', methods=['GET'])
def login():
    """Renders the login page."""
    return render_template("login.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
