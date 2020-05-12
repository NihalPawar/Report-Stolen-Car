from flask import Flask
from flask import request
from flask import jsonify
import db
from flask_cors import CORS, cross_origin

app = Flask(__name__)
import json

cors = CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/", methods=["GET"])
def index():
	return "working", 200


@app.route("/reportedcars", methods=["GET"])
def reportedcars(status=200):
	cars = []
	for car in db.get_all_cars():
		temp_car = dict()
		for key, val in car.items():
			temp_car[key] = val
		cars.append(temp_car)

	return jsonify(cars), status


#i/p car details
#{"_id": "KA01-1029"....}
@app.route('/reportstolen',methods=['POST'])
def reportstolen():
	car = request.json
	try:
		# put the car in db
		db.put_car(car)
		# assign a cop to the car if available
		for cop in db.get_available_cops():
			if db.assign_cop_car(cop["_id"], car["_id"]) == "assigned":
				break
		return reportedcars(201)
	except Exception as e:
		print(e)
		return "error", 500


#i/p car details
#{"_id": "KA01-1029",..."cop_id":"cop2",...}
@app.route("/resolve", methods=["POST"])
def resolve():
	car_id = request.json['_id']
	cop_id = request.json['cop_id']
	try:
		if db.complete_assignment(cop_id, car_id) == "failed":
			return "error", 400
		for car in db.get_free_cars():
			if db.assign_cop_car(cop_id, car["_id"]) == "assigned":
				break
		return reportedcars(200)
	except Exception as e:
		print(e)
		return "error", 500


#{"_id":"cop1", ......}
@app.route("/addcop", methods=["POST"])
def addcop():
	cop = request.json
	try:	
		db.put_cop(cop)
		for car in db.get_free_cars():
    			if db.assign_cop_car(cop["_id"], car["_id"]) == "assigned":
    					break
		return "success", 201 
	except Exception as e:
		print(e)
		return "error", 500

@app.route("/allcops", methods=["GET"])
def allcops():
	cops = []
	for cop in db.get_all_cops():
		temp_cop = dict()
		for key, val in cop.items():
			temp_cop[key] = val
		cops.append(temp_cop)
	
	return jsonify(cops), 200

if __name__ == '__main__':
	app.run(debug=True)