var pwddb = require('./dbconnection/couchdb').use('pwdmanager');
//works for both add and update by passing _rev and _id it updates
async function addPassword(entry) {  
   return await pwddb.insert(entry);
}
async function showPasswords() {  
    return await pwddb.list({include_docs: true});
}
 async function deletePassword(entry) {
  return await pwddb.destroy(entry._id, entry._rev)
}
  module.exports =  {addPassword, showPasswords,deletePassword};