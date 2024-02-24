# Distributed Machine Learning Prediction System

This project demonstrates a distributed machine learning prediction system using Flask to serve predictions from multiple models and an aggregation script to combine these predictions for a consensus output. The models used in this example are trained on the Iris dataset and include K-Nearest Neighbors (KNN), Random Forest, and Support Vector Machine (SVM) classifiers.
Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.<br>
--
### Prerequisites

    Python 3.6+
    Flask
    scikit-learn
    requests

You can install the necessary libraries using pip:


```
pip install Flask scikit-learn requests

Running the Flask Apps
```

## Launch - Solo Version

In 3  *separate*  terminals Run

    
```
python3 KNN.py

python3 RandForest.py

python3 SVM.py
```
## Launch - Team Version

Run the app of your choice.


For instance : 
`python3 KNN.py`

Output :
```
Serving Flask app 'KNN'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5001
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 111-345-021
```

Then, in another terminal run a command to expose the port used by your app.<br>

Here it would be :

`ngrok http 5001`

The output should look like this :

```
Try the new Traffic Inspector dev preview: https://ngrok.com/r/ti                                                                            
                                                                                                                                             
Session Status                online                                                                                                         
Account                       KryMucus (Plan: Free)                                                                                          
Version                       3.6.0                                                                                                          
Region                        Europe (eu)                                                                                                    
Latency                       -                                                                                                              
Web Interface                 http://127.0.0.1:4040                                                                                          
Forwarding                    https://ea25-31-32-40-37.ngrok-free.app -> http://localhost:5001                                               
                                                                                                                                             
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                    
                              0       0       0.00    0.00    0.00    0.00      
```

## Using the Aggregation Script - Solo version

The aggregation script (aggregates.py) prompts you for the feature values and the URLs of the running Flask apps, then aggregates the predictions from each app to provide a consensus prediction.

Run the aggregation script in a separate terminal:


`python3 aggregates.py`
--


Follow the prompts to enter the feature values and the URLs of the Flask apps. The script will output the consensus prediction.

Enter the base URL for the KNN model: <br>
Enter the base URL for the RandForest model: <br>
Enter the base URL for the SVM model: <br>


After starting the Flask apps, run the aggregation script. You'll be prompted to enter the feature values for the Iris dataset (sepal length, sepal width, petal length, petal width) and the URLs of the Flask apps.

Enter the feature values one by one:


```
Enter the value of feature 1: 5.1

Enter the value of feature 2: 3.5

Enter the value of feature 3: 1.4

Enter the value of feature 4: 0.2
```

Next, enter the URLs of the Flask apps when prompted:

The script will then output the consensus prediction based on the inputs provided.

## Using the Aggregation Script - Team version

The aggregation script (aggregates.py) prompts you for the feature values and the URLs of the running Flask apps, then aggregates the predictions from each app to provide a consensus prediction.


### Ask your teamates for the address to their tunnel, and give them yours

Yours should look like this : https://ea25-31-32-40-37.ngrok-free.app

### Run the aggregation script in a separate terminal:


`python3 aggregates.py`
--


Follow the prompts to enter the feature values and the URLs of the tunnels apps. The script will output the consensus prediction.

Enter the base URL for the KNN model: <br>
Enter the base URL for the RandForest model: <br>
Enter the base URL for the SVM model: <br>


After starting the Flask apps, run the aggregation script. You'll be prompted to enter the feature values for the Iris dataset (sepal length, sepal width, petal length, petal width) and the URLs of the Flask apps.

Enter the feature values one by one:


```
Enter the value of feature 1: 5.1

Enter the value of feature 2: 3.5

Enter the value of feature 3: 1.4

Enter the value of feature 4: 0.2
```

Next, enter the URLs of the Flask apps when prompted:
The script will then output the consensus prediction based on the inputs provided.