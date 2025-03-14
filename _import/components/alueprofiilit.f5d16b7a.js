import { FileAttachment } from "../../_observablehq/stdlib.313a6eb4.js";
import { resize } from "../../_observablehq/stdlib.313a6eb4.js";
import { html } from "../../_npm/htl@0.3.1/063eb405.js";
import * as Plot from "../../_npm/@observablehq/plot@0.6.17/bab36a37.js";
import * as d3 from "../../_npm/d3@7.9.0/2d3d6de5.js";
import * as _ from "../../_npm/underscore@1.13.7/2be59dd5.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.c9e8879a.js";
import * as aq from "../../_npm/arquero@8.0.1/8362639c.js";
import { all, desc, op, table } from "../../_npm/arquero@8.0.1/8362639c.js";


// datat
export const df_alueprofiilit = await FileAttachment({"name":"../../data/df_alueprofiilit.json","mimeType":"application/json","path":"../../_file/data/df_alueprofiilit.4b415339.json","lastModified":1741949643457,"size":50473}, import.meta.url).json("typed");
export const indicator_list = await FileAttachment({"name":"../../data/df_indicator_list.json","mimeType":"application/json","path":"../../_file/data/df_indicator_list.b73699d7.json","lastModified":1741949634453,"size":10701}, import.meta.url).json("typed");
const df_region = await FileAttachment({"name":"../../data/df_region.json","mimeType":"application/json","path":"../../_file/data/df_region.ae39e874.json","lastModified":1741949640243,"size":257003}, import.meta.url).json("typed");

// funktiot

export function unsafe_html() {
  const span = document.createElement("span");
  span.innerHTML = String.raw.apply(this, arguments);
  return span;
}


function lisaaRooli(objectArray,nimi) {
  objectArray.forEach(function(obj) {
      if (obj.aluenimi == nimi) {
          obj.rooli = 'valittu';
      } else {
          obj.rooli = 'naapuri';
      }
  });
  return objectArray;
}





/**
 * alueprofiilin divvi
 * @param {array} naapurikoodit
 * @param {array} aluetaso
 * @param {array} df
  * @param {array} df_aikasarja
 * @param {array} indicator
 * @returns
 */ 
  export function alueprofDivvi(
    naapurikoodit = [11, 14, 15, 16],
    aluetaso = "Hyvinvointialueet", 
    df,
    alue,
    df_aikasarja,
    indicator = "Huono-osaisuus yhteensä") {


   var df_aikasarja_ss = df_aikasarja.filter(d => naapurikoodit.includes(d.aluekoodi) && d.regio_level == aluetaso && d.variable == indicator)
   var df_ss = df.filter(d => naapurikoodit.includes(d.aluekoodi) && d.regio_level == aluetaso && d.variable == indicator)
   var df_ss2 = lisaaRooli(df_ss,alue)
   /*
   var df_ss_top = df.filter(d => d.regio_level == aluetaso && d.variable == indicator && d.rank == 1)
   var df_ss_all = df.filter(d => d.regio_level == aluetaso && d.variable == indicator)
   
   df_ss_top.forEach(function(obj) {
    obj["rooli"] = 'korkein arvo';
  })

  var vika = df_ss_all.reduce(function(acc, curr) {
    return curr.rank < acc.rank ? curr : acc;
});

df_ss_all.sort(function(a, b) {
  return b.rank - a.rank;
});

var vika_raw = df_ss_all.shift()
var vika = [vika_raw]

vika.forEach(function(obj) {
  obj["rooli"] = 'matalin arvo';
})


  df_ss2.concat(df_ss_top).concat(vika)
  

   var df_ss = df.filter(d => naapurikoodit.includes(d.aluekoodi) && d.regio_level == aluetaso && d.variable == indicator)
*/
   
   var df_region_level = df_region.features.filter(d => d.properties.level == aluetaso);
   var df_region_ss = df_region_level.filter(d => naapurikoodit.includes(d.properties.region_code))
   var map_values = new Map(df_ss.map(({aluekoodi, value}) => [aluekoodi, value]))


return html` <h3>${indicator}</h3> 
 
    <div class="grid grid-cols-3">
    <div class="card">    
    ${alueprofTaulukko(df_ss2)} 
    </div>
    <div class="card">
    ${resize((width) => alueprofKartta(df_region_ss,map_values,width,aluetaso,indicator))} 
    </div>
    <div class="card">
    ${resize((width) => alueprofAikasarja(df_aikasarja_ss,width,aluetaso,indicator))} 
    </div>
    </div>
  `
  }


