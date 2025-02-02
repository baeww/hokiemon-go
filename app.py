# app.py
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS
from bson import ObjectId  # Import ObjectId from bson
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
uri = "mongodb+srv://wbae:atlasPassword@cluster0.ck0or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client['hokiemon']  # Replace with your database name

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    print(username)
    print(password)


    # Example: Check user credentials in the database
    user = db.app.find_one({'username': username, 'password': password})  # Adjust according to your schema
    print(user)
    
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the user already exists
    existing_user = db.users.find_one({'username': username})
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400  # Return 400 for bad request

    # Insert new user into the database
    db.users.insert_one({'username': username, 'password': password})  # Adjust according to your schema
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/print_db', methods=['GET'])
def print_db():
    # Retrieve all users from the database
    users = list(db.app.find())  # Adjust according to your collection name

    user = db.app.find_one({'username':"hello"})
    print(user)

    print("Database contents:", users)  # Print contents to the console
    return jsonify(None), 200  # Return the contents as JSON

    # db_names = client.list_database_names()  # Get the list of database names
    # print("Database names:", db_names)  # Print database names to the console
    # return jsonify(db_names), 200

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    username = data.get('username', '')

    # Create a regex pattern for case-insensitive search
    regex_pattern = re.compile(f'.*{username}.*', re.IGNORECASE)

    # Find users matching the regex pattern and limit to 5 results
    users = list(db.app.find({'username': regex_pattern}).limit(5))

    print(users)

    # Convert ObjectId to string if necessary
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string

    return jsonify({'message': 'Search successful', 'users': users}), 200

if __name__ == '__main__':
    app.run(debug=True)