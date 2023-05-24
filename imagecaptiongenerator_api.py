from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
from pickle import load
import matplotlib.pyplot as plt
from keras.applications.xception import Xception
from tensorflow.keras.preprocessing import sequence
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

def extract_features(filename, model):
    try:
        image = Image.open(filename)
        image = image.resize((299, 299))
        image = np.array(image)
        if image.shape[2] == 4:
            image = image[..., :3]
        image = np.expand_dims(image, axis=0)
        image = image / 127.5
        image = image - 1.0
        feature = model.predict(image)
        return feature
    except FileNotFoundError:
        print(f"ERROR: Image file not found at '{filename}'")
    except Exception as e:
        print(f"ERROR: An error occurred while processing the image: {e}")
    return None

def word_for_id(integer, tokenizer):
    for word, index in tokenizer.word_index.items():
        if index == integer:
            return word
    return None

def generate_desc(model, tokenizer, photo, max_length):
    in_text = ''
    words_list = []
    for i in range(max_length):
        seq = tokenizer.texts_to_sequences([in_text])[0]
        seq = sequence.pad_sequences([seq], maxlen=max_length)
        pred = model.predict([photo,seq], verbose=0)
        pred = np.argmax(pred)
        word = word_for_id(pred, tokenizer)
        if word is None:
            break
        if word not in words_list:
            in_text += ' ' + word
            words_list.append(word)
        if word == 'end':
            break
    return in_text

@app.route('/process-image', methods=['POST'])
def process_image():
    try:
        img_file = request.files['image']
        img_filename = img_file.filename  # Get the uploaded image filename
        
        # Concatenate the filename to the image path
        img_path = "C:/Users/Elaiza Faye/Desktop/ISMiniProject/Image Caption GeneratorFlicker8k_Dataset/" + img_filename
        
        tokenizer = load(open("C:/Users/Elaiza Faye/Desktop/ISMiniProject/Generator/tokenizer.p","rb"))
        model = load_model('C:/Users/Elaiza Faye/Desktop/ISMiniProject/Generator/models/model_7.h5')
        xception_model = Xception(include_top=False, pooling="avg")

        # Extract features from the image
        photo = extract_features(img_path, xception_model)

        # Generate the description
        max_length = 32
        description = generate_desc(model, tokenizer, photo, max_length)
        
        return jsonify({'description': description})  # Return the description as JSON
    except Exception as e:
        return jsonify({'error': str(e)})  # Return an error message if an exception occurs

if __name__ == '__main__':
    app.run(debug=True)