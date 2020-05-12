# Report Stolen Car 
A small website reporting stolen cars
* Cars owners can report a stolen cars.
* New stolen cars will be automatically assigned to any free police officer.
* A police officer will handle one stolen cars case at a time.
* When the Police find a car, the case can be marked as resolved and the responsible police officer becomes available to take a new stolen cars case.
* The system will assign unassigned stolen cars cases automatically when a police officer becomes available.


## Directory structure

    |stolencar
        |--python_script
            |--app.py(flask app)
            |--db.py(mongo db helper)
        |--stolenCar_react
                |--public(index.html)
                |--src
                    |--Components(.js files)
                |--App.js (router component)
                |--car.svg(Home Logo)
                |--index.js
            |--package.json (all the dependencies )
        |--requirements.txt

## Built Using :
        React : Javascript Library for building UI
        Flask : Python Based mini-webframework
        MongoDB: Database Server

## Setup Environment :

    Install Python3 (If you dont already have it)
        $ sudo apt-get install python3.6

    Install pip3 (If you dont have it)
        $ sudo apt install python3-pip

    Install node.js and npm
        $ sudo apt install nodejs
        $ sudo apt install npm

    Install MongoDB 
        $ sudo apt-get install -y mongodb-org

    Install dependencies of the application
        $ pip3 install -r requirements.txt

    Install all the dependencies required to run the react app
        $ cd stolencar/stolencar_react/
        $ npm install

## Run the application :
    Run MongoDB
        $ sudo service mongodb start
    Run the flask app
        $ cd python_script/
        $ export FLASK_APP=app
        $ flask run
    Run React App 
        $ npm start 

Open the browser to http://localhost:3000 and start using Application

