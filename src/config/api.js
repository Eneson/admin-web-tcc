//http://192.168.3.7:3000
//https://adote-app.herokuapp.com
const api = axios.create({
    baseURL: 'https://adote-app.herokuapp.com',
    timeout: 5000,
});