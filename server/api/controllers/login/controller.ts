import { Request, Response } from "express";
import config from "../../configuration/service";
import { JWT, JWK } from "jose";
import { OAuth2Client } from "google-auth-library";
import { readFileSync } from "fs";
import { resolve } from "path";

const verifier = new OAuth2Client(config.google.clientid);

const conf = readFileSync(resolve("/var/run/secret/jwk.json"));
const data = JSON.parse(conf.toString());
const key = JWK.asKey(data);

export class Controller {
  generateToken(req: Request, res: Response): void {
    const { token } = req.body;
    verifier
      .verifyIdToken({ idToken: token, audience: config.google.clientid })
      .then(g => {
        const { email_verified, email } = g.getPayload();
        if (!email_verified) {
          res.status(401).send({
            msg: "email not verified"
          });
        }

        const token = JWT.sign(
          {
            email,
            role: "doesnt:matter"
          },
          key,
          {
            audience: ["role"],
            expiresIn: "1 minute"
          }
        );

        // yeah do that
        res.status(200).send({
          token
        });
      })
      .catch(err => {
        res.status(401).send();
      });
  }
}
export default new Controller();
