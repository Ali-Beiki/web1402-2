let fs = require("fs");

function deletFile(filename){
    fs.unlink(filename, Callback);
}


function Callback(err) {
    if (err) {
        console.log("ERR: ", err);
    } else {
        console.log("successfull Delet.");
    }
}

exports.deletF = deletFile;