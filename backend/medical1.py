import pandas as pd
import numpy as np
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import warnings

# Suppress all warnings for a clean output
warnings.filterwarnings('ignore')

# 1. Load the Dataset
try:
    df = pd.read_csv('insurance.csv')
except FileNotFoundError:
    print("FATAL ERROR: 'insurance.csv' not found. Please ensure it is in the correct directory.")
    exit()

# 2. Preprocess the Data
# Isolate the target variable (what we want to predict)
y = df['charges']
# Isolate the features (what we use to make the prediction)
features = df.drop('charges', axis=1)

# 3. One-Hot Encode Categorical Features (The Robust Way)
# Convert text columns into a numerical format before splitting the data.
# This guarantees the training and test sets will have identical columns.
X_encoded = pd.get_dummies(features, columns=['sex', 'smoker', 'region'], drop_first=True)

# 4. Split Data into Training and Testing Sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# 5. Initialize and Train the LightGBM Model
model = lgb.LGBMRegressor(
    objective='regression',   # Use standard regression objective
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=5,
    verbosity=-1,             # **THE FIX**: This silences all non-critical warnings
    n_jobs=-1
)

# Train the model with early stopping
print("Training the LightGBM model...")
model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric='l1', # 'l1' is MAE, a good metric for this problem
    callbacks=[lgb.early_stopping(10, verbose=False)]
)
print("Training complete.\n")

# 6. Evaluate the Model's Performance
print("--- Model Evaluation ---")
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)

print(f"R-squared (R²) Score: {r2:.4f}")
print(f"Mean Absolute Error (MAE): ₹{mae:,.2f}")
print("------------------------\n")

# 7. Predict on New Data (Example)
print("--- Example Prediction ---")
# Create a new person's data
new_person = {
    'age': 35,
    'bmi': 25.0,
    'children': 1,
    'sex_male': True,
    'smoker_yes': False,
    'region_northwest': True,
    'region_southeast': False,
    'region_southwest': False
}

# Convert the dictionary to a DataFrame with columns in the correct order
new_person_df = pd.DataFrame([new_person], columns=X_train.columns)

# Predict the insurance charge
predicted_charge = model.predict(new_person_df)

print(f"Data for new person: {new_person}")
print(f"Predicted Insurance Charge: ₹{predicted_charge[0]:,.2f}")
print("------------------------")