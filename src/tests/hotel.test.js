const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async() => {

  const credentials = {
      "email": "jcamilot3@gmail.com",
      "password": "camilo1234"
  }

  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
})

test('GET / hotels debe traer todos los hoteles', async () => {
      const res = await request(app).get('/hotels');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / hotels debe crear un hotel', async () => {
    const newHotel = {
      "name": "Hilton",
      "description": "cadena de hotel",
      "price": "255",
      "address": "new york",
      "lat": "232528",
      "lon": "5215215"
    };

    const res = await request(app).post('/hotels').send(newHotel).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newHotel.name);
});

test('PUT / hotels/:id debe de actualizar un hotel', async() => {
    const updatedHotel = {
        'name': 'Hilton Hotel'
    };
const res = await request(app).put('/hotels/'+id).send(updatedHotel).set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(res.body.name).toBe(updatedHotel.name);
});

test('DELETE / hotels/:id debe eliminar un hotel', async() => {
    const res = await request(app).delete('/hotels/'+id).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});