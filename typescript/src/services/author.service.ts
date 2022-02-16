import { Authors } from '../datas.json';

import { Author } from '../graphql/types/author';

export class AuthorService {
  private authors: Author[];

  constructor() {
    this.authors = Authors;
  }

  getAuthors(): Author[] {
    return this.authors;
  }

  getAuthorById(id: number): Author {
    return this.authors.find((author: Author) => author.id === id);
  }
}
