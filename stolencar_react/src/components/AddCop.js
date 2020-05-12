import React, { Component } from 'react';
import Axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Notifications, { notify } from 'react-notify-toast';

class AddCop extends Component {
    state = {
        cop_id: '',
        data: []
    } 

    handleCopID = (event) => {
        this.setState({ cop_id: event.target.value})
    }

    addCop = (event) => {
        event.preventDefault()
        Axios.post("http://localhost:5000/addcop",{
            _id: this.state.cop_id
        })
        .then((result) => {
            // console.log(result)
            if (result.status === 201) {
                let myColor = { background: '#0E1717', text: "#FFFFFF" };
                notify.show('Success cop added', 'custom', 1500, myColor)
                setTimeout(()=>{
                    window.location.reload(true)  
                  },2000)
            }
        })
        .catch((error) => {
            // console.log(error)
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            notify.show('Invalid ID or Already Exists', 'custom', 1500, myColor)
        })
    }

    UNSAFE_componentWillMount = () => {
        Axios.get("http://localhost:5000/allcops")
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    data: res.data
                })

            })
    }

    getCopData = () => {
        var info = this.state.data.map((d, idx) => {
            return <tr key={idx}>
                <td>{d._id}</td><td>{d.available}</td><td>{d.car_id}</td> 
            </tr>
        })
        return info
    }


    render() {
        return (
            <div>
                <Notifications options={{zIndex: 200, top: '50px'}} />
                <Card style={{ width: '50rem', marginTop: '10vh', marginLeft: 'auto', marginRight: 'auto', border: 0 }}>
                    <Form onSubmit={this.addCop} >
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCopID">
                                <Form.Label>Cop ID</Form.Label>
                                <Form.Control required type="text" name='cop_id' placeholder="Enter cop ID" onChange={this.handleCopID} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" className='text-center'>Add Cop</Button>
                    </Form>
                </Card>

                <Table responsive striped bordered hover style={{ width: '50rem',marginLeft: 'auto', marginRight: 'auto', marginTop: '10vh'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Available</th>
                            <th>Car ID</th>
                        </tr>
                    </thead>
                    <tbody>
                            { this.getCopData() }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AddCop;