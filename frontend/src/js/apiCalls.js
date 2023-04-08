import Axios from 'axios';

export const getSkaters = async() => {
    Axios.get('https://lyonhacks3-production.up.railway.app/api/skaters/').then((response) => {
        return response.data;
    }
    );
}

export const getGoalies = async() => {
    Axios.get('https://lyonhacks3-production.up.railway.app/api/goalies/').then((response) => {
        return response.data;
    }
    );
}