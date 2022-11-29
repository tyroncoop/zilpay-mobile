import * as tyron from "../../../../node_modules/tyron";

function smartContract() {
  const net = "testnet";

  const getSmartContract = async (address: string, field: string) => {
    let network = tyron.DidScheme.NetworkNamespace.Mainnet;
    if (net === "testnet") {
      network = tyron.DidScheme.NetworkNamespace.Testnet;
    }
    const init = new tyron.ZilliqaInit.default(network);
    const substate = await init.API.blockchain.getSmartContractSubState(
      address,
      field
    );
    return substate;
  };

  return { getSmartContract };
}

export default smartContract;
