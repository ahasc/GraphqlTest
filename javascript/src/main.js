import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { AuthorResolver } from './graphql/resolvers/author.resolver.js';
import { BookResolver } from './graphql/resolvers/book.resolver.js';
import { types } from './graphql/types.js';

const bootstrap = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const authorResolver = new AuthorResolver();
  const bookResolver = new BookResolver();

  const server = new ApolloServer({
    typeDefs: types,
    resolvers: {
      ...bookResolver.fieldResolvers,
      Query: {
        ...authorResolver.queries,
        ...bookResolver.queries,
      },
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `Server is listenning on http://localhost:4000${server.graphqlPath}`,
    );
  });
};

bootstrap();
