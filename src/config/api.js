//http://192.168.3.7:3000

const api = axios.create({
    baseURL: 'https://adote-app.herokuapp.com',
    timeout: 5000,
});