import React from 'react';
import './App.css';
import {Auth} from 'aws-amplify';

function Oauth(props) {
    return (
        <div className="App">
          <header className="App-header">
            <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
          </header>
        </div>
      )
}

export default Oauth;