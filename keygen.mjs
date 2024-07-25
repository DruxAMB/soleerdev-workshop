// const { Keypair } = require("@solana/web3.js");

import { Keypair } from "@solana/web3.js";

const wallet = Keypair.generate();

const publicKey = wallet.publicKey.toBase58();
const privateKey = wallet.secretKey;

console.log(publicKey);
console.log(privateKey);

export const generateKey = () => {
  const wallet = Keypair.generate();
  const publicKey = wallet.publicKey.toBase58();
  const privateKey = wallet.secretKey;

  return { publicKey, privateKey };
};
