import {Db} from "./types";
import fs from "fs";

export const getDb = async (): Promise<Db> => { // read
    const content = fs.readFileSync("./db.json", "utf-8");
    return JSON.parse(content); // parse to json
};
// async func are easier to swap for real db

export const updateDb = async (db:Db) : Promise<void> => { // update
    fs.writeFileSync("./db.json", JSON.stringify(db), "utf-8");
};