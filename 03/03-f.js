//node .\03-f.js create x.txt salamSALAMsalam
//node .\03-f.js append x.txt salamSALAMsalam
//node .\03-f.js delete x.txt
//node .\03-f.js delete myDirName
//node .\03-f.js copy x.txt y.txt  


let fs = require('fs');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];



function unlinkCallback(err) {
    if(err){
        if(err.code === 'EPERM'){
            fs.rmdir(name, rmdirCallback); 
        }
        else{
            console.log('ERR: ', err)
        }
    }
    else{
        console.log("unlink  successfull.")
    }
}

function rmdirCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('rmdir successfull')
    }
}

function Callback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(command+' successfill')
    }
}

// switch(command){
//     case 'create':
//         fs.writeFile(name, arg4, writeFileCallback); 
//         break;
//     case 'append':
//         fs.appendFile(name, arg4, appendFileCallback); 
//         break;
//     case 'delete':
//         fs.unlink(name, unlinkCallback);
//         break;
//     case 'copy':
//         fs.copyFile(name, arg4, copyFileCallback); 
//         break;
//     default:
//         console.log('Command not found');
// }

let commands = {
    create: function(){
        fs.writeFile(name, arg4, Callback);
    },
    append: function(){
        fs.appendFile(name, arg4, Callback); 
    },
    delete: function(){
        fs.unlink(name, unlinkCallback);
    },
    copy: function(){
        fs.copyFile(name, arg4, Callback);
    }
}

commands[command]();