const http = require("http");

let message = {
    ali: "im Ali",
    hasan: "im Hasan",
    reza: "im Reza",
    amir: "im Amir",
};

let server = http.createServer(function (req, res) {
    // console.log(req.url);
    let a = req.url.split("/")[1];
    console.log(a);
    message[a];

    res.writeHead(200, { "Content-Type": "text/plain" });
    if (message[a]) {
        res.write(message[a]);
    } else {
        res.write("page not fond !");
    }

    res.end();
});

server.listen(80);
