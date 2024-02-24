from flask import Flask, request, jsonify
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Load and prepare the Iris dataset
iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train the SVM model
svm_model = SVC(kernel='linear', probability=True)  # Ensure probability is True for predict_proba
svm_model.fit(X_train, y_train)

app = Flask(__name__)

@app.route('/predict', methods=['GET'])
def predict():
    # Extract features from the request's query parameters
    features = [request.args.get(f'feature{i}', type=float) for i in range(4)]

    # Check if any of the features are missing or not convertible to float
    if any(f is None for f in features):
        return jsonify({'error': 'Missing or invalid features'}), 400

    # Make a prediction using the extracted features
    prediction = svm_model.predict([features])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True, port=5002)
