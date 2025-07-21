import pandas as pd
import lightgbm as lgb
import joblib # Using joblib is more standard for saving sklearn/lgbm models

# This function will train and save the model ONCE
def train_and_save_medical_model():
    print("Training a new medical model...")
    df = pd.read_csv('insurance.csv')
    y = df['charges']
    features = df.drop('charges', axis=1)
    X_encoded = pd.get_dummies(features, columns=['sex', 'smoker', 'region'], drop_first=True)
    
    # Save the columns to use them for prediction later
    joblib.dump(X_encoded.columns, 'medical_model_columns.pkl')

    model = lgb.LGBMRegressor(objective='regression', verbosity=-1)
    model.fit(X_encoded, y)
    
    # Save the trained model to a file
    joblib.dump(model, 'medical_model.pkl')
    print("Model trained and saved as medical_model.pkl")

# This function will load the pre-trained model and make a prediction
def predict_charge(data):
    # Load the saved model and columns
    model = joblib.load('medical_model.pkl')
    model_columns = joblib.load('medical_model_columns.pkl')
    
    # Create a DataFrame from the input data
    new_person_df = pd.DataFrame([data])
    
    # Align columns to match the training data
    # This adds missing dummy columns and ensures the order is correct
    final_df = new_person_df.reindex(columns=model_columns, fill_value=0)
    
    # Predict the insurance charge
    predicted_charge = model.predict(final_df)
    return predicted_charge[0]

# --- IMPORTANT ---
# Run this file directly ONCE to train and save the model
if __name__ == '__main__':
    train_and_save_medical_model()