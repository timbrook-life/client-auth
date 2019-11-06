import { Request, Response } from "express";

export class Controller {
  generateToken(req: Request, res: Response): void {
    res.json({
      token: "boop"
    });
  }
}
export default new Controller();
