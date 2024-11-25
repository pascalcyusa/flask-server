from flask import Flask, render_template, jsonify
import RPi.GPIO as GPIO
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Set up GPIO
GPIO.setmode(GPIO.BOARD)
GPIO.setup(16, GPIO.OUT)
GPIO.output(16, GPIO.LOW)  # Ensure the LED is off initially


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/pinon')
def pin_on():
    try:
        GPIO.output(16, GPIO.HIGH)  # Turn the LED on
        return 'I turned on the pin.'
    except Exception as e:
        app.logger.error(f"Error turning on the pin: {e}")
        return jsonify(error=str(e)), 500


@app.route('/pinoff')
def pin_off():
    try:
        GPIO.output(16, GPIO.LOW)  # Turn the LED off
        return 'I turned off the pin.'
    except Exception as e:
        app.logger.error(f"Error turning off the pin: {e}")
        return jsonify(error=str(e)), 500


@app.teardown_appcontext
def cleanup_gpio(exception):
    GPIO.cleanup()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
