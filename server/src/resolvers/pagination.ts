import { ApolloError } from "apollo-server-express";
import { Connection, PaginationInput, Node, Edge } from "../schema/types";
import { Filter, WithId } from "mongodb";
import { Collection } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";
import { encode as cursorEncode } from "mongo-cursor-pagination/src/utils/bsonUrlEncoding";

const validatePaginationInput = (input: PaginationInput) => {
  if (input.first && input.last) {
    throw new ApolloError("Cannot give both first and last args", "BAD_USER_INPUT");
  }

  if (input.beforeCursor && input.afterCursor) {
    throw new ApolloError("Cannot give both beforeCursor and afterCursor args", "BAD_USER_INPUT");
  }

  if (input.first <= 0 || input.last <= 0) {
    throw new ApolloError("The args first and last must be a positive int", "BAD_USER_INPUT");
  }

  if (input.beforeCursor === "" || input.afterCursor === "") {
    throw new ApolloError("The args beforeCursor and afterCursor cannot be empty strings", "BAD_USER_INPUT");
  }
}

interface MongoPage<T extends Node> {
  results: WithId<T>[],
  hasNext: boolean,
  hasPrevious: boolean,
  next?: string,
  previous?: string;
}

export const paginationQuery = async <T extends Node>(collection: Collection<T>, input?: PaginationInput, query?: Filter<T>): Promise<Connection<T>> => {
  if (input) validatePaginationInput(input);

  let limit = 25;

  if (input?.first) limit = input.first;
  if (input?.last) limit = input.last;

  const page = await MongoPaging.find(collection, {
    limit,
    query,
    next: input?.afterCursor,
    previous: input?.beforeCursor,
  }) as MongoPage<T>;

  const edges = page.results.map((item) => ({
    cursor: cursorEncode(item._id),
    node: item,
  } as Edge<T>));

  return {
    pageInfo: {
      hasNextPage: page.hasNext as boolean,
      hasPreviousPage: page.hasPrevious as boolean,
      startCursor: page.previous as string,
      endCursor: page.next as string,
    },
    edges,
  };
}