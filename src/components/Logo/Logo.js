import React from 'react';
import BrainLogo from './logo.png';
import Tilt from 'react-parallax-tilt'
import './Logo.css'

const Logo = () => (
   <Tilt
      className="Tilt parallax-effect-img ma4 mt0 br2 shadow-2"
      tiltMaxAngleX={40}
      tiltMaxAngleY={40}
      perspective={500}
      transitionSpeed={500}
      scale={1.2}
      gyroscope={true}
      style={{width:100}}
    >
  <img src = {BrainLogo} alt= 'Brain Logo' />
  </Tilt>
);

export default Logo;
