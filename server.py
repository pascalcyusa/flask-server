from flask import Flask, render_template
import RPi.GPIO as GPIO

app = Flask(__name__)

# Set up GPIO
def setup_gpio():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BOARD)
    GPIO.setup(16, GPIO.OUT)
    GPIO.output(16, GPIO.LOW)  # Ensure the LED is off initially

setup_gpio()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pinon')
def pin_on():
    setup_gpio()
    GPIO.output(16, GPIO.HIGH)  # Turn the LED on
    return 'I turned on the pin.'


@app.route('/pinoff')
def pin_off():
    setup_gpio()
    GPIO.output(16, GPIO.LOW)  # Turn the LED off
    return 'I turned off the pin.'


@app.teardown_appcontext
def cleanup_gpio(exception):
    GPIO.cleanup()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
