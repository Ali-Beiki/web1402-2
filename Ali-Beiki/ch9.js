let command = process.argv[2];
let name = process.argv[3];
let fname = process.argv[4];
let age = process.argv[5];
let commands = {
    helloword: function () {
        //node ch9 helloword
        let hw = require("./ch1-helloworld");
        hw.showHello();
    },
    createFile: function () {
        //node ch9 createFile Ali.txt hello
        let cf = require("./ch2-createFile");
        cf.createFile(name, fname);
    },
    createFile2: function () {
        //node ch9 createFile2 Ali.txt .\a\ hello
        let cfp = require("./ch3-createFile2");
        cfp.createFile_P(name, fname, age);
    },
    delFile: function () {
        //node ch9 delFile Ali.txt
        let df = require("./ch4-delFile");
        df.deletF(name);
    },
    delFileFolder: function () {
        // node ch9 delFileFolder Ali.txt .\a\
        // node ch9 delFileFolder folderTest .\a\
        let dff = require("./ch5-delFileFolder");
        dff.deleteFile_Folder(name, fname);
    },
    createRecord: function () {
        // node ch9 createRecord name fname age(number)
        let cr = require("./ch6-createRecord");
        cr.createRecord(name, fname, age);
    },
    removeRecords: function () {
        // node ch9 removeRecords name
        let rR = require("./ch7-removeRecords");
        rR.removeRecord(name);
    },
};

commands[command]();
