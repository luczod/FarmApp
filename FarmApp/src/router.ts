import { Router, Request, Response } from "express";
import TaskController from "./controllers/TaskControllers";
const router = Router();

//validations middleware

router.get("/test", (req: Request, res: Response) => {
  res.status(200).send("API esta funcionado");
});

router.get("/test2", TaskController.ShowData);
router.get("/Total", TaskController.ShowTotal);
router.post("/budgetMes", TaskController.getbudgetMes);
router.post("/budgetAno", TaskController.getbudgetAno);
router.post("/budgetData", TaskController.getbudgetDataInteira);
router.post("/ReceitaMes", TaskController.getReceitaMes);
router.post("/ReceitaAno", TaskController.getReceitaAno);
router.post("/ReceitaData", TaskController.getReceitaData);
router.post("/ReceitaData", TaskController.budgetAdd);
router.post("/manyReceita", TaskController.manyReceitaDataInteira);
router.post("/manyDespesa", TaskController.manyDespesaDataInteira);
router.post("/TotalDespesa", TaskController.getTotalNatureza);
router.post("/TotalReceita", TaskController.getTotalReceita);

export default router;
