import { keystore } from "app/keystore";
import { userResolved } from "app/lib/controller/tyron/user";
import { originatorAddress } from "app/lib/controller/tyron/utils";
import React from "react";
import * as tyron from "tyron";
import smartContract from "./smartContract";
import { ZilPayBase } from "./zilpay-base";

function wallet() {
  const originator_address = originatorAddress.useValue();
  const resolvedInfo = userResolved.useValue();
  const { getSmartContract } = smartContract();
  const net = "testnet";
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const checkBalance = async (
    currency: string,
    input: string,
    setLoadingInfoBal: any
  ) => {
    let addr: any = "";
    const id = currency.toLowerCase();
    if (originator_address?.value !== "zilliqa") {
      addr = originator_address?.value;
    }
    try {
      setLoadingInfoBal(true);
      if (id !== "zil") {
        let token_addr: string;
        const init_addr = await tyron.SearchBarUtil.default.fetchAddr(
          net,
          "init",
          "did"
        );
        const get_services = await getSmartContract(init_addr, "services");
        const services = await tyron.SmartUtil.default.intoMap(
          get_services.result.services
        );
        token_addr = services.get(id);
        const balances = await getSmartContract(token_addr, "balances");
        const balances_ = await tyron.SmartUtil.default.intoMap(
          balances.result.balances
        );
        if (addr !== "") {
          const balance_didxwallet = balances_.get(addr!.toLowerCase()!);
          if (balance_didxwallet !== undefined) {
            const _currency = tyron.Currency.default.tyron(id);
            const finalBalance = balance_didxwallet / _currency.decimals;
            setLoadingInfoBal(false);
            return Number(finalBalance.toFixed(2)) >= Number(input);
          }
        } else {
          const balance_zilpay = balances_.get(account?.base16.toLowerCase());
          if (balance_zilpay !== undefined) {
            const _currency = tyron.Currency.default.tyron(id);
            const finalBalance = balance_zilpay / _currency.decimals;
            setLoadingInfoBal(false);
            return Number(finalBalance.toFixed(2)) >= Number(input);
          }
        }
      } else {
        if (addr !== "") {
          const balance = await getSmartContract(addr!, "_balance");
          const balance_ = balance.result._balance;
          const zil_balance = Number(balance_) / 1e12;
          setLoadingInfoBal(false);
          return Number(zil_balance.toFixed(2)) >= Number(input);
        } else {
          const zilpay = new ZilPayBase().zilpay;
          const zilPay = await zilpay();
          const blockchain = zilPay.blockchain;
          const zilliqa_balance = await blockchain.getBalance(
            account?.base16.toLowerCase()
          );
          const zilliqa_balance_ =
            Number(zilliqa_balance.result!.balance) / 1e12;
          setLoadingInfoBal(false);
          return Number(zilliqa_balance_.toFixed(2)) >= Number(input);
        }
      }
    } catch (error) {
      setLoadingInfoBal(false);
      return false;
    }
  };

  const checkPause = async () => {
    const res: any = await getSmartContract(resolvedInfo?.addr!, "paused");
    return res?.result?.paused.constructor === "True";
  };

  return {
    checkBalance,
    checkPause,
  };
}

export default wallet;
