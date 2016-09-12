import React from 'react';

require('./stamp.sass');

import StampFunction from './function';

const Stamp = (props) => (
  <div className="stamp" id={props.stampID} onClick={props.stampOnClick}>
    <div className="stamp_photo"><img src={props.image_url}/></div>
    <div className="stamp_text">{props.name}</div>
  </div>
);

export default StampFunction(Stamp);
