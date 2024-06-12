import { FileAttachment } from "../../_observablehq/stdlib.js";
import { resize } from "../../_observablehq/stdlib.js";
import { DuckDBClient } from "../../_observablehq/stdlib/duckdb.js";
import { html } from "../../_npm/htl@0.3.1/_esm.js";
import * as Plot from "../../_npm/@observablehq/plot@0.6.15/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as _ from "../../_npm/underscore@1.13.6/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";
import * as aq from "../../_npm/arquero@5.4.0/_esm.js";
import { all, desc, op, table } from "../../_npm/arquero@5.4.0/_esm.js";

var now =  Date().toLocaleString()
let text = now.toLocaleString("fi-FI")

// ladataan datat
// indikaattorit
export const indicator_list = await FileAttachment("../../data/df_indicator_list.json", import.meta.url).json("typed");
//export const df = await FileAttachment("../data/df.json").json("typed");
export const df = await FileAttachment("../../data/df.csv", import.meta.url).csv({typed: true});

export const df2 = df
//export const df_aikasarja = await FileAttachment("../data/df_aikasarja.json").json("typed");
export const df_aikasarja = await FileAttachment("../../data/df_aikasarja.csv", import.meta.url).csv({typed: true});
export const region_levels = ["Kunnat", "Hyvinvointialueet"];
export const df_region = await FileAttachment("../../data/df_region.json", import.meta.url).json("typed");
export const df_kuntalist = await FileAttachment("../../data/df_kuntalist.json", import.meta.url).json("typed");
//export const df_population = await FileAttachment("../data/df_population.json").json("typed")

//export const df = df_raw.map((region_id, i) => Object.assign({}, region_id, df_population[i]));


export const all_var_class = [... new Set(df.map(x=>x.var_class))];

export const InputRegioLevel = Inputs.radio(region_levels, {
    //label: "Aluetaso",
     value: region_levels[1]});

export const SelYear = Inputs.range([2011, 2023], {step: 1, value: 2021});


export function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }

export function financial1(x) {
        return Number.parseFloat(x).toFixed(1);
    }

