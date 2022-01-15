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
exports.lk = void 0;
const jsdom_1 = require("jsdom");
const axios_1 = require("axios");
let url = 'https://www.corona-in-zahlen.de';
function lk(param) {
    return __awaiter(this, void 0, void 0, function* () {
        let raw = yield httpRequest(url + '/landkreise/' + encodeURIComponent(param) + '/');
        if (raw == null) {
            return { error: "Failed to request data from corona-in-zahlen.de" };
        }
        let dom = new jsdom_1.JSDOM(yield raw.data);
        let cizDict = parseCizLk(dom);
        let lkDict = {};
        lkDict['date'] = cizDict['date'];
        lkDict['population'] = cizDict['Einwohner'];
        lkDict['infections'] = cizDict['Infektionen (gesamt)'];
        lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)'];
        lkDict['deaths'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)'];
        lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)'];
        lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten'];
        lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten'];
        lkDict['intensivecare_percentage'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten'];
        console.log(lkDict);
        return lkDict;
    });
}
exports.lk = lk;
function httpRequest(url) {
    return new Promise(function (resolve, reject) {
        axios_1.default.get(url)
            .then(function (response) {
            resolve(response);
        })
            .catch(function (error) {
            reject(null);
        })
            .then(function () {
            reject(null);
        });
    });
}
function parseCizLk(dom) {
    let names = dom.window.document.querySelectorAll(".card-text");
    let vals = dom.window.document.querySelectorAll(".card-title");
    let dict = {};
    let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML;
    let date = new Date(dateStr.slice(16));
    dict["date"] = date.toLocaleDateString();
    for (let i = 0; i < 9; i++) {
        let val = vals[i].innerHTML;
        val = val.replace('<b>', '');
        val = val.replace('</b>', '');
        let n = names[i].innerHTML.split('\n')[0];
        dict[n] = val;
    }
    return dict;
}
//# sourceMappingURL=handler.js.map