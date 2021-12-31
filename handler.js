const axios = require('axios');
const { link } = require('fs');
var HTMLParser = require('node-html-parser');
let url = 'https://www.corona-in-zahlen.de' 

async function lk(param){
  let raw = await httpRequest(url + '/landkreise/' + encodeURIComponent(param) + '/')
  let root = HTMLParser.parse(raw.data)
  let cizDict = parseCiz(root)
  let lkDict = {}
  lkDict['population'] = cizDict['Einwohner']
  lkDict['infections'] = cizDict['Infektionen (gesamt)']
  lkDict['infectionrate'] = cizDict['Infektionsrate (gesamt)']
  lkDict['deaths'] = cizDict['Neuinfektionen (7-Tage-Inzidenz)']
  lkDict['lethalityrate'] = cizDict['Letalitätsrate (gesamt)']
  lkDict['intensivecare'] = cizDict['Intensivmedizinisch behandelte COVID‑19 Patienten']
  lkDict['ventilated'] = cizDict['Invasiv beatmete COVID‑19 Patienten']
  lkDict['intensivecare_percentage'] = cizDict['Anteil COVID‑19 Patienten an Intensivbetten']
  console.log(lkDict)
}

function httpRequest(url) {
  return new Promise(function(resolve, reject) {
  axios.get(url)
  .then(function (response) {
    // handle success
    resolve(response)
  })
  .catch(function (error) {
    // handle error
    reject(error);
  })
  .then(function () {
    reject(new Error('no data returned'))
  });
  });
}

function parseCiz(root){
  let names = root.querySelectorAll(".card-text")
  let vals = root.querySelectorAll(".card-title")
  
  let dict = {}
  for(let i = 0; i < 9; i++)
  {
    let val = vals[i].text
    val = val.replace('<b>','')
    val = val.replace('</b>','')
    let n = names[i].text.split('\n')[0]
    dict[n] = val
  }
  return dict
}

lk('lk hildesheim')
