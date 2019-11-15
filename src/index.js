import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore , applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';

import { Provider } from 'react-redux';
import Routes from './Router/routes';
import './index.css';
/* ------ Reducers ------- */
import rootReducer from './Reducers/index';
/* ------ ReduxSaga ------- */
import rootSaga from './ReduxSagas/index';


const sagaMiddleware = reduxSaga();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
             <Routes/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
