let fs = require("fs");




function createFile_Path(filename,path,bodyText){
    let newP =path+filename
    fs.exists(path,function(valid){
        if (valid) {
            fs.writeFile(newP, bodyText,Callback);
        } else {
            fs.mkdirSync(path)
            fs.writeFile(newP, bodyText,Callback);
        }
    })
    }
function Callback(err) {
    if (err) {
        console.log("ERR: ", err);
    } else {
        console.log("successfull.");
    }
}

exports.createFile_P = createFile_Path;
