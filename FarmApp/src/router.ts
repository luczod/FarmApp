import { Router, Request, Response } from "express";
import TaskController from "./controllers/TaskControllers";
const router = Router();

//validations middleware
import { validate } from "./middleware/validation";
import { movieCreateValidation } from "./middleware/movieValidations";

router.get("/test", (req: Request, res: Response) => {
  res.status(200).send("API esta funcionado");
});

router.get("/test2", TaskController.ShowData);
router.post("/TotalMes", TaskController.getTotalMes);
router.post("/TotalAno", TaskController.getTotalAno);

export default router;
