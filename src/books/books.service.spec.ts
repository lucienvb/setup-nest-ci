import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BooksService', () => {
  let service: BooksService;
  let mockRepository: Partial<Record<keyof Repository<Book>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest
        .fn()
        .mockResolvedValue([
          { id: 1, title: 'Mock Book', owner: 'Mock Owner' },
        ]),
      create: jest.fn().mockReturnValue({
        title: 'Mock Book',
        owner: 'Mock Owner',
      }),
      save: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Mock Book',
        owner: 'Mock Owner',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all books', async () => {
    const books = await service.findAll();
    expect(mockRepository.find).toHaveBeenCalled();
    expect(books).toEqual([{ id: 1, title: 'Mock Book', owner: 'Mock Owner' }]);
  });

  it('should create a book', async () => {
    const book = await service.create('Mock Book', 'Mock Owner');
    expect(mockRepository.create).toHaveBeenCalledWith({
      title: 'Mock Book',
      owner: 'Mock Owner',
    });
    expect(mockRepository.save).toHaveBeenCalled();
    expect(book).toEqual({
      id: 1,
      title: 'Mock Book',
      owner: 'Mock Owner',
    });
  });
});
