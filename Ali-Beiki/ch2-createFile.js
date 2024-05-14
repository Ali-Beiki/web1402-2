let fs = require("fs");

function createF(filename, bodyText) {
    fs.writeFile(filename, bodyText, Callback);
}

function Callback(err) {
    if (err) {
        console.log("ERR in createFile: ", err);
    } else {
        console.log("createFile successfull.");
    }
}

exports.createFile = createF;
