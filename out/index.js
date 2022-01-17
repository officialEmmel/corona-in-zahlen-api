"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const log_1 = require("./log");
const handler_1 = require("./handler");
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
`);
router.get('/ciz-api/lk/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send(yield (0, handler_1.lk)(request.params.param));
}));
router.get('/ciz-api/lk/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send({ error: "No param provided" });
}));
router.get('/ciz-api/bl/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send(yield (0, handler_1.bl)(request.params.param));
}));
router.get('/ciz-api/bl/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send({ error: "No param provided" });
}));
router.get('/ciz-api/lnd/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send(yield (0, handler_1.lnd)(request.params.param));
}));
router.get('/ciz-api/lnd/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send({ error: "No param provided" });
}));
router.get('/ciz-api/geo/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send(yield (0, handler_1.geo)(request.params.param, request.query.lat, request.query.lon));
}));
router.get('/ciz-api/geo/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send({ error: "No param provided" });
}));
router.get('/ciz-api/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    req_log(request);
    response.send({ information: "corona-in-zahlen-api v" + version + " created and maintained by emmel. Usage, License and Information: https://github.com/officialEmmel/corona-in-zahlen-api" });
}));
app.use("/", router);
app.listen(3000, () => {
    (0, log_1.l)("Server listening on PORT 3000");
});
function req_log(request) {
    console.log(`
    NEW REQUEST:
    Path: ${request.path}:
    Ip: ${request.ip}
    Headers: ${request.rawHeaders}
        `);
}
//# sourceMappingURL=index.js.map