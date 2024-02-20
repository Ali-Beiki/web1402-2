let fs = require('fs');
let data=process.argv[3];

//Callbac finc
function Callback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("File Saived !")
    }
}

//Delet Callbac
function deletCallbak(err){
    if (err){

        if(err.code ==='EPERM'){//for folder
            fs.rmdir(process.argv[2],callback)
        }else{
            console.log("ERROR : ",err)
        }
        
    }else{
        console.log("File Delet !")
    }
}

//Copy Callbac
function copyCallback(err){
    if (err){
        console.log("ERROR : ",err)
    }else{
        console.log("Copy Succsesfull !")
    }
}

switch (process.argv[2]) {

    case 'create'://
            fs.writeFile(process.argv[2],data,Callback)
        break;

    case 'append' : //
        fs.appendFile(process.argv[2],data,Callback)
        break;
        
    case 'delete' : //
        fs.unlink(process.argv[2],deletCallbak)
        break; 

    case 'copy' : //
        fs.copyFile(process.argv[2],process.argv[3],copyCallback)
        break;      


    default:
        break;
}