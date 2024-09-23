import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import dotenv from 'dotenv'
import { airdrop } from "../airdrop";
import { showBalance } from "../show_balance";

dotenv.config()

export const transerSol = async (from: Keypair, to: PublicKey, amount: number) => {
    const conn = new Connection(process.env.CONNECTIONURL, "confirmed")
    const transaction = new Transaction()

    const instruction = SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL
    })

    transaction.add(instruction)
    await sendAndConfirmTransaction(conn, transaction, [from])
    console.log("Done")
}   

const secret2 = Uint8Array.from(JSON.parse(process.env.SECRET2));
const fromKeyPair = Keypair.fromSecretKey(secret2);
const toPublicKey = new PublicKey(process.env.PUBLICKEY);

(async() => {
    await airdrop(fromKeyPair.publicKey, 4)
    const initBalanceFrom = await showBalance(fromKeyPair.publicKey)
    console.log(`Initial Balance of From Wallet is ${initBalanceFrom}`)
    const initBalanceTo = await showBalance(toPublicKey)
    console.log(`Initial Balance of To Wallet is ${initBalanceTo}`)

    await transerSol(fromKeyPair, toPublicKey, 2)

    const finalBalanceFrom = await showBalance(fromKeyPair.publicKey)
    console.log(`Final Balance of From Wallet is ${finalBalanceFrom}`)
    const finaBalanceTo = await showBalance(toPublicKey)
    console.log(`Final Balance of To Wallet is ${finaBalanceTo}`)
})()