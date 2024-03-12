import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as web3 from "@solana/web3.js";

export const SendSolForm: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const sendSol = event => {
        event.preventDefault()
        if (!publicKey || !connection) {
            console.log('Wallet not connected')
            return
        }
        const transaction = new web3.Transaction();
        const instruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new web3.PublicKey(event.target.recipient.value),
            lamports: web3.LAMPORTS_PER_SOL * parseFloat(event.target.amount.value)
        })
        transaction.add(instruction);
        sendTransaction(transaction, connection).then((sig) => {
            console.log(`Transaction sent: ${sig}\nhttps://explorer.solana.com/tx/${sig}`)
        })
        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton} onClick={(e) => sendSol}>Send</button>
            </form>
        </div>
    )
}