import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class Google extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseGoogle = response => {
        this.setState ({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    componentClicked = () => {
        console.log('clicked');
    }

    render() {
        let gContent;
        if(this.state.isLoggedIn) {
            gContent = (
                <div style = {{width: '400px', margin: 'auto', background: '#f4f4f4', padding: '20px'}}>
                    <img src = {this.state.picture} alt={this.state.name} />
                    <h2>
                        Welcome {this.state.name}! 
                        Email: {this.state.email}
                    </h2>
                </div>
            )
        } else {
            gContent = (<GoogleLogin
                clientId=""
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />)
        }
        return (
            <div>
                {gContent}
            </div>
        );
    }
}

export default Google;