import os
import tensorflow as tf
import numpy as np
import json
import requests

SIZE=160
TANSERFLOW_SERVE_URI= os.environ.get('TANSERFLOW_SERVE_URI') or 'http://localhost:8501'
BINARY_URI=TANSERFLOW_SERVE_URI + '/v1/models/binary:predict'
CATEGORICAL_URI=TANSERFLOW_SERVE_URI + '/v1/models/categorical:predict'

problem_categories = ["Curb Ramp", "Missing Curb Ramp", "Obstacle", "Surface Problem", "Width", "Security", "Slope", "Other"]

def get_prediction(image, binary=True):
    uri = BINARY_URI if binary else CATEGORICAL_URI

    data = json.dumps({
        'instances': image.tolist()
    })
    response = requests.post(uri, data=data.encode('utf-8'))
    result = json.loads(response.text)
    prediction = np.argmax(np.squeeze(result['predictions'][0]))
    return prediction

def predict(image_path, has_problem=False):
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(SIZE, SIZE))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = np.expand_dims(image, axis=0)

    if has_problem:
        prediction_id = get_prediction(image, binary=False)
        prediction = problem_categories[prediction_id]
    else:
        prediction_id = get_prediction(image, True)
        if prediction_id == 1:
            prediction_id = get_prediction(image, False)
            prediction = problem_categories[prediction_id]
        else:
            prediction = "No problem"
    return prediction