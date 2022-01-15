import * as express from "express";
import {lk} from "./handler"
const router = express.Router();
const app = express();

router.get('/lk/:param',async (request,response) => {
    response.send(await lk(request.params.param))
});

router.get('/lnd/:param',(request,response) => {
    response.send(request.params.param)
});

router.get('/bl/:param',(request,response) => {
    response.send(request.params.param)
});

router.get('/geo/',(request,response) => {
    response.send(request.query.long + " " + request.query.lat)
});

// add router in the Express app.
app.use("/", router)
app.listen(3000,() => {
    console.log("Started on PORT 3000");
    })