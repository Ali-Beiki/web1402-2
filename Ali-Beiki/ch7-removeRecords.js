let fs = require("fs");

let name =process.argv[2];


function deleterecord(){
    fs.readFile("database.json", 'utf8', function readCallback(err , filedata){
        if(err){
            console.log('ERR: ', err);
        }
        else
        {
          

            filedata =JSON.parse(filedata);
            console.log(filedata);

            let stLength =filedata.records.length;

            filedata.records =filedata.records.filter(delet)


            function delet(item){
                return item.name !=name
            }

            stLength-=(filedata.records.length)

            filedata = JSON.stringify(filedata);
            fs.writeFile("database.json", filedata, Callback);

            console.log(`Count Deleting item :${stLength}`)

            // console.log(filedata);
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

deleterecord()