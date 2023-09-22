const express = require('express');
const router = express.Router();
const pwdControllwer = require('../controllers/pwdController');
router.get('/',(req,res)=>{res.send("Server works on port" + PORT);});
router.post('/addpassword',pwdControllwer.addPassword);
router.get('/showpasswords',pwdControllwer.showPasswords);
router.post('/decryptpassword',pwdControllwer.decryptPassword);
router.post('/updatepassword',pwdControllwer.updatePassword);
router.post('/deletepassword',pwdControllwer.deletePassword);
module.exports = router;

