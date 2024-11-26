from flask import Flask, render_template
import RPi.GPIO as GPIO

app = Flask(__name__)

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
LED_PIN = 16
GPIO.setup(LED_PIN, GPIO.OUT)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pinon')
def pin_on():
    GPIO.output(LED_PIN, GPIO.HIGH)
    return "Pin is turned ON"


@app.route('/pinoff')
def pin_off():
    GPIO.output(LED_PIN, GPIO.LOW)
    return "Pin is turned OFF"


if __name__ == '__main__':
    try:
        app.run(debug=True)
    finally:
        GPIO.cleanup()
