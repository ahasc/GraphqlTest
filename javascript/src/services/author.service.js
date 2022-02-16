import Dataset from '../datas.json';

export class AuthorService {
  authors;

  constructor() {
    this.authors = Dataset.Authors;
  }

  getAuthors() {
    return this.authors;
  }

  getAuthorById(id) {
    return this.authors.find((author) => author.id === id);
  }
}
