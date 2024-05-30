from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import pandas as pd
from collections import Counter 

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

@app.route('/get_museum_sum')
def get_museum_sum():
    
    return jsonify(Counter(df["博物馆"]))

@app.route('/get_museum_sum_China')
def get_museum_sum_China():
    china_count={}

    for dd,bb in zip(df["来源地"],df["博物馆"]):
        if china_count.get(bb,-1)==-1:
            china_count[bb]=0
        if dd.find("Chin")!=-1 or bb.find("故宫")!=-1:
            china_count[bb]=china_count[bb]+1
    # print(f"china {china_count}")
    return jsonify(china_count)


@app.route('/get_dot_map')
def get_dot_map():
    rt={}
    ffd={}
    for lat,long,ff in zip(df["latitude"],df["longitude"],df["来源地"]):
        if isinstance(lat,str) or isinstance(long,str):
            continue
        ffd[(lat,long)]=ff
        if(rt.get((lat,long),-1)==-1):
            rt[(lat,long)]=0
        rt[(lat,long)]+=1
    # print(rt)

    tt=[]
    for r in rt.keys():
        tt.append([r[0],r[1],rt[r],ffd[r]])

    return jsonify(tt)

if __name__ == '__main__':
    app.run(debug=True, port=5000)