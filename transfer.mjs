import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
  } from "@solana/web3.js";
  import walletKey from "./wallet.json" assert { type: "json" };
  
  const to = new PublicKey("H69Bx7NPHYLvhm5GMWd5ertAjE2o93mY7q7iUvo6Gjj6");
  const from = Keypair.fromSecretKey(new Uint8Array(walletKey));
  
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  console.log({ to, from });
  
  const transfer = async () => {
    const balance = await connection.getBalance(from.publicKey);
    console.log({ balance });


    const sendSol = async() => {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance,
          })
        );
    
        transaction.feePayer = from.publicKey;
    
        const recentBlockhash = await connection.getLatestBlockhash('confirmed');
        transaction.recentBlockhash = (recentBlockhash).blockhash;
        
    
        const fee =
          (
            await connection.getFeeForMessage(
              transaction.compileMessage(),
              "confirmed"
            )
          ).value || 0;
    
    
        transaction.instructions.pop(); 
    
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance * 0.1 - fee,
          })
        );
    
        const send = await sendAndConfirmTransaction(connection, transaction, [
          from,
        ]);
    
        console.log({ send });
    }
  
    if (balance <= LAMPORTS_PER_SOL ) {
            
            const myAddress = Keypair.fromSecretKey(new Uint8Array(walletKey)).publicKey.toBase58() ; 
        
            console.log({myAddress})
            const myAddressPublickey = new PublicKey(myAddress); 
        
            const signature = await connection.requestAirdrop(myAddressPublickey, LAMPORTS_PER_SOL * 0.3);
        
            console.log({signature}); 
        
            const res = await connection.confirmTransaction(signature);
        
            console.log({res})

            sendSol();
    } else {
        sendSol();
    }
  };
  
  transfer();