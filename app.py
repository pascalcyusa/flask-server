from flask import Flask, send_from_directory
import RPi.GPIO as GPIO

app = Flask(__name__, static_folder='dist')

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Robot car setup (adjust these pins according to your car's configuration)
MOTOR_A_PIN = 17
MOTOR_B_PIN = 18
GPIO.setup(MOTOR_A_PIN, GPIO.OUT)
GPIO.setup(MOTOR_B_PIN, GPIO.OUT)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/dist/<path:path>')
def send_dist(path):
    return send_from_directory('dist', path)


if __name__ == '__main__':
    app.run(debug=True)


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
