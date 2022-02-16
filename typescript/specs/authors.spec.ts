import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';
import axios from 'axios';

import { Authors } from '../src/datas.json';
import { AuthorResolver } from '../src/graphql/resolvers/author.resolver';

describe('AuthorResolver tests', () => {
  let httpServer: http.Server;
  let apolloServer: ApolloServer;

  beforeAll(async () => {
    const app = express();
    httpServer = http.createServer(app);

    apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [AuthorResolver],
      }),
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

  it('should return set of authors with requested properties', async () => {
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getAuthors {
                    authors {
                        id
                        name
                        country
                    }
                }
            `,
      })
      .then(({ data }) => data);

    expect(data.authors).toStrictEqual(Authors);
  });

  it('should return author with ID 2 with requested properties', async () => {
    const requestedId = 2;
    const expectedAuthor = Authors.find((author) => author.id === requestedId);
    const { data } = await axios
      .post('http://localhost:4000/graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        query: `
                query getAuthorById($id: Int!) {
                    author(id: $id) {
                        id
                        name
                        country
                    }
                }
            `,
        variables: {
          id: requestedId,
        },
      })
      .then(({ data }) => data);

    expect(data.author).toStrictEqual(expectedAuthor);
  });
});
