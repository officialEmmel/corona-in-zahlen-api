import {JSDOM} from "jsdom";
import axios, { AxiosResponse } from "axios";

let url = 'https://www.corona-in-zahlen.de' 

export async function lk(param: string){
  let raw = await httpRequest(url + '/landkreise/' + encodeURIComponent(param) + '/')
  if(raw == null) {return {error:"Failed to request data from corona-in-zahlen.de"}}
  let dom = new JSDOM(await raw.data)
  let cizDict: any = parseCizLk(dom)
  let lkDict: any = {}
  lkDict['date'] = cizDict['last_refresh']
  lkDict['population'] = cizDict['Einwohner']
  lkDict['infections'] = cizDict['Infektionen (gesamt)']
  lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)']
  lkDict['deaths'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)']
  lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)']
  lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten']
  lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten']
  lkDict['intensivecare_percentage'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten']
  console.log(lkDict)
  return lkDict
}

function httpRequest(url: string): Promise<any> {
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
  let dateStr = dom.window.document.querySelectorAll(".badge")[0].innerHTML
  let date = new Date(dateStr.slice(16))
  dict["date"] = date.toLocaleDateString()
  for(let i = 0; i < 9; i++)
  {
    let val = vals[i].innerHTML
    val = val.replace('<b>','')
    val = val.replace('</b>','')
    let n = names[i].innerHTML.split('\n')[0]
    dict[n] = val
  }
  return dict
}

