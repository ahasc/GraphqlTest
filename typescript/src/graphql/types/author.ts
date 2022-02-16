import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  country: string;
}
