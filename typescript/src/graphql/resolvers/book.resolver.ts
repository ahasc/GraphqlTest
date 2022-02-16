import { Arg, FieldResolver, Int, Query, Resolver, Root } from 'type-graphql';

import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';

import { Author } from '../types/author';
import { Book } from '../types/book';
import { Video } from '../types/video';

@Resolver(() => Book)
export class BookResolver {
  private bookService: BookService;

  private authorService: AuthorService;

  constructor() {
    // Would be instancied by DI and not manually
    this.bookService = new BookService();
    this.authorService = new AuthorService();
  }

  @Query(() => [Book], { nullable: 'items' })
  books(): Book[] {
    return this.bookService.getBooks();
  }

  @Query(() => Book, { nullable: true })
  book(@Arg('id', () => Int) id: number): Book {
    return this.bookService.getBookById(id);
  }

  @FieldResolver(() => Author, { name: 'author' })
  author(@Root('authorId') authorId: number): Author {
    return this.authorService.getAuthorById(authorId);
  }

  @FieldResolver(() => Video, { nullable: true, name: 'video' })
  video(@Root('videoId') videoId?: string): Promise<Video> {
    if (!videoId) {
      return null;
    }

    return this.bookService.getVideoInfos(videoId);
  }
}
