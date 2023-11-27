import frouter from "./foodRouter.js"
import crouter from "./categoryRouter.js"
import express from"express"
const mainRouter=express.Router();
mainRouter.use(express.json());
mainRouter.use("/food",frouter)
mainRouter.use("/category",crouter)
 export default mainRouter