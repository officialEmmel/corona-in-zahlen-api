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
exports.geo = exports.lnd = exports.bl = exports.lk = void 0;
const jsdom_1 = require("jsdom");
const axios_1 = require("axios");
let url = 'https://www.corona-in-zahlen.de';
let osmApi = (lat, lon) => {
    return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
};
function lk(param) {
    return __awaiter(this, void 0, void 0, function* () {
        let raw = yield httpRequest(url + '/landkreise/' + encodeURIComponent(param) + '/');
        if (raw == null) {
            return { error: "Failed to request data from corona-in-zahlen.de" };
        }
        let dom = new jsdom_1.JSDOM(yield raw.data);
        let cizDict = parseCizLk(dom);
        if (cizDict.error != undefined) {
            return cizDict;
        }
        let lkDict = {};
        let type = yield raw.request.path.split('/')[2];
        type = decodeURIComponent(type);
        type = type.split(" ")[0];
        lkDict["meta"] = {
            data_sources: "Data from JHU, ECDC, 'Our World in Data', RKI, DIVI provided by https://www.corona-in-zahlen.de",
            geocoding: "Geocoding is provided by https://nominatim.org/ with data from https://openstreetmap.org",
            about: "Api written by emmel. Source Code: https://github.com/officialEmmel/corona-in-zahlen-api"
        };
        lkDict['date'] = cizDict['date'];
        lkDict['type'] = type;
        lkDict['name'] = cizDict['name'];
        lkDict['population'] = cizDict['Einwohner'];
        lkDict['infections'] = cizDict['Infektionen (gesamt)'];
        lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)'];
        lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)'];
        lkDict['deaths'] = cizDict['Todesfälle (gesamt)'];
        lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)'];
        lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten'];
        lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten'];
        lkDict['intensivecare_percentage'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten'];
        return lkDict;
    });
}
exports.lk = lk;
function bl(param) {
    return __awaiter(this, void 0, void 0, function* () {
        let raw = yield httpRequest(url + '/bundeslaender/' + encodeURIComponent(param) + '/');
        if (raw == null) {
            return { error: "Failed to request data from corona-in-zahlen.de" };
        }
        let dom = new jsdom_1.JSDOM(yield raw.data);
        let cizDict = parseCizBl(dom);
        if (cizDict.error != undefined) {
            return cizDict;
        }
        let lkDict = {};
        lkDict['date'] = cizDict['date'];
        lkDict['type'] = "bundesland";
        lkDict['name'] = cizDict['name'];
        lkDict['population'] = cizDict['Einwohner'];
        lkDict['infections'] = cizDict['Infektionen (gesamt)'];
        lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)'];
        lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)'];
        lkDict['deaths'] = cizDict['Todesfälle (gesamt)'];
        lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)'];
        lkDict['vaccination_first'] = cizDict['Impfquote (Erstimpfung)'];
        lkDict['vaccination_full'] = cizDict['Impfquote (vollständig)'];
        lkDict['hospitalization'] = cizDict['Hospitalisierungsrate'];
        lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten'];
        lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten'];
        return lkDict;
    });
}
exports.bl = bl;
function lnd(param) {
    return __awaiter(this, void 0, void 0, function* () {
        let raw = yield httpRequest(url + '/weltweit/' + encodeURIComponent(param) + '/');
        if (raw == null) {
            return { error: "Failed to request data from corona-in-zahlen.de" };
        }
        let dom = new jsdom_1.JSDOM(yield raw.data);
        let cizDict = parseCizLnd(dom);
        if (cizDict.error != undefined) {
            return cizDict;
        }
        let lkDict = {};
        lkDict['date'] = cizDict['date'];
        lkDict['type'] = "land";
        lkDict['name'] = cizDict['name'];
        lkDict['population'] = cizDict['Einwohner'];
        lkDict['infections'] = cizDict['Infektionen (gesamt)'];
        lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)'];
        lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)'];
        lkDict['deaths'] = cizDict['Todesfälle (gesamt)'];
        lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)'];
        lkDict['vaccination_first'] = cizDict['Erstimpfungen (gesamt)'];
        lkDict['vaccinationrate_first'] = cizDict['Impfquote (Erstimpfung)'];
        lkDict['vaccinationrate_full'] = cizDict['Impfquote (vollständig)'];
        lkDict['new_infections'] = cizDict['Neuinfektionen'];
        lkDict['new_infections_7dayaverage'] = cizDict['Neuinfektionen (7-Tage-Schnitt)'];
        lkDict['new_deaths'] = cizDict['Neue Todesfälle'];
        lkDict['intensivecare'] = cizDict['Patienten auf Intensivstationen'];
        lkDict['intensivecarerate'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten'];
        lkDict['tests'] = cizDict['Tests'];
        lkDict['positive_test_rate'] = cizDict['Anteil positiver Tests'];
        return lkDict;
    });
}
exports.lnd = lnd;
function geo(param, lat, lon) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = osmApi(lat, lon);
        let raw = yield httpRequest(url);
        console.log(yield raw.data);
        let data = yield raw.data;
        try {
            if (data.error != undefined) {
                return data.error;
            }
        }
        catch (e) { }
        switch (param) {
            case "lk":
                let format = (data.address.county).replace("Landkreis", "lk");
                format = (format).replace("Stadtkreis", "sk");
                return yield lk(format);
            case "bl":
                return yield bl(data.address.state);
            case "lnd":
                return yield lnd(data.address.country);
        }
    });
}
exports.geo = geo;
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
    let title = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)");
    title = title.innerHTML.slice(18);
    dict["name"] = title;
    let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML;
    let date = new Date(dateStr.slice(16));
    dict["date"] = date.toLocaleDateString();
    for (let i = 0; i < vals.length; i++) {
        if (vals[i] == undefined) {
            return { error: "failed to fetch data from html" };
        }
        let val = vals[i].innerHTML;
        val = val.replace('<b>', '');
        val = val.replace('</b>', '');
        let n = names[i].innerHTML.split('\n')[0];
        dict[n] = val;
    }
    return dict;
}
function parseCizBl(dom) {
    let names = dom.window.document.querySelectorAll(".card-text");
    let vals = dom.window.document.querySelectorAll(".card-title");
    let dict = {};
    let title = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)");
    title = title.innerHTML.slice(18);
    dict["name"] = title;
    let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML;
    let date = new Date(dateStr.slice(16));
    dict["date"] = date.toLocaleDateString();
    for (let i = 0; i < 12; i++) {
        if (vals[i] == undefined) {
            return { error: "failed to fetch data from html" };
        }
        let val = vals[i].innerHTML;
        val = val.replace('<b>', '');
        val = val.replace('</b>', '');
        let n = names[i].innerHTML.split('\n')[0];
        dict[n] = val;
    }
    return dict;
}
function parseCizLnd(dom) {
    let names = dom.window.document.querySelectorAll(".card-text");
    let vals = dom.window.document.querySelectorAll(".card-title");
    let dict = {};
    let title = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)");
    title = title.innerHTML.slice(18);
    dict["name"] = title;
    let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML;
    let date = new Date(dateStr.slice(16));
    dict["date"] = date.toLocaleDateString();
    for (let i = 0; i < 16; i++) {
        if (vals[i] == undefined) {
            return { error: "failed to fetch data from html" };
        }
        let val = vals[i].innerHTML;
        val = val.replace('<b>', '');
        val = val.replace('</b>', '');
        val = val.replace(/\s/g, '');
        let n = names[i].innerHTML.split('\n')[0];
        dict[n] = val;
    }
    return dict;
}
//# sourceMappingURL=handler.js.map