import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Keypair, Transaction, sendAndConfirmTransaction, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { airdrop } from "../airdrop";
import dotenv from 'dotenv'

dotenv.config()

const createMint = async (mintWallet: Keypair) => {
  const connection = new Connection(process.env.CONNECTIONURL, 'confirmed');
  const creatorToken = await Token.createMint(connection, mintWallet, mintWallet.publicKey, null, 8 , TOKEN_PROGRAM_ID);
  return creatorToken.publicKey;
};

const transferTokens = async (tokenAddress: PublicKey, mintWallet: Keypair, receiver: PublicKey) => {
  const connection = new Connection(process.env.CONNECTIONURL, 'confirmed');
  const creatorToken = new Token(connection, tokenAddress, TOKEN_PROGRAM_ID, mintWallet);
  const mintTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(mintWallet.publicKey);

  await creatorToken.mintTo(mintTokenAccount.address, mintWallet.publicKey, [mintWallet], 100000000);
  const receiverTokenAccount = await creatorToken.getOrCreateAssociatedAccountInfo(receiver);

  console.log(`Receiver Token Account Address: ${receiverTokenAccount.address}`);

  const transaction = new Transaction().add(
    Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        mintTokenAccount.address,
        receiverTokenAccount.address,
        mintWallet.publicKey,
        [],
        100000000
    )
    );
    await sendAndConfirmTransaction(connection, transaction, [mintWallet], { commitment: "confirmed" });
}

(async () => {
    // const mintWallet = await Keypair.generate();
    const secret1 = Uint8Array.from(JSON.parse(process.env.SECRET1));
    const mintWallet = Keypair.fromSecretKey(secret1);

    // await airdrop(mintWallet.publicKey, 2);
    // const creatorTokenAddress = await createMint(mintWallet);

    const creatorTokenAddress = new PublicKey(process.env.CREATORTOKENADDRESS1)
    await transferTokens(creatorTokenAddress, mintWallet, new PublicKey(process.env.PUBLICKEY2));

    console.log(`Creator token address: ${creatorTokenAddress}`);
    console.log(`mintWallet address: ${mintWallet.publicKey}`);
})();