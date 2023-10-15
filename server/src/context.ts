import { Datasource } from "./datasource";

export interface JwtPayload {
  userId: string;
  fantasyTeamId: string;
}

export interface RequestContext {
  dataSources: Datasource;
  jwtPayload?: JwtPayload;
}

declare global {
  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}