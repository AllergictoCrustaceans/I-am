import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    render () {
        return (
            <div className = "navbar-fixed">
                <nav className = "z-depth-0">
                    <div className = "nav-wrapper white">
                        <Link to="/" style = {{fontFamily: "monospace"}} className = "col s5 brand-logo center black-text">
                            <i className = "material-icons">code</i>
                            I AM
                        </Link>


                        {/* Profile Link */}


                        {/* Setting Link */}
                        <Link to="/settings" style={{width: "2px", borderRadius: "20px"}} className = "btn btn-small waves-effect waves-light hoverable blue accent-3">
                            {/* animate blue pulse */}
                        </Link>

                        {/* Help Link */}
                        <Link to="/help" style={{width: "2px", borderRadius: "20px"}} className = "btn btn-small waves-effect waves-light hoverable purple accent-3">
                            {/* animate purple pulse  */}
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;