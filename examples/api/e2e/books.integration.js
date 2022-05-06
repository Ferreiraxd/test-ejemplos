const request = require('supertest');

const { generateManyBook } = require('../src/fakes/book.fake');

const mockGetAll = jest.fn();

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => { },
})));

const createApp = require('../src/app');

describe('Test for Books', () => {
    let app = null;
    let server = null;
    beforeAll(() => {
        app = createApp();
        server = app.listen(3001);
    });

    afterAll(async () => {
        await server.close();
    })

    describe('test for [GET] /api/v1/books', () => {
        test('should return a list of books', () => {
            const fakeBooks = generateManyBook(3);
            mockGetAll.mockResolvedValue(fakeBooks);
            return request(app).get('/api/v1/books').expect(200)
                .then(({ body }) => {
                    console.log(body);
                    expect(body.length).toEqual(3);
                })
        });
    });
});