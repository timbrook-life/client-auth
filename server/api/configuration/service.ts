import { readFileSync } from "fs";
import { resolve } from "path";

let data = {};

const conf = readFileSync(resolve(__dirname, "./config.json"));
data = JSON.parse(conf.toString());

export default data;
