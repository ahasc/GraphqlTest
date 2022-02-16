import { Arg, Int, Query, Resolver } from 'type-graphql';

import { AuthorService } from '../../services/author.service';

import { Author } from '../types/author';

@Resolver(() => Author)
export class AuthorResolver {
  private authorService: AuthorService;

  constructor() {
    // Would be instancied by DI and not manually
    this.authorService = new AuthorService();
  }

  @Query(() => [Author], { nullable: 'items' })
  authors(): Author[] {
    return this.authorService.getAuthors();
  }

  @Query(() => Author, { nullable: true })
  author(@Arg('id', () => Int) id: number): Author {
    return this.authorService.getAuthorById(id);
  }
}
