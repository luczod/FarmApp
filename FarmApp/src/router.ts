import { Router, Request, Response } from "express";
import TaskController from "./controllers/TaskControllers";
const router = Router();

//validations middleware

router.get("/test", (req: Request, res: Response) => {
  res.status(200).send("API esta funcionado");
});

router.get("/test2", TaskController.ShowData);
router.get("/Total", TaskController.ShowTotal);
router.post("/TotalMes", TaskController.getTotalMes);
router.post("/TotalAno", TaskController.getTotalAno);
router.post("/TotalData", TaskController.getTotalDataInteira);
router.post("/TotalMult", TaskController.getTotalMult);

export default router;
