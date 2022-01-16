import * as express from "express";
import {lk, bl, lnd, geo} from "./handler"
const router = express.Router();
const app = express();

router.get('/lk/:param',async (request,response) => {
    response.send(await lk(request.params.param))
});

router.get('/bl/:param', async (request,response) => {
    response.send(await bl(request.params.param))
});

router.get('/lnd/:param',async (request,response) => {
    response.send(await lnd(request.params.param))
});

router.get('/geo/:param',async (request,response) => {
    response.send(await geo(request.params.param, request.query.lat, request.query.lon))
});

app.use("/", router)
app.listen(3000,() => {
    console.log("Started on PORT 3000");
})