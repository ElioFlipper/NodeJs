
import { log } from "node:console";
import { createServer } from "node:http";
const server = createServer((request, response) => {
    console.log("request received");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");

    response.end(
        "<html><body><h1>Questo sembra essere il server di Elio</h1></body></html>"
    );
});
server.listen(3000, () => {
    console.log("Il server di Elio lavora su localhost:3000");
})