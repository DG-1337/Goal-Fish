from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from flask import redirect, render_template, url_for
from website.models import Goal, User
from . import db
import json

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():

    if request.method == "POST":
        goal = request.form.get('goal')

        if len(goal) < 1:
            flash('Goal is too short!', category="error")

        else:
            new_goal = Goal(data=goal, user_id=current_user.id)
            db.session.add(new_goal)
            db.session.add(current_user)
            db.session.commit()
            flash('Goal successfully added', category='success')

    return render_template('home.html', user=current_user)


@views.route('/delete-goal', methods=['POST'])
def delete_goal():  
    goal = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    goalId = goal['goalId']
    goal = Goal.query.get(goalId)
    if goal:
        if goal.user_id == current_user.id:
            db.session.delete(goal)
            db.session.commit()

    return jsonify({})
