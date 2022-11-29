import React from "react";
import Lottie from "lottie-react-native";

export type Props = {};

const ThreeDots: React.FC<Props> = () => {
  return (
    <Lottie
      style={{ width: 30 }}
      source={require("../../assets/lottie/threedots.json")}
      autoPlay
      loop
    />
  );
};

export default ThreeDots;
