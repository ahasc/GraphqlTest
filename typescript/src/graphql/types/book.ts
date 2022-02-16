import { Field, Int, ObjectType } from 'type-graphql';

import { Author } from './author';
import { Video } from './video';

@ObjectType()
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  date: string;

  @Field(() => Int)
  authorId: number;

  @Field(() => Author)
  author: Author;

  @Field({ nullable: true })
  videoId?: string | undefined;

  @Field(() => Video, { nullable: true })
  video?: Video;
}
