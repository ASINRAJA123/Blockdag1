from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_charge # This part stays the same

app = Flask(__name__)
CORS(app)

# Define an API endpoint for medical predictions
@app.route('/predict/medical', methods=['POST'])
def medical_prediction():
    data = request.get_json()

    # --- Data preparation for the model ---
    input_data = {
        'age': data.get('age'),
        'bmi': data.get('bmi'),
        'children': data.get('children'),
        'sex_male': data.get('sex') == 'male',
        'smoker_yes': data.get('smoker') == 'yes',
        'region_northwest': data.get('region') == 'northwest',
        'region_southeast': data.get('region') == 'southeast',
        'region_southwest': data.get('region') == 'southwest',
    }
    
    # Get the numerical prediction from our model
    predicted_charge = predict_charge(input_data)
    
    # --- NEW: Convert the numerical charge into a risk category ---
    risk_level = ''
    if predicted_charge < 8000:
        risk_level = 'Low Risk'
    elif predicted_charge < 20000:
        risk_level = 'Medium Risk'
    else:
        risk_level = 'High Risk'
        
    # --- CHANGED: Return the risk category instead of the number ---
    return jsonify({'risk_level': risk_level})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)