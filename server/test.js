const request = require('supertest');
const app = require('./server');


describe('POST /fizzbuzz', () => {
  it('must return the desired output', async () => {
    const inputData = { values: [3, 5, 15, 7] };
    const expectedOutput = [
      { value: 3, output: 'Fizz', divisions: [' Divided 3 by 3'] },
      { value: 5, output: 'Buzz', divisions: ['Divided 5 by 5'] },
      { value: 15, output: 'FizzBuzz', divisions: [' Divided 15 by 3', 'Divided 15 by 5'] },
      { value: 7, output: '', divisions: [] },
     
    ];

    const response = await request(app)
      .post('/fizzbuzz')
      .send(inputData)
      .expect(200);

    expect(response.body).toEqual(expectedOutput);
  });

  it('returns "Invalid item" ', async () => {
    const inputData = { values: ['a', 'b', 'c'] };
    const expectedOutput = [
      { value: 'a', output: 'Invalid item', divisions: [] },
      { value: 'b', output: 'Invalid item', divisions: [] },
      { value: 'c', output: 'Invalid item', divisions: [] }
    ];

    const response = await request(app)
      .post('/fizzbuzz')
      .send(inputData)
      .expect(200);

    expect(response.body).toEqual(expectedOutput);
  });
});
