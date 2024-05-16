from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import pandas as pd

import json
import os

app = Flask(__name__)
CORS(app)
# 这里已经读了一次，你们在实现自己的API的时候，不需要再读一次了
print('Reading data...')
df = pd.read_excel('data/博物馆数据精选.xlsx')
print('Reading completed')
num_rows = df.shape[0]

@app.route('/')
def init():
    print('Server running')

@app.route('/get_num_rows')
def test():
    return str(num_rows)

@app.route('/get_data')
def get_data():
    return df.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True, port=5000)