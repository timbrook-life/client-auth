import { Request, Response } from "express";

export class StatusController {
  status(req: Request, res: Response): void {
    res.json({
      status: "ok"
    });
  }
}
export default new StatusController();
