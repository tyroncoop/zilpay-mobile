import { newRidgeState } from "react-ridge-state";

export const showTxModal = newRidgeState<boolean>(false);
export const txStatus = newRidgeState<String>("false");
export const txId = newRidgeState<String>("");