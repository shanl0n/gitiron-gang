import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./context";

// TODO: make secret
const JWT_SECRET = "secretooooh"

export const Auth: Record<string, RequestHandler> = {
  login: async (req, resp) => {

    const user = await req.ctx.dataSources.users.findOne({ email: req.body?.email });

    if (!user || user.password !== req.body?.password) {
      resp.status(403).send("Incorrect email or password");
      return;
    }
    
    const fantasyTeam = await req.ctx.dataSources.fantasyTeams.findOne({id: user.fantasyTeamId});
    if (!fantasyTeam) {
      resp.status(500).send("Internal Server Error");
      return;
    }

    const payload = {
      userId: user.id,
      fantasyTeamId: fantasyTeam.id,
    } as JwtPayload;

    jwt.sign(payload, JWT_SECRET, (err, token) => {
      if (err) {
        resp.status(500).send("Internal Server Error");
      } else {
        resp.json({ token });
      }
    });
  },

  verify: async (req, resp, next) => {
    const bearerHeader = req.headers.authorization?.split(" ") || [];
    if (bearerHeader.length < 2) {
      resp.status(403).send("Forbidden");
      return;
    }
    const token = bearerHeader[1];

    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        resp.status(403).send("Forbidden");
      }
      else {
        req.ctx.jwtPayload = payload as JwtPayload;
        next();
      }
    })
  },
};
