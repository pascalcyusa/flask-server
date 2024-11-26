from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pinon')
def pin_on():
    # Simulate turning the pin on
    return "Pin is turned ON"


@app.route('/pinoff')
def pin_off():
    # Simulate turning the pin off
    return "Pin is turned OFF"


if __name__ == '__main__':
    app.run(debug=True)
