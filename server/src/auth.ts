import { Datasource } from "./datasource";
import jwt from "jsonwebtoken";

// TODO: make secret
const JWT_SECRET = "secretooooh"

export const Auth = (dataSources: Datasource) => ({
  login: async (req, resp) => {
    const user = await dataSources.users.findOne({ email: req.body?.email });
    
    if (user && user.password === req.body?.password) {
      const payload = {
        userId: user.id,
      };

      jwt.sign(payload, JWT_SECRET, (err, token) => {
        resp.json({ token });
      });
    }
  },
  verify: async (req, resp) => {

  },
});
