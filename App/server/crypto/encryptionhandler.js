const crypto = require('crypto');
const secret = 'shouldbesomethinguniquewillbeepc';//based on the hashing algo here its 32 characters
//iv is initialization vector
const encrypt = (password) => {
   const iv = Buffer.from(crypto.randomBytes(16));
   const cipher = crypto.createCipheriv("aes-256-ctr",
   Buffer.from(secret),iv);
   const encryptedPWD = Buffer.concat([cipher.update(password),cipher.final()]);
   return {iv:iv.toString("hex"),password:encryptedPWD.toString("hex")};
}

const decrypt = (encryption) =>{
const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.iv,"hex"));
    const decryptedPWD  = Buffer.concat([
        decipher.update(Buffer.from(encryption.password,"hex")),
        decipher.final()
    ]);
    return decryptedPWD.toString();
}

module.exports = { encrypt, decrypt }