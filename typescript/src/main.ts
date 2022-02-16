import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import express from 'express';
import http from 'http';
import path from 'path';

import { BookResolver } from './graphql/resolvers/book.resolver';
import { AuthorResolver } from './graphql/resolvers/author.resolver';

const bootstrap = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, AuthorResolver],
      emitSchemaFile: path.resolve(__dirname, '../schema.gql'),
    }),
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
