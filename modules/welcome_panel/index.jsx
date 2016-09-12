import React from 'react';

require('./welcome_panel.sass');

const WelcomePanel = (props) => (
      <div className="welcome_panel">
          <div className="wp_header">STAMPS COLLECTION</div>

          <div className="wp_content">
              <p className="pHeader">INTRODUCTION:</p>

              You'll lose (game over) when:
                <ul>
                  <li>There are more than 30 stamps on the screen OR</li>
                  <li>There are more than 20 stamps in your basket.</li>
                </ul>


              You'll get: <br/>
              <ul>
                <li>1 points for every 5 stamps of the same kind that you collect.</li>
                <li>
                  0.5 point* for every 1 stamp if you:
                    <ul>
                      <li>collected more than 4 kinds of stamps AND</li>
                      <li>each kind has the same amount of stamps.</li>
                    </ul>
                </li>
              </ul>

              <p>Enjoy and Have Fun !!!!! </p>


              <p><i>*If your point is not rounded, it will be rounded down.
              Sorry for that !!! :)</i></p>
              <p>
                <i>Created by MINH LE</i> <br/>
                <i>Sound: Mark DiAngelo</i>
              </p>
          </div>

          <div className="wp_footer">
            <p className="wp_footer_content">CLICK THE BUTTON BELOW TO START</p>
            <div className="wp_button" onClick={() => {window.location.href="/facebook-login"}}>LOGIN BY FACEBOOK</div>
          </div>
      </div>
);


export default WelcomePanel;
