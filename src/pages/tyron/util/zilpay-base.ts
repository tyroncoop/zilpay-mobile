import * as tyron from "tyron";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { Long, bytes, units } from "@zilliqa-js/util";
import { toBech32Address } from "@zilliqa-js/crypto";
import { operationKeyPair } from "./dkms";

const zutil = tyron.Util.default.Zutil();

export class ZilPayBase {
  async call(data: any) {
    const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");

    // let privkey = '4d5eadba6811758c99bb5f2b466d19a3f42fcb396c1402a2874facacda372bd7'

    zilliqa.wallet.addByPrivateKey(data?.privkey);
    const ftAddr = toBech32Address(data?.contractAddress);
    const contract = zilliqa.contracts.at(ftAddr);
    const amount_ = zutil.units.toQa(data.amount, zutil.units.Units.Zil);
    const gasPrice = units.toQa("2000", units.Units.Li); // Gas Price that will be used by all transactions
    const gasLimit = Long.fromNumber(10000);
    const CHAIN_ID = 333;
    const MSG_VERSION = 1;
    const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

    const amount = amount_ || "0";

    return await contract.call(data.transition, data.params, {
      version: VERSION,
      amount,
      gasPrice,
      gasLimit,
    });
  }

  async deployDid(net: string, address: string, arConnect: any) {
    try {
      const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
      const contracts = zilliqa.contracts;

      //@xalkan
      let XWALLET = "zil1u267scqjs6rrgfs5c326el23hh78g9j38ng58m";
      let xInit = "0x2d7e1a96ac0592cd1ac2c58aa1662de6fe71c5b9";

      if (net === "testnet") {
        XWALLET = "zil1qvyhwc7s3g5eayrkqf88qens9qgzxqwtd6nsje";
        xInit = "0xec194d20eab90cfab70ead073d742830d3d2a91b";
      }
      const xwallet: any = contracts.at(XWALLET);
      const code = await xwallet.getCode();

      let verification_methods: any = [];
      const did_methods: Array<{ key: string; val: string }> = [];
      const did_dkms: Array<{ key: string; val: string }> = [];
      if (arConnect !== null) {
        const key_input = [
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Update,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.SocialRecovery,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.General,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Auth,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Assertion,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Agreement,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Invocation,
          },
          {
            id: tyron.VerificationMethods.PublicKeyPurpose.Delegation,
          },
        ];
        for (const input of key_input) {
          // Creates the cryptographic DID key pair
          const doc = await operationKeyPair({
            arConnect: arConnect,
            id: input.id,
            addr: address,
          });
          verification_methods.push(doc.element.key);
        }
        for (let i = 0; i < verification_methods.length; i += 1) {
          did_methods.push({
            key: verification_methods[i].id,
            val: verification_methods[i].key,
          });
          did_dkms.push({
            key: verification_methods[i].id,
            val: verification_methods[i].encrypted,
          });
        }
      } else {
        did_methods.push({
          key: `${"update"}`,
          val: `${"0x000000000000000000000000000000000000000000000000000000000000000000"}`,
        });
        did_dkms.push({
          key: `${"null"}`,
          val: `${"null"}`,
        });
      }

      const init: any = [
        {
          vname: "_scilla_version",
          type: "Uint32",
          value: "0",
        },
        {
          vname: "init_controller",
          type: "ByStr20",
          value: `${address}`,
        },
        {
          vname: "init",
          type: "ByStr20",
          value: `${xInit}`,
        },
        {
          vname: "did_methods",
          type: "Map String ByStr33",
          value: did_methods,
        },
        {
          vname: "did_dkms",
          type: "Map String String",
          value: did_dkms,
        },
      ];
      const contract = contracts.new(code, init);
      const CHAIN_ID = 333;
      const MSG_VERSION = 1;
      const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);
      const gasLimit = Long.fromNumber(50000);
      const gasPrice = units.toQa("2000000000", units.Units.Li);
      const [tx, deployed_contract] = await contract.deploy({
        version: VERSION,
        gasLimit,
        gasPrice,
      });
      return [tx, deployed_contract];
    } catch (error) {
      throw error;
    }
  }
}
