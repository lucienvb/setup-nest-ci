import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  findAll() {
    return this.bookRepository.find();
  }

  create(title: string, owner: string) {
    const book = this.bookRepository.create({ title, owner });
    return this.bookRepository.save(book);
  }
}
