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
const handler_1 = require("./handler");
const router = express.Router();
const app = express();
let version = "1.1.0";
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
`);
router.get('/ciz-api/lk/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`
NEW REQUEST:
Path: ${request.path}:
Ip: ${request.ip}
User-Agent: ${request.headers.Agent}
    `);
    response.send(yield (0, handler_1.lk)(request.params.param));
}));
router.get('/ciz-api/bl/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.bl)(request.params.param));
}));
router.get('/ciz-api/lnd/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.lnd)(request.params.param));
}));
router.get('/ciz-api/geo/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.geo)(request.params.param, request.query.lat, request.query.lon));
}));
router.get('/ciz-api/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send({ information: "corona-in-zahlen-api v" + version + " created and maintained by emmel. Usage, License and Information: https://github.com/officialEmmel/corona-in-zahlen-api" });
}));
app.use("/", router);
app.listen(3000, () => {
    console.log("Started on PORT 3000");
});
//# sourceMappingURL=index.js.map