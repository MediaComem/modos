from flask import Flask, render_template, url_for, request, redirect
from flask_bootstrap import Bootstrap

import os
import model

app = Flask(__name__, template_folder='Template')
Bootstrap(app)

"""
Routes
"""
@app.route('/', methods=['GET','POST'])
def index():
    if request.method == 'POST':
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            if not os.path.exists('static'):
                os.makedirs('static')
            image_path = os.path.join('static', uploaded_file.filename)
            uploaded_file.save(image_path)

            has_problem = request.form.get('problem')

            class_name = model.predict(image_path, has_problem)
            result = {
                'class_name': class_name,
                'image_path': image_path,
            }
            return render_template('result.html', result = result)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug = True)