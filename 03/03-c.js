let fs = require('fs');


function callback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("File Delet !")
    }
}
    fs.unlink(process.argv[2],callback)

