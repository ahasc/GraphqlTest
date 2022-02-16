import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import axios from 'axios';

import { Books, Authors } from '../src/datas.json';
import { BookResolver } from '../src/graphql/resolvers/book.resolver';
import { types } from '../src/graphql/types';

describe('BookResolver tests', () => {
  let httpServer;
  let apolloServer;

  beforeAll(async () => {
    const app = express();
    httpServer = http.createServer(app);

    const bookResolver = new BookResolver();
    apolloServer = new ApolloServer({
      typeDefs: types,
      resolvers: {
        ...bookResolver.fieldResolvers,
        Query: {
          ...bookResolver.queries,
        },
      },
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    httpServer.listen({ port: 4000 });
  });

  afterAll(async () => {
    await apolloServer.stop();
    httpServer.close();
  });

  it('should return set of books with requested properties', async () => {
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getBooks {
                    books {
                        id
                        title
                        description
                        date
                        authorId
                        videoId
                    }
                }
            `,
      })
      .then(({ data }) => data);

    const normalizeExpectedBooks = Books.map((book) => ({
      ...book,
      videoId: book.videoId || null,
    }));
    expect(data.books).toStrictEqual(normalizeExpectedBooks);
  });

  it('should return book with ID 2 with requested properties', async () => {
    const requestedId = 2;
    const expectedBook = Books.find((book) => book.id === requestedId);
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getBookById($id: Int!) {
                    book(id: $id) {
                        id
                        title
                        description
                        date
                        authorId
                        videoId
                    }
                }
            `,
        variables: {
          id: requestedId,
        },
      })
      .then(({ data }) => data);

    expect(data.book).toStrictEqual({
      ...expectedBook,
      videoId: null,
    });
  });

  it('should return book with ID 2 with requested properties and author informations', async () => {
    const requestedId = 2;
    const expectedBook = Books.find((book) => book.id === requestedId);
    const author = Authors.find(
      (author) => author.id === expectedBook.authorId,
    );
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getBookByIdWithAuthorInfos($id: Int!) {
                    book(id: $id) {
                        id
                        title
                        description
                        date
                        authorId
                        author {
                            id
                            name
                            country
                        }
                    }
                }
            `,
        variables: {
          id: requestedId,
        },
      })
      .then(({ data }) => data);

    expect(data.book).toStrictEqual({
      ...expectedBook,
      author,
    });
  });

  it('should return book with ID 2 with requested properties and video informations', async () => {
    const requestedId = 1;
    const expectedBook = Books.find((book) => book.id === requestedId);
    const videoInfos = {
      id: 'x3gjlw6',
      title: 'Critique de "Cherub" par loulouroman',
      owner: 'x18vl3y',
      channel: 'creation',
    };
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getBookByIdWithAuthorInfos($id: Int!) {
                    book(id: $id) {
                        id
                        title
                        description
                        date
                        authorId
                        videoId
                        video {
                            id
                            title
                            owner
                            channel
                        }
                    }
                }
            `,
        variables: {
          id: requestedId,
        },
      })
      .then(({ data }) => data);

    expect(data.book).toStrictEqual({
      ...expectedBook,
      video: videoInfos,
    });
  });
});
