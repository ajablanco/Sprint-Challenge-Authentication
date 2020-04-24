const request = require('supertest');
const db = require("../database/dbConfig");
const User = require("../users/users-model");
const server = require('../api/server');

describe('users router', () => {
    it ('should return all user registrations', async() => {
        User.add({username: "Aja", password: "password"});

        const users = await db("users");
        expect(users).toHaveLength(1)
    })
    describe('should register and login', () => {
        it ('should register users', async() => {
            const newUser = {username: "Chris", password: "password"};
            const res = await request(server)
            .post("/api/auth/register")
            .send(newUser);
            expect(res.status).toBe(201);
        });

    });
});

beforeEach(async () => {
    await db("users").truncate();
});