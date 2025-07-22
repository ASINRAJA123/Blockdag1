from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_charge, predict_yield, predict_property_risk
import traceback

app = Flask(__name__)
CORS(app)

# === MEDICAL ENDPOINT ===
@app.route('/predict/medical', methods=['POST'])
def medical_prediction():
    try:
        data = request.get_json()
        
        # --- FINAL FIX: Handle empty strings by providing a default value of 0 or 0.0 ---
        # The `or 0` pattern means "use the value, but if it's empty/None, use 0".
        input_data = {
            'age': int(data.get('age') or 0),
            'bmi': float(data.get('bmi') or 0.0),
            'children': int(data.get('children') or 0),
            'sex_male': data.get('sex') == 'male',
            'smoker_yes': data.get('smoker') == 'yes',
            'region_northwest': data.get('region') == 'northwest',
            'region_southeast': data.get('region') == 'southeast',
            'region_southwest': data.get('region') == 'southwest',
        }
        
        predicted_charge = predict_charge(input_data)
        
        if predicted_charge < 8000: risk_level = 'Low Risk'
        elif predicted_charge < 20000: risk_level = 'Medium Risk'
        else: risk_level = 'High Risk'
            
        return jsonify({'risk_level': risk_level})
        
    except Exception as e:
        # This will print the full error to your terminal for better debugging
        print(traceback.format_exc())
        return jsonify({'error': f'An internal error occurred: {e}'}), 500


# === AGRICULTURE ENDPOINT ===
@app.route('/predict/agriculture', methods=['POST'])
def agriculture_prediction():
    try:
        data = request.get_json()
        
        state_feature = f"State_{data.get('state_name')}"
        crop_feature = f"Crop_{data.get('crop_name')}"

        # --- FINAL FIX: Handle empty strings by providing a default value of 0.0 ---
        input_data = {
            'Cost of Cultivation (`/Hectare) A2+FL': float(data.get('cost_cultivation_a2fl') or 0.0),
            'Cost of Cultivation (C2 per Hectare)': float(data.get('cost_cultivation_c2') or 0.0),
            'Cost of Production (C2 per Quintal)': float(data.get('cost_production_c2') or 0.0),
        }
        input_data[state_feature] = True
        input_data[crop_feature] = True

        predicted_yield = predict_yield(input_data)

        if predicted_yield > 25: risk_level = 'Low Risk'
        elif predicted_yield > 10: risk_level = 'Medium Risk'
        else: risk_level = 'High Risk'
            
        return jsonify({'risk_level': risk_level})

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': f'An internal error occurred: {e}'}), 500

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'}), 200

# === PROPERTY ENDPOINT (Placeholder) ===
@app.route('/predict/property', methods=['POST'])
def property_prediction():
    data = request.get_json()
    risk_level = predict_property_risk(data)
    return jsonify({'risk_level': risk_level})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
