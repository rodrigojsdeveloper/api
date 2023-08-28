import { Request, Response } from "express";

class TermsController {
  terms(req: Request, res: Response) {
    return res.json({ message: "Terms and Services" });
  }
}

export { TermsController };
