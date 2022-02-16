import { BookService } from '../../services/book.service.js';
import { AuthorService } from '../../services/author.service.js';

export class BookResolver {
  bookService;

  authorService;

  constructor() {
    // Would be instancied by DI and not manually
    this.bookService = new BookService();
    this.authorService = new AuthorService();
  }

  queries = {
    books: () => this.bookService.getBooks(),
    book: (_, args) => this.bookService.getBookById(args.id),
  };

  fieldResolvers = {
    Book: {
      author: ({ authorId }) => this.authorService.getAuthorById(authorId),
      video: ({ videoId }) => this.bookService.getVideoInfos(videoId),
    },
  };
}
