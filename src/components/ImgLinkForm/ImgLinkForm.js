import React from 'react';
import './ImgLinkForm.css';


const ImgLinkForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div className = ''>
    <p className ='f3 center w-70'>{'This Magic Brain will detect faces in your pictures. Give it a try!'}</p>
      <div className = 'center'>
        <div className = 'form center shadow-5 pa4 br3 '>
          <input className = 'f4 pa2 w-70' type = 'text'
            onChange = {onInputChange}>
          </input>
          <button className = ' w-30 grow f4 link ph3 pv2 dib white bg-dark-green'
            onClick = {onButtonSubmit}>
            Detect</button>
        </div>
    </div>
    </div>


  );
}

export default ImgLinkForm;
