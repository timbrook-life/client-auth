import { Request, Response } from "express";
import config from "../../configuration/service";

export class Controller {
  generateToken(req: Request, res: Response): void {
    console.log(config);
    res.status(401).send();
  }
}
export default new Controller();
