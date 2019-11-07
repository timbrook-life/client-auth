import { readFileSync } from "fs";
import { resolve } from "path";

interface Config {
  readonly google: {
    readonly clientid: string;
  };
}

const conf = readFileSync(resolve(__dirname, "./config.json"));
const data: Config = JSON.parse(conf.toString());

export default data;
