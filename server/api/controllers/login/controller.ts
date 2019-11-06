import { Request, Response } from "express";

export class Controller {
  generateToken(req: Request, res: Response): void {
    res.status(401).send();
  }
}
export default new Controller();
