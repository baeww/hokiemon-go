# app.py
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
uri = "mongodb+srv://wbae:atlasPassword@cluster0.ck0or.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client['app']  # Replace with your database name

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Example: Check user credentials in the database
    user = db.users.find_one({'username': username, 'password': password})  # Adjust according to your schema
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 200

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

if __name__ == '__main__':
    app.run(debug=True)