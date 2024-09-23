import { PublicKey, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const showBalance = async (publickey: PublicKey) => {
    const conn = new Connection(process.env.CONNECTIONURL, "confirmed")
    const response = await conn.getAccountInfo(publickey)
    return response.lamports/LAMPORTS_PER_SOL
}