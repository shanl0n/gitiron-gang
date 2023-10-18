import { ApolloError } from "apollo-server-express";
import { Connection, PaginationInput } from "../schema/types";
import { Filter, ObjectId, Sort, WithId } from "mongodb";
import { Collection } from "mongoose";

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

type HasNextF<T> = (data: WithId<T>[]) => Promise<boolean>;

interface MongoPaginationOptions<T> {
  filter: Filter<T>;
  sort: Sort;
  limit: number;
  reverseOrder: boolean;
  hasNext: HasNextF<T>;
}
export const paginationInputToMongo = <T>(collection: Collection<T>, input?: PaginationInput): MongoPaginationOptions<T> => {
  validatePaginationInput(input);

  let limit = 25;
  let sort: Sort = { _id: 1 };
  let reverseOrder = false;
  let filter = {};

  if (input.first) limit = input.first;
  if (input.last) limit = input.last;

  if (input.last || input.beforeCursor) {
    sort = { _id: -1 };
    reverseOrder = true;
  }

  if (input.afterCursor) {
    filter = {
      _id: { $gt: new ObjectId(input.afterCursor) }
    }
  }
  if (input.beforeCursor) {
    filter = {
      _id: { $lt: new ObjectId(input.beforeCursor) }
    }
  }

  const hasNext = async (items: WithId<T>[]) => {
    if (!items.length) return false;
    
    const order = reverseOrder ? '$lt' : '$gt';
    const cursor = new ObjectId(items[items.length - 1]._id);
    
    const filter: Filter<T> = {
      _id: {
        [order]: cursor,
      }
    };

    return await collection.findOne(filter).then(() => true).catch(() => false);
  };

  return {
    limit,
    sort,
    filter,
    reverseOrder,
    hasNext,
  }
}

export const createConnection = <T>(items: WithId<T>[], reverseOrder: boolean, hasNextF: HasNextF<T>): Connection<T> => {
  const hasNext = hasNextF(items);

  // if (items.length === 0) {
  //   return {
  //     pageInfo: {
  //       hasNextPage: reverseOrder ,
  //       hasPreviousPage: Boolean(input.hasP),
  //     },
  //     edges: [],
  //   };
  }
}