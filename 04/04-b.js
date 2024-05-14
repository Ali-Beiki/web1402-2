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

let messages ={
    createR:"Save Recorde Successfull",
    readR:"Read Recorde Successfull",
}

function fsCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command])
    }
}


      


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
                console.log(messages[command])
            }
        })
    }
}

commands[command]();

// console.log('{"name":"nasser"}')
// console.log(JSON.parse('{"name":"nasser"}'))