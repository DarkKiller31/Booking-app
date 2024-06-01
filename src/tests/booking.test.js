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


test('GET / bookings debe traer todos los booking', async () => {
      const res = await request(app).get('/bookings').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / bookings debe crear un booking', async () => {
    const newBooking = {
        'checkIn': '2024-05-31',
        'checkOut': '2024-06-15'
    };

    const res = await request(app).post('/bookings').send(newBooking).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.checkIn).toBe(newBooking.checkIn);
});

test('PUT / bookings/:id debe de actualizar un booking', async() => {
    const updatedBooking = {
      'checkIn': '2024-06-03'
    };
const res = await request(app).put('/bookings/'+id).send(updatedBooking).set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(res.body.checkIn).toBe(updatedBooking.checkIn);
});

test('DELETE / bookings/:id debe eliminar un booking', async() => {
    const res = await request(app).delete('/bookings/'+id).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});