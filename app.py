from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from flask_pymongo import pymongo
import json

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client['guns_db']
collection = db['guns']

@app.route('/')
def return_all():
   returned_data = {}
   results = collection.find({}, {"_id":False})
   for result in results:
      year = result['year']
      if year in returned_data:
         returned_data[year].append(result)
      else:
         returned_data[year] = [result]
   return render_template("index.html", event=returned_data)


if __name__ == "__main__":
    app.run(debug=True)