import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Video {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  owner: string;

  @Field()
  channel: string;
}
