import { Router, Request, Response } from "express";
import TaskController from "./controllers/TaskControllers";
const router = Router();

//validations middleware

router.get("/test", (req: Request, res: Response) => {
  res.status(200).send("API ok");
});

router.get("/Total", TaskController.ShowTotal);
router.post("/budgetMes", TaskController.getbudgetMes);
router.post("/budgetAno", TaskController.getbudgetAno);
router.post("/budgetData", TaskController.getbudgetDataInteira);
router.post("/ReceitaMes", TaskController.getReceitaMes);
router.post("/ReceitaAno", TaskController.getReceitaAno);
router.post("/ReceitaData", TaskController.getReceitaData);
router.post("/manyReceita", TaskController.manyReceitaDataInteira);
router.post("/manyDespesa", TaskController.manyDespesaDataInteira);
router.post("/manyDespesaAno", TaskController.manyDespesaAno);
router.post("/TotalDespesa", TaskController.getTotalDespesa);
router.post("/TotalReceita", TaskController.getTotalReceita);
router.post("/AddValor", TaskController.AddValores);

export default router;
