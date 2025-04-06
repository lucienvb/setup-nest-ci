import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; owner: string }) {
    return this.booksService.create(body.title, body.owner);
  }
}
