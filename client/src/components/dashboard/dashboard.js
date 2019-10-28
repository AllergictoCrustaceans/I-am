import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logoutUser} from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (

            // blender import background

            <div style= {{height: "25px"}} className = "container valign-wrapper" >
                <div className = "row">
                    <div className = "col s12 center-align">
                        <button
                            style = {{ 
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick = {this.onLogoutClick}
                            className = "btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Logout
                        </button>


                        {/* Link to /chatlog endpoint from backend */}
                        <div className = "col s6">
                            <Link to= "/chatlog" style ={{width: "140px", borderRadius: "20px", letterSpacing: "1.5px"}} className = "btn btn-large waves-effect waves-light hoverable blue accent-3">
                                Chat Log
                            </Link>
                        </div>

                        {/* Link to /mood endpoint from backend */}
                        <div className = "col s6">
                            <Link to="/mood" style={{width: "140px", borderRadius: "20px", letterSpacing: "1.5px"}} className = "btn btn-large waves-effect waves-light hoverable purple black-text">
                                Mood
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect (
    mapStateToProps,
    {logoutUser}
)(Dashboard);