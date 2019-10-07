import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //Apply authorization token to eveyr request if logged in
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common['Authoization'];
    }
};

export default setAuthToken;