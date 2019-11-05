import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

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
        if(response.error) {
            console.log(response.error);
        } else {
            console.log(response);
        }
        this.setState ({
            isLoggedIn: true,
            userID: response.userID,
            name: response.profileObj.name,
            email: response.profileObj.email,
            picture: response.profileObj.imageUrl
        })

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            // the following do not work because we don't have the data to pull their password.
            // password: this.state.password,
            // password2: this.state.password2
        }; 

        this.props.registerUser(newUser, this.props.history);
        console.log(newUser);
    }

    // REPLACE WITH THE CODE BELOW
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('is this working');
        console.log(nextProps);
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
        // if(nextProps.auth.isAuthenticated) {
        //     this.props.history.push('/dashboard');
        // }
        
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
                clientId = {REACT_APP_G}
                buttonText="Sign In with Google"
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

Google.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    {registerUser}
)(withRouter(Google)); 