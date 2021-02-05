import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';

// Import custom components
import store from './store';
import Home from "./Home"


class Root extends React.Component {

    render() {

        return(
        	<Provider store={store}>
               <Home/>
			</Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


