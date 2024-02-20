let fs = require('fs');

function callback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("Copy Succsesfull !")
    }
}
    fs.copyFile(process.argv[2],process.argv[3],callback)