/**
 * alueprofiilin aikasarjakuva
* @param {array} df_alue_aikasarja
 * @returns
 */ 
  export function alueprofAikasarja(df_alue_aikasarja,width,aluetaso,indicator) {

    var df_plot_aikasarja = df_alue_aikasarja

return Plot.plot({
  width: width,
  //marginLeft: 10, //420,
  marginRight: 150, //210,
  ariaLabel: "Alueprofiilin aikasarjakuva",
  ariaDescription: "Aikasarjakuva aluetasolla "  + aluetaso + " indikaattorista " + indicator,
 // marginTop: 10,
 // marginBottom: 10,
  //title: selected_variable,
  //subtitle: "Aluetasolla " + selected_regio_level,
  x: {tickFormat: ""},
   color: {
    nice: true,
    legend: false  
  },
    style: {
   // fontSize: "1em", 
    overflow: "visible"
  },
  marks: [
   // Plot.ruleY([0]),
    Plot.lineY(df_plot_aikasarja, {
      x: "aika", 
      y: "value", 
      stroke: "aluenimi",
      marker: "circle",
      fontSize: ".6em",
      tip: true
    }),
    Plot.text(df_plot_aikasarja, Plot.selectLast({x: "aika", y: "value", z: "aluenimi", text: "aluenimi", textAnchor: "start", dx: 3}))

  ]
})
  }


  /**
 * alueprofiilin taulukko
 * @param {decimal} df_subset
 * @returns
 */ 
  export function alueprofTaulukko(df_subset) {
    
   return Inputs.table(df_subset, 
    {locale: "fi",
    columns: [
      "aluenimi",
      "rooli",
      "value",
       "rank"],
      header: {
        aluenimi: "Alue",
        value: "arvo",
        rank: "sija"
      }
  })

  }



/**
 * Alueprofiilin karttakuva
 * @param {decimal} df_region_ss
 * @param {map} map_values
 * @returns
 */
export function alueprofKartta(df_region_ss,map_values,width,aluetaso,indicator) {

   // var vastausosuus_kupno = dat_kustannuspaikka.filter(d => d.vuosi == 202403 && d.code == 'N004001' && d.tunnusluku == 'metodi')
   // var vastausosuus2=d3.sort(vastausosuus_kupno, d => d.vastattu).reverse()
   
    return Plot.plot({
      width: width,
      ariaLabel: "Alueprofiilin karttakuva",
      ariaDescription: "Kartta aluetasolla "  + aluetaso + " indikaattorista " + indicator,
    
      x:{axis:null},
      y:{axis:null},
        //title: alue,
        //subtitle: "Aluetasolla " + aluetaso,
        marks: [
          Plot.geo(df_region_ss, 
                   {stroke: "#D2D2D2"
                   }),
          Plot.geo(df_region_ss, Plot.centroid({
            tip: true,
            channels: {
              Alue: d => d.properties.region_name,
              Arvo: (d) => map_values.get(d.properties.region_code)
            }
          })),         
          Plot.geo(df_region_ss, 
               {stroke: "white",
                strokeWidth: 2, 
                tip: false,
                fill: (d) => map_values.get(d.properties.region_code)
                }
                )
                   ],
        style: {
          //fontSize: "1em", 
          overflow: "visible"
        },
        color: {
          scheme: "viridis",
          type: "sqrt",
          nice: false,
          legend: true}
      })
}

 