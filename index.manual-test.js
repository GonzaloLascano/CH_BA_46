const axios = require('axios'); 

axios.default.defaults.baseURL = 'http://localhost:8080'

axios.default.get('/productos')
.then(response => console.log(response.data))
.catch( error => console.log(error))
.finally(() => console.log('get request to productos finished'));


axios.default.post('/productos', {
    title:'perfume', price: 342, thumbnail:'perfumeURL'
})
.then(response => console.log(response.data))
.catch( error => console.log(error))
.finally(() => console.log('post request to productos finished'));

axios.default.put('/productos/1', {
    title:'perfume frances', price: 351, thumbnail:'perfumeURL'
})
.then(response => console.log(response.data))
.catch( error => console.log(error))
.finally(() => console.log('put request to productos/id finished'));

axios.default.delete('/productos/1')
.then(response => console.log(response.data))
.catch( error => console.log(error))
.finally(() => console.log('delete request to productos/id finished'));
