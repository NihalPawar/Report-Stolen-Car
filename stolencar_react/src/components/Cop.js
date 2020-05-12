import React, { Component } from 'react';
import Axios from 'axios'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Notifications, { notify } from 'react-notify-toast';

class Cop extends Component {

    state = {
        data: []
    }

    // life cycle hook occurs when page is mounted
    componentDidMount = () => {
        Axios.get("http://localhost:5000/reportedcars")
            .then((res) => {
                // console.log(res.data);
                this.setState({
                    data: res.data
                })

            })
    }

    // basic arrow function called in render function below
    getData = () => {
        var info = this.state.data.map((d, idx) => {
            return <tr key={idx}>
                <td>{d._id}</td><td>{d.color}</td><td>{d.model_name}</td><td>{d.owner_name}</td><td>{d.phone_number}</td><td>{d.assigned}</td><td>{d.cop_id}</td><td>{d.resolved}</td><td><Button type="submit" variant="primary" onClick={() => {this.resolveCase(d._id, d.cop_id) }} >Resolve Case</Button></td>
            </tr>
        })
        return info
    }

    resolveCase = (id, cop_id ) => {
        // console.log(id, cop_id)
        Axios.post("http://localhost:5000/resolve",{
            _id: id,
            cop_id: cop_id
        })
        .then((res) => {
            // console.log(res)
            if (res.status === 200) {
                let myColor = { background: '#0E1717', text: "#FFFFFF" };
                notify.show('Case Resolved Successfully', 'custom', 2000, myColor)
                setTimeout(()=>{
                    window.location.reload(true)  
                  },2500)
            }
        })
        .catch((error) => {
            // console.log(error)
            let myColor = { background: '#FF0000', text: "#FFFFFF" };
            notify.show('Case Already Resolved or Cop Not Assigned', 'custom', 2000, myColor)
        })
    } 

    render() {
        return (
            <div>
                <Notifications options={{zIndex: 200, top: '50px'}} />
                <Table responsive striped bordered hover style={{ marginTop: '10vh'}}>
                    <thead>
                        <tr>
                            <th>Car Number</th>
                            <th>Car color</th>
                            <th>Model Name</th>
                            <th>Car owner</th>
                            <th>Phone Number</th>
                            <th>Assigned</th>
                            <th>Cop ID</th>
                            <th>Resolved</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            { this.getData() }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Cop;
