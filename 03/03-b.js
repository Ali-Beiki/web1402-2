let fs = require('fs');
let data=process.argv[3];

function callback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("File Saived !")
    }
}
    fs.appendFile(process.argv[2],data,callback)
