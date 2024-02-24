import requests

def get_feature_input(feature_number):
    # Prompt the user to enter the value for the specified feature
    while True:
        try:
            return float(input(f"Enter the value of feature {feature_number}: "))
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
    # Base URLs for your Flask app prediction endpoints
    urls = {'KNN': '', 'RandForest': '', 'SVM': ''}

    # Prompt the user to enter the base URLs for each model's prediction endpoint
    for key in urls:
        urls[key] = input(f"Enter the base URL for the {key} model: ")
    
    # Collect feature inputs from the user
    features = [get_feature_input(i) for i in range(1, 5)]  # Adjust the range as per your model's requirements

    # Construct prediction URLs with the user-provided feature values
    prediction_urls = [construct_prediction_url(urls[key], features) for key in urls]

    # Collect predictions from each model
    predictions = [get_prediction(url) for url in prediction_urls if url]

    # Aggregate the predictions
    if predictions:
        consensus = aggregate_predictions(predictions)
        print(f"Consensus Prediction: {consensus}")
    else:
        print("No predictions were obtained.")


if __name__ == '__main__':
    main()
