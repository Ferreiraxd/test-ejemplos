const { generateManyBook } = require('../fakes/book.fake');
const BooksService = require('./books.service');

const mockGetAll = jest.fn();

jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => {
    return {
        getAll: mockGetAll,
        create: () => { }
    }
}))

describe('Test for BooksService', () => {
    let service;
    beforeEach(() => {
        service = new BooksService();
        jest.clearAllMocks();
    })

    describe('test for getBooks', () => {
        // Arrange
        const fakeBooks = generateManyBook(20);
        mockGetAll.mockResolvedValue(fakeBooks);
        // Act
        test('should return a list of books', async () => {
            const books = await service.getBooks({});
            console.log(books)
            // Assert
            expect(books.length).toEqual(fakeBooks.length);
            expect(mockGetAll).toHaveBeenCalled();
            expect(mockGetAll).toHaveBeenCalledWith('books', {});
            expect(mockGetAll).toHaveBeenCalledTimes(1);
        });

        test('should return a list of books', async () => {
            const fakeBooks = generateManyBook(20);
            mockGetAll.mockResolvedValue(fakeBooks);
            const books = await service.getBooks();
            console.log(books)
            // Assert
            expect(books[0].name).toEqual(fakeBooks[0].name);
        });
    });
});