let fs = require("fs");

function deletFile(filename) {
    fs.unlink(filename, Callback);
}

function Callback(err) {
    if (err) {
        console.log("ERR Delet file: ", err);
    } else {
        console.log("Delet file successfull .");
    }
}

exports.deletF = deletFile;
