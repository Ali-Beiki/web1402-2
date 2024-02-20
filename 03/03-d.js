let fs = require('fs');


function callback(err){
    if (err){

        if(err.code ==='EPERM'){//  folder
            fs.rmdir(process.argv[2],callback)
        }else{
            console.log("ERROR : ",err)
        }
        
    }else{
        console.log("File Delet !")
    }
}
    fs.unlink(process.argv[2],callback)
