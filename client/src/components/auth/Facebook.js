import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

const REACT_APP_FB = process.env.REACT_APP_FB;

class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
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
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent = (
                <div style = {{width: '400px', margin: 'auto', background: '#f4f4f4', padding: '20px'}}>
                    <img src = {this.state.picture} alt={this.state.name} />
                    <h2>
                        Welcome {this.state.name}! 
                        Email: {this.state.email}
                    </h2>
                </div>
            )
        } else {
            fbContent = (<FacebookLogin
                appId= {REACT_APP_FB}
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked} // bounce to dashboard 
                callback={this.responseFacebook} />)
        }
        return (
            <div>
                {fbContent}
            </div>
        );
    }
}

export default Facebook;