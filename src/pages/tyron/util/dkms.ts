import Arweave from "arweave";
import * as tyron from "tyron";
const zcrypto = tyron.Util.default.Zcrypto();

export async function operationKeyPair({
  arConnect,
  id,
  addr,
}: {
  arConnect: any;
  id: any;
  addr: any;
}) {
  const private_key = zcrypto.schnorr.generatePrivateKey();
  const public_key = "0x" + zcrypto.getPubKeyFromPrivateKey(private_key);
  const encrypted_key = await encryptKey(arConnect, private_key);
  const verification_method = {
    id: id,
    key: public_key,
    encrypted: encrypted_key,
  };
  const doc_element = {
    constructor: tyron.DocumentModel.DocumentConstructor.VerificationMethod,
    action: tyron.DocumentModel.Action.Add,
    key: verification_method,
  };
  const doc_parameter = await tyron.TyronZil.default.documentParameter(
    addr,
    doc_element
  );

  return {
    element: doc_element,
    parameter: doc_parameter,
  };
}

export async function encryptKey(arConnect: any, key: any) {
  let encryptedKey = await arConnect.encrypt(key, {
    //(JSON.stringify(key), {
    algorithm: "RSA-OAEP",
    hash: "SHA-256",
  });
  encryptedKey = Arweave.utils.bufferTob64Url(encryptedKey);
  return encryptedKey;
}
