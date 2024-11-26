from flask import Flask, render_template, jsonify, send_from_directory
import RPi.GPIO as GPIO
import os

app = Flask(__name__, static_folder='static')

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# LED setup
LED_PIN = 16
GPIO.setup(LED_PIN, GPIO.OUT)

# Robot car setup (adjust these pins according to your car's configuration)
MOTOR_A_PIN = 17
MOTOR_B_PIN = 18
GPIO.setup(MOTOR_A_PIN, GPIO.OUT)
GPIO.setup(MOTOR_B_PIN, GPIO.OUT)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


@app.route('/pinon')
def pin_on():
    GPIO.output(LED_PIN, GPIO.HIGH)
    return "Pin is turned ON"


@app.route('/pinoff')
def pin_off():
    GPIO.output(LED_PIN, GPIO.LOW)
    return "Pin is turned OFF"


@app.route('/<command>')
def handle_command(command):
    if command == 'moveup':
        # Implement forward movement
        GPIO.output(MOTOR_A_PIN, GPIO.HIGH)
        GPIO.output(MOTOR_B_PIN, GPIO.HIGH)
        return jsonify({"status": "Moving forward"})
    elif command == 'movedown':
        # Implement backward movement
        GPIO.output(MOTOR_A_PIN, GPIO.LOW)
        GPIO.output(MOTOR_B_PIN, GPIO.LOW)
        return jsonify({"status": "Moving backward"})
    elif command == 'moveleft':
        # Implement left turn
        GPIO.output(MOTOR_A_PIN, GPIO.LOW)
        GPIO.output(MOTOR_B_PIN, GPIO.HIGH)
        return jsonify({"status": "Turning left"})
    elif command == 'moveright':
        # Implement right turn
        GPIO.output(MOTOR_A_PIN, GPIO.HIGH)
        GPIO.output(MOTOR_B_PIN, GPIO.LOW)
        return jsonify({"status": "Turning right"})
    elif command == 'stop':
        # Implement stop
        GPIO.output(MOTOR_A_PIN, GPIO.LOW)
        GPIO.output(MOTOR_B_PIN, GPIO.LOW)
        return jsonify({"status": "Stopped"})
    elif command == 'speedup':
        # Implement speed increase (you might need PWM for this)
        return jsonify({"status": "Increasing speed"})
    else:
        return jsonify({"status": "Invalid command"})


if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=5001, debug=True)
    finally:
        GPIO.cleanup()
