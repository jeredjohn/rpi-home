from flask import Blueprint, render_template, jsonify
from flask_login import login_required

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(21, GPIO.OUT)
GPIO.setup(17, GPIO.OUT)

devices_bp = Blueprint("devices", __name__)


@devices_bp.route('/devices')
def devices():
    """
    Device script using RPI.GPIO
    """
    fan_status = GPIO.input(21)
    lamp_status = GPIO.input(17)
    
    def get_status(device):
        if device == 0:
            device = "On"
        else:
            device = "Off"
        return device
    
    fan_status = get_status(fan_status)
    lamp_status = get_status(lamp_status)

    gpio_data = {
        'lamp_status': lamp_status,
        'fan_status': fan_status,
    }            
    # http GET response
    response = jsonify(gpio_data)
    # Access-Control-Allow-Origin
    response.headers.add("Access-Control-Allow-Origin", "*")
    return render_template('devices/index.html', **gpio_data)


@devices_bp.route("/devices/<deviceName>/<action>")
def action(deviceName, action):
    if deviceName == 'lamp':
        if action == 'on':
            GPIO.output(17, 0)
        else: 
            GPIO.output(17, 1)            
    if deviceName == 'fan':
        if action == 'on':
            GPIO.output(21, 0)
        else: 
            GPIO.output(21, 1)
    gpio_data = {}

    fan_status = GPIO.input(21)
    lamp_status = GPIO.input(17)
    def get_status(device):
        if device == 0:
            device = "On"
        else:
            device = "Off"
        return device    
    fan_status = get_status(fan_status)
    lamp_status = get_status(lamp_status)

    gpio_data['fan_status'] = fan_status
    gpio_data['lamp_status'] = lamp_status
    gpio_data['device_status'] = action.title()
    gpio_data['device_name'] = deviceName.title()
    gpio_data['img_src'] = '/static/vendors/images/' + deviceName + '-' + action + '.webp'
    return render_template('devices/index.html', **gpio_data)

