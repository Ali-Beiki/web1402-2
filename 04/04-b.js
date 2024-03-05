//node .\03-f.js create x.txt salamSALAMsalam
//node .\03-f.js append x.txt salamSALAMsalam
//node .\03-f.js delete x.txt
//node .\03-f.js delete myDirName
//node .\03-f.js copy x.txt y.txt  
//node .\04-a.js read x.text


let fs = require('fs');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];

function writeFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('writeFile  successfull.');
    }
}

function appendFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('append  successfull.');
    }
}

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

function copyFileCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('copyFile successfill')
    }
}

let messages ={
    copy: 'copyFile successfull',
    append: 'append  successfull.',
    create: 'writeFile  successfull.',
    read:"read file successfull",
    createR:"Save Recorde Successfull"
}

function fsCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command])
    }
}

function readCallback(err,data){
    if (err) {
        console.error(err);
    }
    else{
        console.log(messages[command])
        console.log(data);
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
    createR:function(){
        let data = {
            name:process.argv[3],
            family:process.argv[4],
            email:process.argv[5] 
        }
        fs.readFile("db.json",{encoding: "utf8"},function(err,fileData){
            if(err){
                console.log("ERR :",err)
            }else{
                fileData =JSON.parse(fileData)
                fileData.records.push(data)
                fileData =JSON.stringify(fileData)
                fs.writeFile("db.json",fileData,fsCallback)
            }
        })
    },
    readR:function(){
        fs.readFile("db.json",{encoding: "utf8"},function(err,fileData){
            if(err){
                console.log("ERR :",err)
            }else{
                fileData =JSON.parse(fileData)
                console.log(fileData.records[process.argv[3]])
            }
        })
    }
}

commands[command]();

// console.log('{"name":"nasser"}')
// console.log(JSON.parse('{"name":"nasser"}'))