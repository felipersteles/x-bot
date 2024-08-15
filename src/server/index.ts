import express, { Express } from "express";
import { router } from "./routes";
import { Oracle } from "../app/oracle";

require('dotenv').config()

export class Server {

    private readonly app: Express;
    private readonly oracle: Oracle

    constructor() {
        this.app = express()
        this.oracle = new Oracle()
    }

    start() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(router);

        const PORT = process.env.PORT || 3333;

        this.app.listen(PORT, () =>
            console.log("Server running on port " + PORT)
        );
    }
}