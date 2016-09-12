import {combineReducers, createStore} from 'redux';

import stampsReducer from './modules/stamp/reducer';
import basketReducer from './modules/basket/reducer';
import scoreReducer from './modules/score_panel/reducer';
import {loginReducer, startReducer} from './modules/header/reducer';
import gameOverReducer from './modules/game_over/reducer';


const reducers = combineReducers({
    loginData: loginReducer,
    start: startReducer,
    stamps: stampsReducer,
    basket: basketReducer,
    gameOver: gameOverReducer,
    score: scoreReducer
});


const store = createStore(reducers);
export default store;
