import React, { Component } from 'react';
import Car from '../car.svg'
import '../Home.css'

class Home extends Component {
    render() {
        return (
            <div className='HomeApp'>
                <img src={Car} alt="Car Logo" className='App-logo' />
                <span className='App-header'>Stolen Car</span>
            </div>
        );
    }
}

export default Home;
