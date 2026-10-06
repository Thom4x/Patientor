# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.test.ts >> Patientor API >> GET /api/patients >> patients should not include ssn field
- Location: tests\api.test.ts:53:9

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "geder"
Received path: []

Received value: {"dateOfBirth": "1986-07-09", "gender": "male", "id": "d2773336-f723-11e9-8f0b-362b9e155667", "name": "John McClane", "occupation": "New york city cop"}
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Patientor API', () => {
  4   |   test.describe('GET /api/ping', () => {
  5   |     test('should return pong', async ({ request }) => {
  6   |       const response = await request.get('/api/ping');
  7   | 
  8   |       expect(response.ok()).toBeTruthy();
  9   |       expect(response.status()).toBe(200);
  10  | 
  11  |       const text = await response.text();
  12  |       expect(text).toBe('pong');
  13  |     });
  14  |   });
  15  | 
  16  |   test.describe('GET /api/diagnoses', () => {
  17  |     test('should return an array of diagnoses', async ({ request }) => {
  18  |       const response = await request.get('/api/diagnoses');
  19  | 
  20  |       expect(response.ok()).toBeTruthy();
  21  |       expect(response.status()).toBe(200);
  22  | 
  23  |       const body = await response.json();
  24  |       expect(Array.isArray(body)).toBeTruthy();
  25  |       expect(body.length).toBeGreaterThan(0);
  26  |     });
  27  | 
  28  |     test('each diagnosis should have code and name fields', async ({ request }) => {
  29  |       const response = await request.get('/api/diagnoses');
  30  |       const body = await response.json();
  31  | 
  32  |       for (const diagnosis of body) {
  33  |         expect(diagnosis).toHaveProperty('code');
  34  |         expect(diagnosis).toHaveProperty('name');
  35  |         expect(typeof diagnosis.code).toBe('string');
  36  |         expect(typeof diagnosis.name).toBe('string');
  37  |       }
  38  |     });
  39  |   });
  40  | 
  41  |   test.describe('GET /api/patients', () => {
  42  |     test('should return an array of patients', async ({ request }) => {
  43  |       const response = await request.get('/api/patients');
  44  | 
  45  |       expect(response.ok()).toBeTruthy();
  46  |       expect(response.status()).toBe(200);
  47  | 
  48  |       const body = await response.json();
  49  |       expect(Array.isArray(body)).toBeTruthy();
  50  |       expect(body.length).toBeGreaterThan(0);
  51  |     });
  52  | 
  53  |     test('patients should not include ssn field', async ({ request }) => {
  54  |       const response = await request.get('/api/patients');
  55  |       const body = await response.json();
  56  | 
  57  |       for (const patient of body) {
  58  |         expect(patient).not.toHaveProperty('ssn');
  59  |         expect(patient).toHaveProperty('id');
  60  |         expect(patient).toHaveProperty('name');
  61  |         expect(patient).toHaveProperty('dateOfBirth');
> 62  |         expect(patient).toHaveProperty('geder');
      |                         ^ Error: expect(received).toHaveProperty(path)
  63  |         expect(patient).toHaveProperty('occupation');
  64  |       }
  65  |     });
  66  |   });
  67  | 
  68  |   test.describe('POST /api/patients', () => {
  69  |     test('should create a new patient', async ({ request }) => {
  70  |       const newPatient = {
  71  |         name: 'Test Patient',
  72  |         dateOfBirth: '1990-01-01',
  73  |         ssn: '010190-1234',
  74  |         gender: 'male',
  75  |         occupation: 'Developer',
  76  |       };
  77  | 
  78  |       const response = await request.post('/api/patients', {
  79  |         data: newPatient,
  80  |       });
  81  | 
  82  |       expect(response.ok()).toBeTruthy();
  83  |       expect(response.status()).toBe(200);
  84  | 
  85  |       const body = await response.json();
  86  |       expect(body).toHaveProperty('id');
  87  |       expect(body).toHaveProperty('name', newPatient.name);
  88  |       expect(body).toHaveProperty('dateOfBirth', newPatient.dateOfBirth);
  89  |       expect(body).toHaveProperty('ssn', newPatient.ssn);
  90  |       expect(body).toHaveProperty('gender', newPatient.gender);
  91  |       expect(body).toHaveProperty('occupation', newPatient.occupation);
  92  |     });
  93  | 
  94  |     test('should return 400 for missing required fields', async ({ request }) => {
  95  |       const response = await request.post('/api/patients', {
  96  |         data: {
  97  |           name: 'Incomplete Patient',
  98  |         },
  99  |       });
  100 | 
  101 |       expect(response.status()).toBe(400);
  102 |     });
  103 | 
  104 |     test('should return 400 for invalid gender', async ({ request }) => {
  105 |       const response = await request.post('/api/patients', {
  106 |         data: {
  107 |           name: 'Test Patient',
  108 |           dateOfBirth: '1990-01-01',
  109 |           ssn: '010190-5678',
  110 |           gender: 'invalid_gender',
  111 |           occupation: 'Developer',
  112 |         },
  113 |       });
  114 | 
  115 |       expect(response.status()).toBe(400);
  116 |     });
  117 |   });
  118 | });
  119 | 
```