let fs = require('fs');
const { json } = require('stream/consumers');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];

function Callback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log( command,'successfull.');
    }
}
function readCallback(err , data){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(data);
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
function addrecord(){
    fs.readFile("database.json", 'utf8', function readCallback(err , filedata){
        if(err){
            console.log('ERR: ', err);
        }
        else{
            filedata = JSON.parse(filedata);
            let id=filedata.record.length+100;
            let record={
                id:id,
                name: process.argv[3],
                family: process.argv[4],
                email: process.argv[5]
            };
            filedata.record.push(record);
            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, Callback);
            
        }
    });
}

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
    },
    read: function(){
        fs.readFile(name, 'utf8', readCallback);
    },
    addrecord: addrecord()
}

commands[command]();