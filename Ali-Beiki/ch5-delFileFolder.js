
let fs = require("fs");

let filename =process.argv[2];
let path =process.argv[3];
let newP =path+filename


fs.unlink(newP,unlinkCallback)

function Callback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('successfull.');
    }
}

function unlinkCallback(err) {
    if(err){
        if(err.code === 'EPERM'){
            fs.rmdir(newP, Callback); 
        }
        else{
            console.log('ERR: ', err)
        }
    }
    else{
        console.log("unlink  successfull.")
    }
}