import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware } from 'redux';
import reduxSaga from 'redux-saga';

import { Provider } from 'react-redux';
import Routes from './Router/routes';
import './index.css';
import Layout from './Components/HOC/Layout/layout';
/* ------ Reducers ------- */
import rootReducer from './Reducers/index';
/* ------ ReduxSaga ------- */
import rootSaga from './ReduxSagas/index';

const App = () => {
    return(
        <div>
            <Layout>
                <Routes/>
            </Layout>
        </div>
    )
}

const sagaMiddleware = reduxSaga();

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>
    , document.getElementById('root'));
