import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://us-central1-clone-1c520.cloudfunctions.net/api'

    //    baseURL: 'http://localhost:5001/clone-1c520/us-central1/api'//
})

export default instance;