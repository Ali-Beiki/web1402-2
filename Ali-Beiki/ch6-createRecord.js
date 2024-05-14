let fs = require("fs");

// let name =process.argv[2];
// let fname =process.argv[3];
// let age =process.argv[4];


function addrecord(){
        
    fs.readFile("database.json", 'utf8', function readCallback(err , filedata){
        if(err){
            console.log('ERR: ', err);
        }
        else{
            filedata = JSON.parse(filedata);
            // let id=filedata.record.length+100;
            let record={
                name: process.argv[2],
                family: process.argv[3],
                age: process.argv[4]
            };
            filedata.records.push(record);
            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, Callback);
            
        }
    });
}

function Callback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('successfull.');
    }
}
addrecord()