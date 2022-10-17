import { newRidgeState } from "react-ridge-state";

export const userName = newRidgeState<String>("");
export const userDomain = newRidgeState<String>("");
export const userDoc = newRidgeState<any>(null);
export const userResolved = newRidgeState<any>(null);
export const loginInfo = newRidgeState<any>(null);