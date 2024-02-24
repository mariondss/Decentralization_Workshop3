Distributed Machine Learning Prediction System

This project demonstrates a distributed machine learning prediction system using Flask to serve predictions from multiple models and an aggregation script to combine these predictions for a consensus output. The models used in this example are trained on the Iris dataset and include K-Nearest Neighbors (KNN), Random Forest, and Support Vector Machine (SVM) classifiers.
Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites

    Python 3.6+
    Flask
    scikit-learn
    requests

You can install the necessary libraries using pip:



pip install Flask scikit-learn requests

Running the Flask Apps

Each Flask app serves predictions from a different model. You'll need to start each app separately.

    KNN Flask App:

    Navigate to the directory containing the KNN app script (knn_app.py) and run:

    

python knn_app.py

By default, this app will run on http://localhost:5000.

Random Forest Flask App:

Navigate to the directory containing the Random Forest app script (random_forest_app.py) and run:



python random_forest_app.py

Change the port to 5001 or another port if 5000 is in use.

SVM Flask App:

Navigate to the directory containing the SVM app script (svm_app.py) and run:



    python svm_app.py

    Ensure this app runs on a different port, such as 5002.

Using the Aggregation Script

The aggregation script (aggregate_predictions.py) prompts you for the feature values and the URLs of the running Flask apps, then aggregates the predictions from each app to provide a consensus prediction.

Run the aggregation script in a separate terminal:



python aggregate_predictions.py

Follow the prompts to enter the feature values and the URLs of the Flask apps. The script will output the consensus prediction.
Example

After starting the Flask apps, run the aggregation script. You'll be prompted to enter the feature values for the Iris dataset (sepal length, sepal width, petal length, petal width) and the URLs of the Flask apps.

Enter the feature values one by one:


```
Enter the value of feature 1: 5.1

Enter the value of feature 2: 3.5

Enter the value of feature 3: 1.4

Enter the value of feature 4: 0.2
```

Next, enter the URLs of the Flask apps when prompted:



Enter the base URL for the KNN model: http://localhost:5000
Enter the base URL for the RandForest model: http://localhost:5001
Enter the base URL for the SVM model: http://localhost:5002

The script will then output the consensus prediction based on the inputs provided.