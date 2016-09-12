import React from 'react';

import HeaderFunction from './function';
import store from '../../redux';
import {connect} from 'react-redux';

require('./header.sass');

const Header = (props) => (
  <div className="header" onClick={props.headerOnClick}>
    {
      (props.name === "")?
        <LoginButton facebookOnClick={props.facebookOnClick}/>
        :
        <ProfilePanel profileContentOnClick={props.profileContentOnClick}
                              profileContentOnMouseOut={props.profileContentOnMouseOut}
                              photo_url={props.photo_url} name={props.name}
                              startStopOnClick={props.startStopOnClick}
                              start={props.start} logOutOnClick={props.logOutOnClick}
                              gameOver={props.gameOver}/>

    }
  </div>
);

const LoginButton = (props) => (
  <div className="hd_button" id="facebook_login" onClick={props.facebookOnClick}>
                LOG IN BY FACEBOOK
  </div>
);

const ProfilePanel = (props) => (
  <div className="profile_panel">
    <div className="profile_panel_content" onClick={props.profileContentOnClick} onMouseOut={props.profileContentOnMouseOut}>
      <div className="profile_panel_img" ><img src={props.photo_url}/></div>
      <div className="profile_panel_welcome">Hi, <span className="profile_panel_name">{props.name}</span></div>
    </div>

    <div className="profile_panel_footer">
      <div className={"profile_panel_button " + ((props.start && !props.gameOver)? "ppb_running": "")} onClick={props.startStopOnClick} id="startStop">{(props.start && !props.gameOver)? "STOP" : "START"}</div>
      <div className="profile_panel_button" onClick={props.logOutOnClick} id="log_out">LOG OUT</div>
    </div>
  </div>
);


export default HeaderFunction(Header);
