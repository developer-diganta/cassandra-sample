const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        fs.mkdir('static/uploads/', { recursive: true }, (err) => {
            if (err) {
              console.error('Error creating upload directory:', err);
            }
            cb(null, 'static/uploads/');
          });
        cb(null, 'static/uploads/');
    },
    filename:(req,file,cb) => {
        console.log(file)
        cb(null, file.originalname);
        req.fileName=file.originalname;
    }
});

module.exports = storage;