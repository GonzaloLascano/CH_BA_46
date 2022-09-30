const request = require('supertest') ('http://localhost:8080')
const expect = require('chai').expect
const { log } = require('./config/log.js')
const { fakeProd, fakeModification } = require('./testtools/generator.js')

describe('Iniciando testeo de apirestful, seccion de productos', () => {
    
    describe ('POST petitions', () => {
        it('deberia responder un status 200 y el producto agregado', async () => {
            
            let sentData = fakeProd()

            let response = await request.post('/productos').send(sentData)
            log.info(JSON.stringify(response.body) + 'was recieved from server') 
            expect(response.status).to.eql(200)
            
        })
    })
    
    describe('GET petitions', () => {
        
        it('deberia responder un status 200 y devolver array de productos', async () => {
            let response = await request.get('/productos')
            log.info(`esta es la lista del productos hasta el momento: ${JSON.stringify(response.body)}`)
            expect(response.status).to.eql(200)
        })
    })

    describe ('PUT petitions', () => {
        it('deberia responder un status 200 y mensaje enunciando producto antes y despues de ser modificado', async () => {
            
            let sentData = fakeModification()

            let response = await request.put('/productos/1').send(sentData)
            log.info(response.body) 
            expect(response.status).to.eql(200)
            
        })
    })

    describe ('DELETE petitions', () => {
        it('deberia responder un status 200 y mensaje confirmando eliminacion', async () => {

            let response = await request.delete('/productos/1')
            log.info(response.body) 
            expect(response.status).to.eql(200)
            
        })
    })


})
