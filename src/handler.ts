import {JSDOM} from "jsdom";
import axios, { AxiosResponse } from "axios";
import { json } from "express";
import {l} from "./log"

let url = 'https://www.corona-in-zahlen.de' 
let osmApi = (lat: string, lon: string) => {
  return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
}

let lk_location_not_found = 114
let bl_location_not_found = 124
let lnd_location_not_found = 134

export async function lk(param: string){
  let raw = await httpRequest(url + '/landkreise/' + encodeURIComponent(param) + '/')
  if(raw == null) {return {error:"Failed to request data from corona-in-zahlen.de"}}
  let dom = new JSDOM(await raw.data)
  let cizDict: any = parseCizLk(dom)
  if(cizDict.error != undefined) {return cizDict}
  let lkDict: any = {}

  let type: any = await raw.request.path.split('/')[2]
  type = decodeURIComponent(type)
  type = type.split(" ")[0]

  lkDict['date'] = cizDict['date']
  lkDict['type'] = type
  lkDict['name'] = cizDict['name']
  lkDict['population'] = cizDict['Einwohner']
  lkDict['infections'] = cizDict['Infektionen (gesamt)']
  lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)']
  lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)']
  lkDict['deaths'] = cizDict['Todesfälle (gesamt)']
  lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)']
  lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten']
  lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten']
  lkDict['intensivecare_percentage'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten']
  return meta(lkDict)
}

function meta(lkDict: any)
{
  lkDict["meta"] = {
    data_provider: "Data provided by https://www.corona-in-zahlen.de",
    data_sources: "JHU, ECDC, 'Our World in Data', RKI, DIVI. Learn more: https://www.corona-in-zahlen.de/datenquellen/",
    geocoding: "Geocoding is provided by https://nominatim.org/ with data from https://openstreetmap.org",
    about:"Api written by emmel. Source Code: https://github.com/officialEmmel/corona-in-zahlen-api"
  }
  return lkDict
}

export async function bl(param: string){
  let raw = await httpRequest(url + '/bundeslaender/' + encodeURIComponent(param) + '/')
  if(raw == null) {return {error:"Failed to request data from corona-in-zahlen.de"}}
  let dom = new JSDOM(await raw.data)
  let cizDict: any = parseCizBl(dom)
  if(cizDict.error != undefined) {return cizDict}
  let lkDict: any = {}
  lkDict['date'] = cizDict['date']
  lkDict['type'] = "bundesland"
  lkDict['name'] = cizDict['name']
  lkDict['population'] = cizDict['Einwohner']
  lkDict['infections'] = cizDict['Infektionen (gesamt)']
  lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)']
  lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)']
  lkDict['deaths'] = cizDict['Todesfälle (gesamt)']
  lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)']
  lkDict['vaccination_first'] = cizDict['Impfquote (Erstimpfung)']
  lkDict['vaccination_full'] = cizDict['Impfquote (vollständig)']
  lkDict['hospitalization'] = cizDict['Hospitalisierungsrate']
  lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten']
  lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten']
  return meta(lkDict)
}

export async function lnd(param: string){
  let raw = await httpRequest(url + '/weltweit/' + encodeURIComponent(param) + '/')
  if(raw == null) {return {error:"Failed to request data from corona-in-zahlen.de"}}
  let dom = new JSDOM(await raw.data)
  let cizDict: any = parseCizLnd(dom)
  if(cizDict.error != undefined) {return cizDict}
  let lkDict: any = {}

  lkDict['date'] = cizDict['date']
  lkDict['type'] = "land"
  lkDict['name'] = cizDict['name']
  lkDict['population'] = cizDict['Einwohner']
  lkDict['infections'] = cizDict['Infektionen (gesamt)']
  lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)']
  lkDict['incidence'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)']
  lkDict['deaths'] = cizDict['Todesfälle (gesamt)']
  lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)']
  lkDict['vaccination_first'] = cizDict['Erstimpfungen (gesamt)']
  lkDict['vaccinationrate_first'] = cizDict['Impfquote (Erstimpfung)']
  lkDict['vaccinationrate_full'] = cizDict['Impfquote (vollständig)']
  lkDict['new_infections'] = cizDict['Neuinfektionen']
  lkDict['new_infections_7dayaverage'] = cizDict['Neuinfektionen (7-Tage-Schnitt)']
  lkDict['new_deaths'] = cizDict['Neue Todesfälle']
  lkDict['intensivecare'] = cizDict['Patienten auf Intensivstationen']
  lkDict['intensivecarerate'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten']
  lkDict['tests'] = cizDict['Tests']
  lkDict['positive_test_rate'] = cizDict['Anteil positiver Tests']
  return meta(lkDict)
}

