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

// postinumerot
export const dfzip = await FileAttachment({"name":"../../data/dfzip.csv","mimeType":"text/csv","path":"../../_file/data/dfzip.3509e648.csv","lastModified":1741949644815,"size":2248858}, import.meta.url).csv({typed: true})
//export const dfzip = await FileAttachment("../data/dfzip.json").json("typed")
//export const dfzip_aikasarja = await FileAttachment("../data/dfzip_aikasarja.json").json("typed")
export const dfzip_aikasarja = await FileAttachment({"name":"../../data/dfzip_aikasarja.csv","mimeType":"text/csv","path":"../../_file/data/dfzip_aikasarja.3453e696.csv","lastModified":1741949646538,"size":26053665}, import.meta.url).csv({typed: true})
export const dfzip_region = await FileAttachment({"name":"../../data/dfzip_region.json","mimeType":"application/json","path":"../../_file/data/dfzip_region.b105a54c.json","lastModified":1741949648718,"size":26363219}, import.meta.url).json("typed")
