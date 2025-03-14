import { FileAttachment } from "../../_observablehq/stdlib.313a6eb4.js";
import { resize } from "../../_observablehq/stdlib.313a6eb4.js";
import { html } from "../../_npm/htl@0.3.1/063eb405.js";
import * as Plot from "../../_npm/@observablehq/plot@0.6.17/bab36a37.js";
import * as d3 from "../../_npm/d3@7.9.0/2d3d6de5.js";
import * as _ from "../../_npm/underscore@1.13.7/2be59dd5.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.c9e8879a.js";
import * as aq from "../../_npm/arquero@8.0.1/8362639c.js";
import { all, desc, op, table } from "../../_npm/arquero@8.0.1/8362639c.js";

var now =  Date().toLocaleString()
let text = now.toLocaleString("fi-FI")

// ladataan datat
// indikaattorit
export const indicator_list = await FileAttachment({"name":"../../data/df_indicator_list.json","mimeType":"application/json","path":"../../_file/data/df_indicator_list.b73699d7.json","lastModified":1741949634453,"size":10701}, import.meta.url).json("typed");
//export const df = await FileAttachment("../data/df.json").json("typed");
export const df = await FileAttachment({"name":"../../data/df.csv","mimeType":"text/csv","path":"../../_file/data/df.d39c2513.csv","lastModified":1741949635826,"size":2398242}, import.meta.url).csv({typed: true});

export const df2 = df
//export const df_aikasarja = await FileAttachment("../data/df_aikasarja.json").json("typed");
export const df_aikasarja = await FileAttachment({"name":"../../data/df_aikasarja.csv","mimeType":"text/csv","path":"../../_file/data/df_aikasarja.d6897c57.csv","lastModified":1741949637965,"size":31089699}, import.meta.url).csv({typed: true});
export const region_levels = ["Kunnat", "Hyvinvointialueet"];
export const df_region = await FileAttachment({"name":"../../data/df_region.json","mimeType":"application/json","path":"../../_file/data/df_region.ae39e874.json","lastModified":1741949640243,"size":257003}, import.meta.url).json("typed");
export const df_kuntalist = await FileAttachment({"name":"../../data/df_kuntalist.json","mimeType":"application/json","path":"../../_file/data/df_kuntalist.00d599ff.json","lastModified":1741949641784,"size":38750}, import.meta.url).json("typed");
//export const df_population = await FileAttachment("../data/df_population.json").json("typed")

//export const df = df_raw.map((region_id, i) => Object.assign({}, region_id, df_population[i]));


export const all_var_class = [... new Set(df.map(x=>x.var_class))];

export const InputRegioLevel = Inputs.radio(region_levels, {
    //label: "Aluetaso",
     value: region_levels[1]});

export const SelYear = Inputs.range([2011, 2024], {step: 1, value: 2022});


export function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

export function financial1(x) {
        return Number.parseFloat(x).toFixed(1);
    }