export async function geo(param: string, lat: any, lon: any) {
  if(lat == undefined || lat == null || lon == undefined || lon == null) {return {error:"latitude and longitude are required for gecoding"}}
  let url = osmApi(lat,lon)
  let raw = await httpRequest(url)
  console.log(await raw.data)
  let data = await raw.data
  if(data.error != undefined) { return data.error } 
  switch(param) {
    case "lk":
      let format = (data.address.county).replace("Landkreis", "lk")
      format = (format).replace("Stadtkreis", "sk")
      return await lk(format);
    case "bl":
      return await bl(data.address.state)
    case "lnd":
      return await lnd(data.address.country)
  }
}

function httpRequest(url: string): Promise<AxiosResponse<any, any>> {
  return new Promise(function(resolve, reject) {
  axios.get(url)
  .then(function (response) {
    // handle success
    resolve(response)
  })
  .catch(function (error) {
    // handle error
    reject(null);
  })
  .then(function () {
    reject(null)
  });
  });
}

function parseCizLk(dom: JSDOM){
  let names = dom.window.document.querySelectorAll(".card-text")
  let vals = dom.window.document.querySelectorAll(".card-title")

  let dict: any = {}

  let title: any = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)")
  title = title.innerHTML.slice(18)
  dict["name"] = title

  let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML
  let date = new Date(dateStr.slice(16))
  dict["date"] = date.toLocaleDateString()

  for(let i = 0; i < vals.length; i++)
  {
    if(vals[i] == undefined){ return {error: "failed to fetch data from html", code:110}}
    let val = vals[i].innerHTML
    val = val.replace('<b>','')
    val = val.replace('</b>','')
    let n = names[i].innerHTML.split('\n')[0]
    dict[n] = val
  }
  if(dict["name"] == "Städte und Landkreise in Deutschland"){ return {error: "location not found", code:lk_location_not_found}}
  return dict
}

function parseCizBl(dom: JSDOM){
  let names = dom.window.document.querySelectorAll(".card-text")
  let vals = dom.window.document.querySelectorAll(".card-title")
  
  let dict: any = {}

  let title: any = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)")
  title = title.innerHTML.slice(18)
  dict["name"] = title

  let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML
  let date = new Date(dateStr.slice(16))
  dict["date"] = date.toLocaleDateString()

  for(let i = 0; i < 12; i++)
  {
    if(vals[i] == undefined){ return {error: "failed to fetch data from html", code:120}}
    let val = vals[i].innerHTML
    val = val.replace('<b>','')
    val = val.replace('</b>','')
    let n = names[i].innerHTML.split('\n')[0]
    dict[n] = val
  }
  if(dict["name"] == "Corona-Zahlen für Bundesländer in Deutschland"){ return {error: "location not found", code:bl_location_not_found}}
  return dict
}

function parseCizLnd(dom: JSDOM){
  let names = dom.window.document.querySelectorAll(".card-text")
  let vals = dom.window.document.querySelectorAll(".card-title")
  
  let dict: any = {}

  let title: any = dom.window.document.querySelector("div.container:nth-child(1) > h1:nth-child(1)")
  title = title.innerHTML.slice(18)
  dict["name"] = title

  let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML
  let date = new Date(dateStr.slice(16))
  dict["date"] = date.toLocaleDateString()

  for(let i = 0; i < 16; i++)
  {
    if(vals[i] == undefined){ return {error: "failed to fetch data from html", code:130}}
    let val = vals[i].innerHTML
    val = val.replace('<b>','')
    val = val.replace('</b>','')
    val = val.replace(/\s/g,'')
    let n = names[i].innerHTML.split('\n')[0]
    dict[n] = val
  }
  if(dict["name"] == "Corona-Zahlen für Bundesländer in Deutschland"){ return {error: "location not found", code:lnd_location_not_found}}
  return dict
}

