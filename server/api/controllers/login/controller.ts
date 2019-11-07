import { Request, Response } from "express";
import config from "../../configuration/service";

import { OAuth2Client } from "google-auth-library";

const verifier = new OAuth2Client(config.google.clientid);
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
        // Gen JWT for postgrest with role for email
        // yeah do that
        res.status(200).send({
          email,
          token: "no token yet"
        });
      })
      .catch(err => {
        res.status(401).send();
      });
  }
}
export default new Controller();
