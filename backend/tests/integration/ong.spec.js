const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('shoud be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                    name: "APAE",
                    email: "apae@gmail.com",
                    whatsapp: "92991343664",
                    city: "Manaus",
                    uf: "AM"        
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});