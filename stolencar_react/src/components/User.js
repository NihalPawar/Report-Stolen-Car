import React, { Component } from 'react';
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Notifications, { notify } from 'react-notify-toast';


class User extends Component {
      
    state = {
        color: '',
        model_name: '',
        car_number: '',
        owner_name: '',
        phone_num: '',

    }

    // this function is called onSubmit form
    reportStolen = (event) => {
        event.preventDefault()
        Axios.post("http://localhost:5000/reportstolen", {
            _id: this.state.car_number,
            color: this.state.color,
            model_name: this.state.model_name,
            owner_name: this.state.owner_name,
            phone_number: this.state.phone_num
        })
            .then((res) => {
                // console.log(res);
                // console.log(this.state._id)
                // console.log(this.state.color)
                // console.log(this.state.model_name)
                // console.log(this.state.owner_name)
                // console.log(this.state.car_number)
                // console.log(this.state.phone_num)
                if (res.status === 201) {
                    let myColor = { background: '#0E1717', text: "#FFFFFF" };
                    notify.show('case reported successfully', 'custom', 2000, myColor)
                    setTimeout(()=>{
                      window.location.reload(true)  
                    },2500)
                }
            })
            .catch((error) => {
                // console.log(error)
                let myColor = { background: '#FF0000', text: "#FFFFFF" };
                notify.show('Case Already Exists', 'custom', 2000, myColor)
            })
    }

    // this function is called onChange input value
    handleID = (event) => {
        this.setState({ _id: event.target.value })
    }

    handleCarColor = (event) => {
        this.setState({ color: event.target.value })
    }

    handleModel = (event) => {
        this.setState({ model_name: event.target.value })
    }

    handleOwner = (event) => {
        this.setState({ owner_name: event.target.value })
    }

    handleCarNumber = (event) => {
        this.setState({ car_number: event.target.value })
    }

    handlePhoneNumber = (event) => {
        this.setState({ phone_num: event.target.value })
    }

    render() {
        return (
            <div>
                <Notifications options={{zIndex: 200, top: '50px'}} />
                <Card style={{ width: '50rem', marginTop: '20vh', marginLeft: 'auto' , marginRight: 'auto', border: 0 }}>
                <span style={{ marginBottom: '5vh', marginLeft: 'auto' , marginRight: 'auto', fontSize: '22px', fontWeight: '600'}}>Report Stolen Car</span>
                    <Form onSubmit={this.reportStolen} >
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridCarNumber">
                                  <Form.Label>Car Number</Form.Label>
                                <Form.Control required type="text" name='car_number' placeholder="Enter Car Number" onChange={this.handleCarNumber} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridColor">
                                <Form.Label>Car Color</Form.Label>
                                <Form.Control required type="text" name='Color' placeholder="Car Color" onChange={this.handleCarColor} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control required type="text" name='model_name' placeholder="Enter Model Name" onChange={this.handleModel} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridOwner">
                                <Form.Label>Car Owner</Form.Label>
                                <Form.Control required type="text" name='owner_name' placeholder="Car Owner Name" onChange={this.handleOwner} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formGridPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control required type="text" name='phone_num' placeholder="Phone Number" onChange={this.handlePhoneNumber} />
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="submit" className='text-center'>Submit</Button>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default User;