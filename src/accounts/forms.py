from flask_wtf import FlaskForm
from wtforms import EmailField, PasswordField
from wtforms.validators import DataRequired, Email, EqualTo, Length

from src.accounts.models import User


class LoginForm(FlaskForm):
    email = EmailField("", validators=[DataRequired(), Email()])
    password = PasswordField("", validators=[DataRequired()])


class RegisterForm(FlaskForm):
    email = EmailField("", validators=[DataRequired(), Email(message=None), Length(min=6, max=40)])
    password = PasswordField("", validators=[DataRequired(), Length(min=6, max=25)])
    confirm = PasswordField("", validators=[DataRequired(), EqualTo("password", message="Passwords must match.")])

    def validate(self):
        initial_validation = super(RegisterForm, self).validate()
        if not initial_validation:
            return False
        user = User.query.filter_by(email=self.email.data).first()
        if user:
            self.email.errors.append("Email already registered")
            return False
        if self.password.data != self.confirm.data:
            self.password.errors.append("Passwords must match")
            return False
        return True
