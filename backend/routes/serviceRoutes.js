const service = require("../controllers/services");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const route = require("express").Router();
const protection = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/img');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

route.post("/service/addService/:id", upload.single('image'), service.addService);
route.get("/service/get", protection, service.getService);
route.get("/service/getSingleService/:id", protection, service.getSingleService);
route.delete("/service/deleteService/:id", protection, service.deleteService);

module.exports = route;