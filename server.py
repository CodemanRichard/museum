from flask import Flask, request, jsonify
from flask_cors import CORS
import math

import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def init():
    print('Server running')

if __name__ == '__main__':
    app.run(debug=True, port=5000)