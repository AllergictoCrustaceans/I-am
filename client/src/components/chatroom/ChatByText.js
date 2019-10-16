import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ChatByText extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className = "card">
                {/* <div className = "card-img" src= "background animation" alt="color white" */}
                <div className = "card-img-overlay">
                    {/* Bot avatar */}
                    <p className = "card-text">
                         {/* Bot initiates conversation */}
                         Bot says somthing. This text should be coming from the left. 
                    </p>
                    {/* User input button */}
                </div>
            </div>
        )
    }
}

export default ChatByText;