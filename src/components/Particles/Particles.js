
import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import './Particles.css';

class Particles extends Component {
  render () {
    return (
      <div className='bg'>
        <ParticlesBg type="circle" bg={true} />
        </div>


    )
  }
}

export default Particles;
