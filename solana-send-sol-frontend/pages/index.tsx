import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import { BalanceDisplay } from '../components/BalanceDisplay'
import { SendSolForm } from "../components/SendSolForm";
import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Solana Send Sol Example</title>
        <meta name="description" content="Solana Send Sol Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
