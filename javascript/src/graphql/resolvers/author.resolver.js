import { AuthorService } from '../../services/author.service.js';

export class AuthorResolver {
  authorService;

  constructor() {
    // Would be instancied by DI and not manually
    this.authorService = new AuthorService();
  }

  queries = {
    authors: () => this.authorService.getAuthors(),
    author: (_, args) => this.authorService.getAuthorById(args.id),
  };
}
