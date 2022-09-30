const { faker } = require('@faker-js/faker');

const fakeProd = () => ({
    title: faker.commerce.product(),
    price: faker.commerce.price(15, 999, 0),
    thumbnail: faker.image.business()
})

const fakeModification = () => ({
    title: faker.commerce.product() 
})

module.exports = { fakeProd, fakeModification }