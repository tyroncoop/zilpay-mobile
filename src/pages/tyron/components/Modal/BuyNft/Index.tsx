import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as tyron from "../../../../../../node_modules/tyron";
import smartContract from "../../../util/smartContract";
import { t } from "i18next";
import {
  loginInfo,
  userDoc,
  userDomain,
  userName,
  userResolved,
} from "app/lib/controller/tyron/user";
import { keystore } from "app/keystore";
import { ZilPayBase } from "../../../util/zilpay-base";
import { showTxModal, txId, txStatus } from "app/lib/controller/tyron/tx";
import { TyronConfirm } from "../../PopUp";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import DropDownPicker from "react-native-dropdown-picker";
import Donate from "../../Donate/Index";
import { ScrollView } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {
  navigation: any;
  visible: boolean;
  hideModal: any;
};

const ModalBuyNft: React.FC<Props> = ({ navigation, visible, hideModal }) => {
  const { getSmartContract } = smartContract();
  const zcrypto = tyron.Util.default.Zcrypto();
  const net = "testnet";
  const loginInfo_: any = loginInfo.useValue();
  const isLogin = loginInfo_?.address;
  const username = userName.useValue();
  const domain = userDomain.useValue();
  const [openRecipient, setOpenRecipient] = useState(false);
  const [valueRecipient, setValueRecipient] = useState("");
  const [openPayment, setOpenPayment] = useState(false);
  const [valuePayment, setValuePayment] = useState("");

  const isDark = tyronThemeDark.useValue();
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const itemsRecipient = [
    {
      value: "SSI",
      label: t("THIS_SSI"),
    },
    {
      value: "ADDR",
      label: t("ANOTHER_ADDRESS"),
    },
  ];

  const itemsPayment = [
    {
      value: "TYRON",
      label: "10 TYRON",
    },
    {
      value: "XSGD",
      label: "15 XSGD",
    },
    {
      value: "zUSDT",
      label: "10 zUSDT",
    },
    {
      value: "FREE",
      label: t("FREE"),
    },
  ];

  return (
    <>
      <Modal transparent animationType="slide" visible={visible}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.btnXWrapper}
                  onPress={hideModal}
                >
                  <Text style={styles.btnX}>x</Text>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView} indicatorStyle="white">
                  <Text style={styles.title}>{t("BUY_THIS_NFT_USERNAME")}</Text>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name}>
                      {username}
                      {domain === "" ? ".ssi" : ".did"}
                    </Text>
                    <Text style={styles.title2}>{t("IS_AVAILABLE")}</Text>
                  </View>
                  {!loginInfo_?.address ? (
                    <TouchableOpacity style={styles.btnLogin}>
                      <Text style={styles.txtYellow}>{t("LOG_IN")}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Text style={styles.txt}>
                        {t("YOU_HAVE_LOGGED_IN_SSI")}
                      </Text>
                      <View style={styles.wrapperLoginInfo}>
                        {loginInfo_?.username ? (
                          <Text style={styles.txt}>
                            {loginInfo_?.username}.did
                          </Text>
                        ) : (
                          <Text style={styles.txt}>
                            did:tyron:zil...{loginInfo_?.address.slice(-10)}
                          </Text>
                        )}
                      </View>
                      <View>
                        <Text style={styles.title3}>
                          {t("SELECT_RECIPIENT")}
                        </Text>
                        <View style={styles.picker}>
                          <DropDownPicker
                            zIndex={5000}
                            zIndexInverse={1000}
                            listMode="SCROLLVIEW"
                            open={openRecipient}
                            value={valueRecipient}
                            items={itemsRecipient}
                            multiple={false}
                            setOpen={setOpenRecipient}
                            setValue={setValueRecipient}
                            theme="DARK"
                            style={{
                              backgroundColor: "#000",
                              borderColor: "#fff",
                            }}
                            placeholder=""
                          />
                        </View>
                      </View>
                      <View>
                        <Text style={styles.title3}>{t("SELECT_PAYMENT")}</Text>
                        <View style={styles.picker}>
                          <DropDownPicker
                            zIndex={4000}
                            zIndexInverse={1000}
                            listMode="SCROLLVIEW"
                            open={openPayment}
                            value={valuePayment}
                            items={itemsPayment}
                            multiple={false}
                            setOpen={setOpenPayment}
                            setValue={setValuePayment}
                            theme="DARK"
                            style={{
                              backgroundColor: "#000",
                              borderColor: "#fff",
                            }}
                            placeholder=""
                          />
                        </View>
                      </View>
                      <View style={styles.wrapperDonate}>
                        <Donate />
                      </View>
                      <View>
                        <TouchableOpacity style={styles.btnSubmit}>
                          <Text style={styles.txtYellow}>
                            {t("BUY NFT USERNAME")}
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.txtGas}>
                          {t("GAS_AROUND")}
                          &nbsp; 14 ZIL
                        </Text>
                      </View>
                    </View>
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* <TyronConfirm
        title="New DID"
        visible={popup}
        setPopup={setPopup}
        onConfirm={newSsi}
      /> */}
    </>
  );
};

export default ModalBuyNft;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    padding: 15,
  },
  modalView: {
    width: deviceWidth - 30,
    padding: 15,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingTop: 5,
    marginTop: Platform.OS === "ios" ? 60 : 30,
    maxHeight: deviceHeight - 30,
  },
  btnXWrapper: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  btnX: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 17,
  },
  title2: {
    color: "#fff",
    fontSize: 17,
    letterSpacing: 2,
  },
  title3: {
    color: "#fff",
    fontSize: 17,
  },
  name: {
    color: "#ffff32",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  nameWrapper: {
    marginVertical: 20,
  },
  txt: {
    color: "#fff",
  },
  txtYellow: {
    color: "#ffff32",
    textTransform: "uppercase",
  },
  btnLogin: {
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ffff32",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  wrapperLoginInfo: {
    marginVertical: 20,
  },
  picker: {
    marginTop: 10,
    marginBottom: 15,
  },
  wrapperDonate: {
    marginVertical: 20,
  },
  scrollView: {
    maxHeight: deviceHeight * 0.7,
    marginBottom: 10,
  },
  btnSubmit: {
    borderColor: "#ffff32",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },
  txtGas: {
    color: "silver",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 10,
  },
});
