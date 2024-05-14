let fs = require("fs");

function deleteFile_F(filename, path) {
    let newP = path + filename;
    fs.unlink(newP, unlinkCallback);

    function Callback(err) {
        if (err) {
            console.log("ERR Delet file: ", err);
        } else {
            console.log("successfull Delet file.");
        }
    }

    function unlinkCallback(err) {
        if (err) {
            if (err.code === "EPERM") {
                fs.rmdir(newP, Callback);
            } else {
                console.log("ERR Delet folder: ", err);
            }
        } else {
            console.log("Delet folder successfull.");
        }
    }
}
exports.deleteFile_Folder = deleteFile_F;
