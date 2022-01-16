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
router.get('/lk/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.lk)(request.params.param));
}));
router.get('/bl/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.bl)(request.params.param));
}));
router.get('/lnd/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.lnd)(request.params.param));
}));
router.get('/geo/:param', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.send(yield (0, handler_1.geo)(request.params.param, request.query.lat, request.query.lon));
}));
app.use("/", router);
app.listen(3000, () => {
    console.log("Started on PORT 3000");
});
//# sourceMappingURL=index.js.map