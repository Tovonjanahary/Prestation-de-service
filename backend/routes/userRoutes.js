const { Router } = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const router = Router();
const userController = require('../controllers/users');
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

// home router
router.get('/', (req, res) => {
    res.send('Hello from express');
  });

  // user routes
router.post('/users/addUser', upload.single('photo'), userController.addUser);
router.post('/users/signin',  userController.signin);
router.post('/users/searchUser', protection, userController.searchUser);
router.get('/users/getUser', userController.getUser);
router.get('/users/getSingleUser/:id', userController.getSingleUser);
router.delete('/users/deleteUser/:id', protection, userController.deleteUser);
router.patch('/users/updateUser/:id', protection, userController.updateUser);
module.exports = router;