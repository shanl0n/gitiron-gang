import { ApolloError } from "apollo-server-express";
import { Connection, PaginationInput, Node } from "../schema/types";
import { Filter, WithId } from "mongodb";
import { Collection } from "mongoose";

const validatePaginationInput = (input: PaginationInput) => {
  if (input.page <= 0 || input.pageSize <= 0) {
    throw new ApolloError(
      "The args page and pageSize must be a positive int",
      "BAD_USER_INPUT"
    );
  }
};

export const paginationQuery = async <T extends Node>(
  collection: Collection<T>,
  input?: PaginationInput,
  filter?: Filter<T>
): Promise<Connection<T>> => {
  if (input) validatePaginationInput(input);

  const itemCount = await collection.countDocuments(filter);
  const pageSize = input?.pageSize || 25;
  const pageCount = Math.ceil(itemCount / pageSize);

  const currentPage = input?.page || 0;
  const offset = currentPage * pageSize;

  const page = await collection
    .find(filter)
    .limit(pageSize)
    .skip(offset)
    .toArray();

  return {
    pageInfo: {
      pageCount,
      currentPage,
      itemCount,
    },
    nodes: page as T[],
  };
};
