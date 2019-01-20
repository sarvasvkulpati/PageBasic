from flask import Flask
import keras.backend as K
from flask import request
from flask import send_file
from PIL import Image
import cv2
import numpy as np
from scan import DocScanner
from flask_cors import CORS
from classes.inference.Sampler import *
import base64
import re
import os
import json
app = Flask(__name__)
CORS(app)


def convert_and_save(b64_string):
    with open("img.jpg", "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
def decode_base64(data, altchars=b'+/'):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    data = re.sub(rb'[^a-zA-Z0-9%s]+' % altchars, b'', data)  # normalize
    missing_padding = len(data) % 4
    if missing_padding:
        data += b'='* (4 - missing_padding)
    return base64.b64decode(data, altchars)
def final_scanner():
    im_file_path = 'img.png'

    scanner = DocScanner(False)

    get_ext = lambda f: os.path.splitext(f)[1].lower()

    if im_file_path:
        scanner.scan(im_file_path)


model_json_file = "model_json.json"
model_weights_file = "weights.h5"
png_path = "img.png"

@app.route('/convertSketch', methods=['GET', 'POST'])
def convertSketch():
    if request.method == 'POST':
        
        data = json.loads(request.data)
        # content = request.get_json()
        # print(content)
        # imageData = request.form['imageData']
        imageData= data['imageData']
        style = data['style']
        # print(imageData)
        print(style)

        imageString = str(imageData)
        print(imageString)
        imageString = imageString.replace("data:image/png;base64,", "")
        # imageString = imageString[0:len(imageString)-1]

        decodedString = base64.b64decode(imageString)

        with open("img.png", 'wb') as f:
            f.write(decodedString)
        # parse image string into file
        # final_scanner()
        K.clear_session()
        sampler = Sampler(model_json_path=model_json_file,
                      model_weights_path = model_weights_file)
        sampler.convert_single_image(output_folder ="./generated_html", png_path=png_path, print_generated_output=1, get_sentence_bleu=0,original_gui_filepath=None, style=style)

        return send_file("./generated_html/img.html")


@app.route('/convertImage', methods=['GET', 'POST'])
def convertImage():
    if request.method == 'POST':
        print(request.data)
        imageString = str(request.data)
        imageString = imageString.replace("b'data:image/jpeg;base64,", "")
        imageString = imageString[0:len(imageString)-1]

        decodedString = base64.b64decode(imageString)

        with open("img.png", 'wb') as f:
            f.write(decodedString)
        
        final_scanner()


        K.clear_session()
        sampler = Sampler(model_json_path=model_json_file,
                      model_weights_path = model_weights_file)
        sampler.convert_single_image(output_folder ="./generated_html", png_path=png_path, print_generated_output=1, get_sentence_bleu=0,original_gui_filepath=None, style='default')

        return send_file("./generated_html/img.html")



if __name__ == "__main__":
    app.run(host='0.0.0.0')
    
