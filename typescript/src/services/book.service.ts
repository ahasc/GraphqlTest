import { DailymotionApiClient } from '../clients/dailymotion';
import { Books } from '../datas.json';

import { Book } from '../graphql/types/book';
import { Video } from '../graphql/types/video';

export class BookService {
  private dailymotionApiClient: DailymotionApiClient;

  private books: Book[];

  constructor() {
    // Would be instancied by DI and not manually
    this.dailymotionApiClient = new DailymotionApiClient();
    this.books = Books as unknown as Book[];
  }

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book {
    return this.books.find((book: Book) => book.id === id);
  }

  getVideoInfos(videoId: string): Promise<Video> {
    return this.dailymotionApiClient.getVideoInfosById(videoId);
  }
}
