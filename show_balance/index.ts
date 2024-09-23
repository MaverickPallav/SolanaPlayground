import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from 'dotenv';
import { airdrop } from "../airdrop";

dotenv.config();

export const showBalance = async (publickey: PublicKey) => {
    const conn = new Connection(process.env.CONNECTIONURL, "confirmed")
    const response = await conn.getAccountInfo(publickey)
    return response.lamports/LAMPORTS_PER_SOL
}

(async () => {
    const publickey = process.env.PUBLICKEY
    const balance = await showBalance(new PublicKey(publickey))
    console.log(`The balance for the key ${publickey} is ${balance}`)
    await airdrop(publickey, 1)
    const updatedBalance = await showBalance(new PublicKey(publickey))
    console.log(`Updated balance for the key ${publickey} is ${updatedBalance}`)
})()