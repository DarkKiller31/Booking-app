const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async() => {

  const credentials = {
      "email": "jcamilot3@gmail.com",
      "password": "camilo1234"
  }

  const res = await request(app).post('/users/login').send(credentials);
  token = res.body.token;
})



test('GET / cities debe traer todas las ciudades', async () => {
      const res = await request(app).get('/cities');
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / cities debe crear una ciudad', async () => {
    const newCity = {
      "name": "ibage",
      "country": "Colombia",
      "countryId": "CO"
    };

    const res = await request(app).post('/cities').send(newCity)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newCity.name);
});

test('PUT / cities/:id debe de actualizar una ciudad', async() => {
    const updateCity = {
        'name': 'Ibague'
    };
const res = await request(app).put('/cities/'+id).send(updateCity)
.set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(res.body.name).toBe(updateCity.name);
});

test('DELETE / cities/:id debe eliminar una ciudad', async() => {
    const res = await request(app).delete('/cities/'+id)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});