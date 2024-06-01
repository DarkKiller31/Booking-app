const request = require('supertest');
const app = require('../app');

let id;
let token;


test('POST / users debe crear un usuario', async () => {
    const newUser = {
    "firstName": "Juan",
    "lastName": "trujillo",
    "email": "jcamilot31@gmail.com",
    "password": "camilo1234",
    "genre": "male"
    };

    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST / users/login debe loggear al usuario', async () => { 
    const credentials = {
        email: 'jcamilot31@gmail.com',
        password: 'camilo1234'
    };
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email)
})



test('GET / users debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
    });


test('PUT / users/:id debe de actualizar un usuario', async() => {
    const updatedUser = {
        'firstName': 'Juan camilo'
    };
const res = await request(app).put('/users/'+id).send(updatedUser)
    .set('Authorization', `Bearer ${token}`);
expect(res.status).toBe(200);
expect(res.body.firstName).toBe(updatedUser.firstName);
});

test('POST / user/login con credenciales incorrectas debe dar error', async () => {
    const credentials = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto1234'
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test('DELETE / users/:id debe eliminar un usuario', async() => {
    const res = await request(app).delete('/users/'+id).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

