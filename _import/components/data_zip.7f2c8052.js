import { FileAttachment } from "../../_observablehq/stdlib.js";
import { resize } from "../../_observablehq/stdlib.js";
import { DuckDBClient } from "../../_observablehq/stdlib/duckdb.js";
import { html } from "../../_npm/htl@0.3.1/_esm.js";
import * as Plot from "../../_npm/@observablehq/plot@0.6.14/_esm.js";
import * as d3 from "../../_npm/d3@7.9.0/_esm.js";
import * as _ from "../../_npm/underscore@1.13.6/_esm.js";
import * as Inputs from "../../_observablehq/stdlib/inputs.js";
import * as aq from "../../_npm/arquero@5.4.0/_esm.js";
import { all, desc, op, table } from "../../_npm/arquero@5.4.0/_esm.js";

var now =  Date().toLocaleString()
let text = now.toLocaleString("fi-FI")

// postinumerot
export const dfzip = await FileAttachment("../../data/dfzip.csv", import.meta.url).csv({typed: false})
//export const dfzip = await FileAttachment("../data/dfzip.json").json("typed")
//export const dfzip_aikasarja = await FileAttachment("../data/dfzip_aikasarja.json").json("typed")
export const dfzip_aikasarja = await FileAttachment("../../data/dfzip_aikasarja.csv", import.meta.url).csv({typed: true})
export const dfzip_region = await FileAttachment("../../data/dfzip_region.json", import.meta.url).json("typed")
