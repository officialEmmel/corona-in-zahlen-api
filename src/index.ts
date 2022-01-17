import * as express from "express";
import {l} from "./log"
import {lk, bl, lnd, geo} from "./handler"
const router = express.Router();
const app = express();

let version = "1.2.2";

console.log(`
██████╗██╗███████╗      █████╗ ██████╗ ██╗
██╔════╝██║╚══███╔╝     ██╔══██╗██╔══██╗██║
██║     ██║  ███╔╝█████╗███████║██████╔╝██║
██║     ██║ ███╔╝ ╚════╝██╔══██║██╔═══╝ ██║
╚██████╗██║███████╗     ██║  ██║██║     ██║
 ╚═════╝╚═╝╚══════╝     ╚═╝  ╚═╝╚═╝     ╚═╝
                                           
Corona-in-Zahlen-api v${version}
Created and maintained by officialEmmel
LICENSE MIT: https://github.com/officialEmmel/corona-in-zahlen-api/blob/main/LICENSE

More information: https://github.com/officialEmmel/corona-in-zahlen-api

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`)

router.get('/ciz-api/lk/:param',async (request,response) => {
    req_log(request);
    response.send(await lk(request.params.param))
});

router.get('/ciz-api/lk/', async (request,response) => {
    req_log(request);
    response.send({error:"No param provided"})
});

router.get('/ciz-api/bl/:param', async (request,response) => {
    req_log(request);
    response.send(await bl(request.params.param))
});

router.get('/ciz-api/bl/', async (request,response) => {
    req_log(request);
    response.send({error:"No param provided"})
});

router.get('/ciz-api/lnd/:param',async (request,response) => {
    req_log(request);
    response.send(await lnd(request.params.param))
});

router.get('/ciz-api/lnd/', async (request,response) => {
    req_log(request);
    response.send({error:"No param provided"})
});

router.get('/ciz-api/geo/:param',async (request,response) => {
    req_log(request);
    response.send(await geo(request.params.param, request.query.lat, request.query.lon))
});

router.get('/ciz-api/geo/', async (request,response) => {
    req_log(request);
    response.send({error:"No param provided"})
});

router.get('/ciz-api/',async (request,response) => {
    req_log(request);
    response.send({information:"corona-in-zahlen-api v" + version + " created and maintained by emmel. Usage, License and Information: https://github.com/officialEmmel/corona-in-zahlen-api"})
});

app.use("/", router)
app.listen(3000,() => {
    l("Server listening on PORT 3000")
})

function req_log(request: any) {
    console.log(`
    NEW REQUEST:
    Path: ${request.path}:
    Ip: ${request.ip}
    Headers: ${request.rawHeaders}
        `)
}
