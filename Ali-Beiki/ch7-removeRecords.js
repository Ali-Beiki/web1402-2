let fs = require("fs");

function deleterecord(name) {
    fs.readFile("database.json", "utf8", function readCallback(err, filedata) {
        if (err) {
            console.log("ERR remove Records: ", err);
        } else {
            filedata = JSON.parse(filedata);
            console.log("before :", filedata);

            let stLength = filedata.records.length; // for count item deleting

            filedata.records = filedata.records.filter((item) => {
                return item.name != name;
            });
            // function delet(item) {
            //     return item.name != name;
            // }

            stLength -= filedata.records.length;

            console.log("after :", filedata);

            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, Callback);

            console.log(`Count Deleting item :${stLength}`);

        }
    });
}

function Callback(err) {
    if (err) {
        console.log("ERR remove Records: ", err);
    } else {
        console.log("remove Records successfull.");
    }
}

exports.removeRecord = deleterecord;
