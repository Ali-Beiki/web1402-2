let fs = require("fs");

function addrecord(name, family, age) {
    fs.readFile("database.json", "utf8", function readCallback(err, filedata) {
        if (err) {
            console.log("ERR: ", err);
        } else {
            filedata = JSON.parse(filedata);
            let record = {
                name: name,
                family: family,
                age: age,
            };
            filedata.records.push(record);
            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, Callback);
        }
    });
}

function Callback(err) {
    if (err) {
        console.log("ERR create Record: ", err);
    } else {
        console.log("create Record successfull.");
    }
}

exports.createRecord = addrecord;
