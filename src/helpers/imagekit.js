const imgKit = require("imagekit");
const imageKit = new imgKit({
  publicKey: process.env.publicKey,
  privateKey: process.env.privateKey,
  urlEndpoint: process.env.urlEndpoint,
});

module.exports = imageKit;
