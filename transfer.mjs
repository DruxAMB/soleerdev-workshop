import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallekey from "./wallet.json" assert { type: "json"};

const to = new PublicKey("6hcnDRvrinTMrwLYheTdhmM28pXSzZiwrAy2BTuDsbru");
const from = Keypair.fromSecretKey(new Uint8Array(wallekey));

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log({ to, from });

const transfer = async () => {
  const balance = connection.getBalance(from.publicKey);

  console.log(balance);
};

transfer()