import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

const REACT_APP_G = process.env.REACT_APP_G;

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

    // REPLACE WITH THE CODE BELOW
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }


    // componentDidUpdate(prevProps, prevState) {
    //     if(nextProps.auth.isAuthenticated) {
    //         this.props.history.push('/dashboard');
    //     }
        
    //     if(nextProps.error) {
    //         this.setState ({
    //             errors: nextProps.errors
    //         });
    //     }
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if(nextProps.auth.isAuthenticated) {
    //         return {}
    //     } else {
    //         return null;    
    //     }
    // }  

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
                clientId=''
                buttonText=""
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