import { DailymotionApiClient } from '../clients/dailymotion.js';
import Dataset from '../datas.json';

export class BookService {
  dailymotionApiClient;

  books;

  constructor() {
    // Would be instancied by DI and not manually
    this.dailymotionApiClient = new DailymotionApiClient();
    this.books = Dataset.Books;
  }

  getBooks() {
    return this.books;
  }

  getBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  getVideoInfos(videoId) {
    return this.dailymotionApiClient.getVideoInfosById(videoId);
  }
}
