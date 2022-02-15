import { gql } from 'apollo-server-core';

export const types = gql`
    type Book {
        id: Int!
        title: String!
        description: String!
        date: String!
        authorId: Int!
        author: Author!
        videoId: String
        video: Video
    }

    type Author {
        id: Int!
        name: String!
        country: String!
    }

    type Video {
        id: String!
        title: String!
        owner: String!
        channel: String!
    }

    type Query {
        books: [Book]!
        book(id: Int!): Book
        authors: [Author]!
        author(id: Int!): Author
    }
`