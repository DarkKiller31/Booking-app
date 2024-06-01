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

test('GET / reviews debe traer todos los review', async () => {
      const res = await request(app).get('/reviews').set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array)
    });

test('POST / reviews debe crear un review', async () => {
    const newReview = {
        'rating': 3,
        'comment': 'jkhjkzhjxkjhzkxh'
    };

    const res = await request(app).post('/reviews').send(newReview).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(+res.body.rating).toBe(newReview.rating);
});

test('PUT / reviews/:id debe de actualizar un review', async() => {
    const updatedReview = {
        'rating': 4
    };
const res = await request(app).put('/reviews/'+id).send(updatedReview).set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(+res.body.rating).toBe(updatedReview.rating);
});

test('DELETE / reviews/:id debe eliminar un review', async() => {
    const res = await request(app).delete('/reviews/'+id).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});