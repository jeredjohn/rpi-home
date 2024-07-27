from flask import Blueprint, render_template
from flask_login import login_required

devices_bp = Blueprint("devices", __name__)

@login_required
@devices_bp.route("/devices")
def devices():
    return render_template("devices/index.html")
