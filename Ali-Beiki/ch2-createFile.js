let fs = require("fs");

function createF(filename,bodyText){
    fs.writeFile(filename, bodyText, Callback);
}


function Callback(err) {
    if (err) {
        console.log("ERR: ", err);
    } else {
        console.log("successfull.");
    }
}

exports.createFile = createF;