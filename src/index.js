const http = require("http");
const getUsers = require("./modules/users");

//   // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
//   // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
//   // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
//   // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
//   // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");
  const name = url.searchParams.get("hello");
  const users = url.searchParams.get("users");
  const params = url.searchParams;

  if (params.keys().next().done) {
    response.writeHead(200, { "content-Type": "text/plain" });
    // response.statusCode = 200;
    // response.statusMessage = "OK";
    // response.setHeader("Content-Type", "text/plain");
    response.end(`Hello, World!`);
  } else if (name) {
    response.writeHead(200, { "content-Type": "text/plain" });
    // response.statusCode = 200;
    // response.statusMessage = "OK";
    // response.setHeader("Content-Type", "text/plain");
    response.end(`Hello, ${name}.`);
  } else if (name === "") {
    response.writeHead(400, { "content-Type": "text/plain" });
    // response.statusCode = 400;
    // response.statusMessage = "Bad Request";
    // response.setHeader("Content-Type", "text/plain");
    response.end("Enter a name");
  } else if (users === "") {
    response.writeHead(200, { "content-Type": "application/json" });
    // response.statusCode = 200;
    // response.statusMessage = "OK";
    // response.setHeader("Content-Type", "application/json");
    response.end(getUsers());
  } else {
    response.writeHead(500, { "content-Type": "text/plain" });
    // response.statusCode = 500;
    // response.statusMessage = "Internal Server Error";
    // response.setHeader("Content-Type", "text/plain");
    response.end();
  }
});

server.listen(3003, () => {
  console.log("сервер запущен по адресу http://localhost:3003/");
});
