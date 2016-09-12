import React from 'react';

require('./game_over.sass');

import GameOverFunction from './function';

const GameOver = (props) => (
  <div className="game_over">

    <div className="go_content">GAME OVER !!!!</div>

    <div className="go_footer">

      <div className="go_footer_content">
        PRESS BUTTON TO RESTART
      </div>

      <div className="go_button" onClick={props.reStartOnClick}>RESTART</div>
    </div>

  </div>
);

export default GameOverFunction(GameOver);
