from flask import Blueprint, render_template
from flask_login import login_required

devices_bp = Blueprint("devices", __name__)

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#define actuators GPIOs
lamp = 21

#initialize GPIO status variables
lampSts = 0

# Define led pins as output
GPIO.setup(lamp, GPIO.OUT)   

# turn leds OFF 
GPIO.output(lamp, GPIO.LOW)

@devices_bp.route('/devices')
def devices():
    # Read Sensors Status
    lampSts = GPIO.input(lamp)
    templateData = {
        'title' : 'GPIO output Status!',
        'lamp'  : lampSts
    }
    print(lampSts)
    return render_template('devices/index.html', **templateData)

@devices_bp.route("/devices/<deviceName>/<action>")
def action(deviceName, action):
	if deviceName == 'lamp':
		actuator = lamp
	if action == "on":
		GPIO.output(actuator, GPIO.HIGH)
	if action == "off":
		GPIO.output(actuator, GPIO.LOW)
	lampSts = GPIO.input(lamp)
	templateData = {'lamp'  : lampSts}
	return render_template('devices/index.html', **templateData)
