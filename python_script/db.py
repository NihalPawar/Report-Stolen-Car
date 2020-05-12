from pymongo import MongoClient
client = MongoClient("mongodb://127.0.0.1:27017/")
database = "mydb"
collections = ["cars", "cops"]

database = client[database]
cars = database[collections[0]]
cops = database[collections[1]]

def get_all_cars():
    return cars.find()

def get_free_cars():
    return cars.find({"resolved": 0, "assigned": 0})

def put_car(car):
    car['cop_id'] = ""
    car['resolved'] = 0
    car['assigned'] = 0
    car_id = cars.insert_one(car).inserted_id
    return car_id

def get_all_cops():
    return cops.find()

def get_available_cops():
    return cops.find({"available": 1})

def put_cop(cop):
    cop['available'] = 1
    cop['car_id'] = ""
    cop_id = cops.insert_one(cop).inserted_id
    return cop_id

def assign_cop_car(cop_id, car_id):
    if list(cops.find_one({"_id": cop_id}, {"_id": 0, "available": 1}).values()) != [1]:   return "failed"
    if list(cars.find_one({"_id": car_id}, {"_id": 0, "resolved": 1, "assigned": 1}).values()) != [0, 0]:   return "failed"

    cops.update_one({"_id": cop_id}, {"$set": {"available": 0, "car_id": car_id}})
    cars.update_one({"_id": car_id}, {"$set": {"assigned": 1, "cop_id": cop_id}})
    return "assigned"

def complete_assignment(cop_id, car_id):
    if list(cops.find_one({"_id": cop_id}, {"_id": 0, "available": 1}).values()) != [0]:   return "failed"
    if list(cars.find_one({"_id": car_id}, {"_id": 0, "resolved": 1, "assigned": 1}).values()) != [0, 1]:   return "failed"
    
    cops.update_one({"_id": cop_id}, {"$set": {"available": 1}})
    cops.update_one({"_id": cop_id}, {"$set": {"car_id": ""}})
    cars.update_one({"_id": car_id}, {"$set": {"assigned": 0}})
    cars.update_one({"_id": car_id}, {"$set": {"resolved": 1}})
    cars.update_one({"_id": car_id}, {"$set": {"cop_id": ""}})
    return "resolved"