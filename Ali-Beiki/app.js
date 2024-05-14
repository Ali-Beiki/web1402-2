let command = process.argv[2];
let name =process.argv[3];
let fname =process.argv[4];
let age =process.argv[5];
let commands = {
    helloword: function(){
        let hw = require("./ch1-helloworld");
        hw.showHello()
    },
    createF: function(){
        let cf = require("./ch2-createFile");
        cf.createFile(name,fname)
    },
    createF_Path: function(){
        let cfp = require("./ch3-createFile2");
        cfp.createFile_P(name,fname,age)
    },
    deletFile: function(){
        let df = require("./ch4-delFile");
       df.deletF(name)
    },
    read: function(){
        fs.readFile(name, 'utf8', readCallback);
    },
}

commands[command]();