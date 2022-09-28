import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import { PrismaClient, Prisma } from "@prisma/client";
import Query from "./src/resolvers/Query";
import Category from "./src/resolvers/Category";

const prisma = new PrismaClient();

const typeDefs = readFileSync(
  path.join(__dirname, "./src/schema.graphql")
).toString("utf-8");

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

const server = new ApolloServer({
  typeDefs,
  context: {
    prisma,
  } as Context,
  resolvers: { Query: Query, Category: Category },
  csrfPrevention: true,
  cache: "bounded",
  /**
   * For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}!`);
});
