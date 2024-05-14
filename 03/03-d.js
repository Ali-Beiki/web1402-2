let fs = require('fs');


function callback(err){
    if (err){

        if(err.code ==='EPERM'){// for folder
            fs.rmdir(process.argv[2],rmCallback)
        }else{
            console.log("ERROR : ",err)
        }
        
    }else{
        console.log("File Delet !")
    }
}

function rmCallback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("Folder Delete !")
    }
}
    fs.unlink(process.argv[2],callback)
