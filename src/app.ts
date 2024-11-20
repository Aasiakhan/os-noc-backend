import {Elysia, t} from "elysia";
import {html} from "@elysiajs/html";
import {MainController} from "./controllers/mainController";
import {ServiceStatusController} from "./controllers/ServiceStatusController";
import {AddServiceController} from "./controllers/AddServiceController";
import cors from "@elysiajs/cors";

const PORT = 8000

const app = new Elysia()
    .use(html())
    .use(cors())
    .get("/", MainController)
    .get("/services-status",ServiceStatusController)
    .post("/add",AddServiceController, {
        body: t.Object({
            name:t.String({
                maxLength: 30,
            }),
            ip: t.String({
                format:'ipv4',
                error: 'Invalid IP address'
            }),
            port: t.Integer({
                maximum: 65535,
                min:80
            }),

        })
    })
    .listen(PORT);

console.log(
    `Owlsense NOC is running at ${app.server?.hostname}:${app.server?.port}`
);
