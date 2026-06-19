// tests/health.test.js
const { test } = require('node:test')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('health endpoint returns ok', async () => {
  await api
    .get('/health')
    .expect(200)
    .expect('ok')
})
