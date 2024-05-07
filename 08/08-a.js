
let fs = require('fs');
const { json } = require('stream/consumers');
let command;
let name = process.argv[3];
let arg4 = process.argv[4];
let redis = require('redis');
let http = require('http');
const { format } = require('path');
let port = 80;
let payam;


function send(response, text, ext) {
    let ft = {
        'txt': 'text/plain',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'html': 'text/html'
    }
    if (ft[ext]) {
        response.writeHead(200, { 'Content-Type': ft[ext] });
        response.write(text);
        response.end();
    }
    else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write("format not found");
        response.end();
    }
}
function unlinkCallback(err, response) {
    if (err) {
        if (err.code === 'EPERM') {
            fs.rmdir(name, send(response, "delete successfull"));
        }
        else {
            console.log('ERR: ', err);
            send(response, "delete faild");
        }
    }
    else {
        console.log("unlink  successfull.");
        send(response, "delete successfull");
    }
}
function addrecord(request, response) {

    fs.readFile("database.json", 'utf8', function readCallback(err, filedata) {
        if (err) {
            console.log('ERR: ', err);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('ERR: ', err);
            response.end();
        }
        else {
            filedata = JSON.parse(filedata);
            let requestdata = {
                name: request.url.split('/')[2],
                family: request.url.split('/')[3],
                email: request.url.split('/')[4]
            }
            requestdata.id = filedata.record.length + 100;
            filedata.record.push(requestdata);

            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, function (err) {
                if (err) {
                    console.log('ERR: ', err);
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.write('ERR: ', err);
                    response.end();
                }
                else {
                    console.log("addrecord successfull")
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.write("addrecord successfull");
                    response.end();
                }
            }
            );

        }
    });
}
function readrecord(request, response) {
    fs.readFile("database.json", 'utf8', function readCallback(err, filedata) {
        if (err) {
            console.log('ERR: ', err);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('ERR: ', err);
            response.end();
        }
        else {
            name = request.url.split('/')[2];
            filedata = JSON.parse(filedata);
            for (let i = 0; i < filedata.record.length; i++) {
                if (filedata.record[i].id == name) {
                    console.log(filedata.record[i]);
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    let data = JSON.stringify(filedata.record[i])
                    response.write(data);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.write("Record not found");
                    response.end();
                }
            }
        }
    });
}
function deleterecord(request, response) {
    fs.readFile("database.json", 'utf8', function readCallback(err, filedata) {
        if (err) {
            console.log('ERR: ', err);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.write('ERR: ', err);
            response.end();
        }
        else {
            filedata = JSON.parse(filedata);
            name = request.url.split('/')[2];
            for (let i = 0; i < filedata.record.length; i++) {
                if (filedata.record[i].id == name) {
                    let x = filedata.record.splice(i, 1);
                    console.log(i, x);
                    filedata = JSON.stringify(filedata);
                    fs.writeFile("database.json", filedata, function (err) {
                        if (err) {
                            console.log('ERR: ', err);
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.write('ERR: ', err);
                            response.end();
                        }
                        else {
                            console.log("deleterecord successfull")
                            response.writeHead(200, { 'Content-Type': 'text/plain' });
                            response.write("delete successfull");
                            response.end();
                        }
                    });
                    break;
                }
                else {
                    console.log("Record not found")
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    response.write("Record not found");
                    response.end();
                    break;
                }
            }
        }
    });
}
async function rediscreate() {
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    try {
        await client.set(name, arg4);
        Callback;
    }
    catch (err) {
        Callback;
    }

    await client.disconnect();
}
async function redisdelete() {
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();

    client.del(name);

    await client.disconnect();
}


let commands = {
    create: function () {
        fs.writeFile(name, arg4, Callback);
    },
    append: function () {
        fs.appendFile(name, arg4, Callback);
    },
    delete: function () {
        fs.unlink(name, unlinkCallback);
    },
    copy: function () {
        fs.copyFile(name, arg4, Callback);
    },
    read: function (request, response) {
        let name = request.url.split('/')[2];
        fs.readFile(name, { encoding: 'utf8' }, function (err, fileData) {
            if (err) {

            }
            else {
                send(response, fileData);
            }
        });
    },
    readimage: function (request, response) {
        let name = request.url.split('/')[2];
        let ext = request.url.split('.')[1];
        fs.readFile(name, function (err, fileData) {
            if (err) {
                send(response, err, 'txt');
            }
            else {
                send(response, fileData, ext);
            }
        });
    },
    addrecord: addrecord,
    readrecord: readrecord,
    deleterecord: deleterecord,
    rediscreate: rediscreate,
    redisdelete: redisdelete
}

let server = http.createServer(function (request, response) {

    console.log('request.method', request.method);
    console.log('request.url', request.url);

    command = request.url.split('/')[1];
    name = request.url.split('/')[2];
    arg4 = request.url.split('/')[3];


    try {
        commands[command](request, response);
    }
    catch (e) {

    };



});


server.listen(port);
console.log("Server is running on port:" + port);
