let fs = require('fs');


function send(response, body, ext,token){
    let ageCookei =200;
    let types = {
        'txt': 'text/plain',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'html': 'text/html'
    }

    if(! types[ext]){
        response.writeHead(200, { 'Content-Type': types['txt']});
        response.write('extention not found');
        response.end();
    }
    else{
        response.writeHead(200, { 'Content-Type': types[ext],
            "Set-Cookie": `token=${token};Max-Age=${ageCookei}`
        },
        );
        response.write(body);
        response.end();
    }
}

function htmlFileController(request, response){
    let fileName = request.url.split('/')[2];

    fs.readFile(fileName, function(err, fileData){
        if(err){
            response.writeHead(200, { 'Content-Type': 'text/plain'});
            response.write('file not found');
            response.end();
        }
        else{
            response.writeHead(200, { 'Content-Type': 'text/html'});
            response.write(fileData);
            response.end();
        }
    });
}

function multiplyPOST(request, response){
    if (request.headers.cookie) {
        send(response, (request.data.op1 * request.data.op2).toString(), 'txt');
    } else {
        console.log("not fonf token");
        // console.log("B :"+request.headers.cookie);
    }
   
}

function multiplyGET(request, response){
    let operand1 = Number(request.url.split('/')[2]);
    let operand2 = Number(request.url.split('/')[3]);
        
    send(response, (operand1*operand2).toString(), 'txt');
}

function sumGET(request, response){
    let operand1 = Number(request.url.split('/')[2]);
    let operand2 = Number(request.url.split('/')[3]);
        
    send(response, (operand1+operand2).toString(), 'txt');
}

function sumPOST(request, response){
    send(response, (request.data.op1 + request.data.op2).toString(), 'txt');
}

function isExistToken(token){
    
}

function loginPOST(request, response){      
    let user = request.data.user;
    let pass = request.data.pass;

    function getArrayIndex(array, user,pass){
        for(let i=0; i<array.length; i++){
            if(array[i].user == user && array[i].pass == pass){
                return i;
            }
        }
    }
    fs.readFile('database.json', {encoding: 'utf8'}, function(err, fileData){
        if(err){
            console.log('ERR: ', err);
        }
        else { 
            fileData = JSON.parse(fileData);
    
            let userIndex =getArrayIndex(fileData.records, user,pass)

            if(fileData.records[userIndex] === undefined){
                console.log("Record not found.");
                console.log(fileData.records[userIndex]);

                send(response,"Record not found.","txt")
            }
            else{
                let token =Math.floor(Math.random()*10000)
               
                fileData.records[userIndex].token =token
                token = fileData.records[userIndex].token
               
               let body = JSON.stringify(fileData)
                fs.writeFile('database.json',body,function(err){
                    if (err) {
                        console.log("can not write in file");
                        send(response,"can not write in file","txt")
                    } else {   
                        console.log("token :" + token);
                        send(response,"token :"+token,"txt",token)
                    }
                })

            }                             
        }
    });
}

exports.htmlFile = htmlFileController;
exports.multiply = {
    GET: multiplyGET,
    POST: multiplyPOST
};
exports.sumController = {
    GET: sumGET,
    POST: sumPOST
}
exports.login={
    POST: loginPOST
}
