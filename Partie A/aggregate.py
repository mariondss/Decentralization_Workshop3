import requests

# Initialize model stakes and weights
model_info = {
    'KNN': {'url': '', 'stake': 1000, 'weight': 1},
    'RandForest': {'url': '', 'stake': 1000, 'weight': 1},
    'SVM': {'url': '', 'stake': 1000, 'weight': 1}
}

def adjust_weights_and_stakes(model_info, consensus, predictions):
    for model, info in model_info.items():
        print(f"\nAdjusting {model}:")
        # Check if model's prediction matches the consensus
        if predictions[model] == consensus:
            # Slightly increase the weight for correct predictions
            info['weight'] += 0.1
            print(f"  Weight increased to {info['weight']}")
        else:
            # Decrease the weight for incorrect predictions
            previous_weight = info['weight']
            info['weight'] = max(0.1, info['weight'] - 0.1)  # Ensure weight doesn't become negative
            print(f"  Weight decreased from {previous_weight} to {info['weight']}")

            # Implement a simple slashing protocol
            info['stake'] -= 50  # Slash 50 euros for a wrong prediction
            print(f"  Stake slashed to {info['stake']} euros")

def weighted_consensus(predictions, weights):
    weighted_preds = {}
    for pred, weight in zip(predictions, weights):
        if pred in weighted_preds:
            weighted_preds[pred] += weight
        else:
            weighted_preds[pred] = weight

    # Find the prediction with the highest total weight
    consensus = max(weighted_preds, key=weighted_preds.get)
    return consensus


def get_feature_input(feature_name):
    # Prompt the user to enter the value for the specified feature
    while True:
        try:
            return float(input(f"Enter the {feature_name}: "))
        except ValueError:
            print("Invalid input. Please enter a numerical value.")

def construct_prediction_url(base_url, features):
    # Construct the prediction URL with query parameters for each feature
    query_params = '&'.join([f'feature{i}={features[i]}' for i in range(len(features))])
    return f"{base_url}/predict?{query_params}"

def get_prediction(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()['prediction']
        else:
            print(f"Error from server: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")

def aggregate_predictions(predictions):
    # This is a simple majority vote. Adjust as needed for your specific use case.
    return max(set(predictions), key=predictions.count)

def main():
    # Prompt the user to enter the base URLs for each model's prediction endpoint
    for key in model_info:
        model_info[key]['url'] = input(f"Enter the base URL for the {key} model: ")

    # Feature names for the Iris dataset
    feature_names = ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']

    # Collect feature inputs from the user
    features = [get_feature_input(name) for name in feature_names]

    # Collect predictions and weights
    predictions = {}
    weights = []
    for key, info in model_info.items():
        prediction = get_prediction(construct_prediction_url(info['url'], features))
        if prediction is not None:
            predictions[key] = prediction  # Store prediction with model name as key
            weights.append(info['weight'])

    # Ensure species_map is defined
    species_map = {0: 'Iris Setosa', 1: 'Iris Versicolour', 2: 'Iris Virginica'}

    # Calculate weighted consensus
    if predictions:
        consensus = weighted_consensus(list(predictions.values()), weights)
        adjust_weights_and_stakes(model_info, consensus, predictions)
        consensus_species = species_map.get(consensus, "Unknown species")
        print(f"\nWeighted Consensus Prediction: {consensus_species}")
    else:
        print("No predictions were obtained.")
        
if __name__ == '__main__':
    main()
