import { newRidgeState } from "react-ridge-state";

export interface OriginatorAddress {
    value: string
    username?: string
    domain?: string
}

export const originatorAddress = newRidgeState<OriginatorAddress | null>(null);
export const loadingGlobal = newRidgeState<boolean>(false);
export const donation = newRidgeState<number | null>(null);
export const extraZil = newRidgeState<number | null>(null);
export const zilBal = newRidgeState<number | null>(null);