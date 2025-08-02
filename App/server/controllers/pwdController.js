const dboperator = require("../db/dboperations");
const { encrypt, decrypt } = require("../crypto/encryptionhandler");

const addPassword = (req, res) => {
  const { password, sitename } = req.body;
  const hashedPwd = encrypt(password);
  var entry = {
    sitename: sitename,
    password: hashedPwd.password,
    iv: hashedPwd.iv,
  };
  dboperator
    .addPassword(entry)
    .then((body) => {
      res.send(body);
    })
    .catch((err) => console.log(err));
};

const showPasswords = (req, res) => {
  docsList = [];
  dboperator
    .showPasswords()
    .then((body) => {
      body.rows.forEach((val) => {
        docsList.push(val.doc);
      });
      res.send(docsList);
    })
    .catch((err) => console.log(err));
};

const decryptPassword = (req, res) => {
  res.send(decrypt(req.body));
};

const updatePassword = (req, res) => {
  const { _id, _rev, password, sitename } = req.body;
  const hashedPwd = encrypt(password);
  var entry = {
    _id: _id,
    _rev: _rev,
    sitename: sitename,
    password: hashedPwd.password,
    iv: hashedPwd.iv,
  };
  dboperator
    .addPassword(entry)
    .then((body) => {
      res.send(body);
    })
    .catch((err) => console.log(err));
};

const deletePassword = (req, res) => {
  dboperator
    .deletePassword(req.body)
    .then((body) => {
      res.send(body);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  addPassword,
  showPasswords,
  decryptPassword,
  updatePassword,
  deletePassword,
};
