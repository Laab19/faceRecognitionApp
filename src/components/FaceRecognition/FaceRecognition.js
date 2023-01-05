import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
  return (
    <div className='center mt2'>
      <div className='relative'>
        <img id='inputImage' className='center' alt='' src={imageUrl} width='500px' height='auto'/>
        <div className=''>
          <div className='bounding_box' style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}></div>
        </div>
      </div>
  </div>);

}

export default FaceRecognition;
