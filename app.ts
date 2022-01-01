import {Drash} from "./deps.ts";
import { db } from "./db.ts";
import { Todos } from "./models/todos.ts";
import { HomeResource } from "./resources/home_resource.ts";
import { TodoResource } from "./resources/todo_resource.ts";


// Server config
const server = new Drash.Server({
    hostname: "127.0.0.1",
    port: 8000,
    protocol: "http",
    resources: [
        HomeResource,
        TodoResource
    ],
});

// db
db.link([Todos]);
db.sync();

// Run server
server.run();
console.log(`Server running at ${server.address}.`);