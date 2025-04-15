from flask import Flask, request, jsonify
from flask_cors import CORS
from hf_model import HFModel  # Add this import line

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the HuggingFace model
model = HFModel()

@app.route('/translate', methods=['POST'])
def translate():
    try:
        data = request.get_json()
        input_text = data.get('text', '')
        if not input_text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Generate simplified text using the model
        simplified = model.generate(input_text)
        return jsonify({"simplified": simplified})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Add debug mode