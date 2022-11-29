import React, { useState } from "react";
import { useNavigationState } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
  NativeModules,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { w3cwebsocket as W3cwebsocket } from "websocket";
// import Aes from 'react-native-aes-crypto';
import back from "../assets/img/back.png";
import { AccountTypes } from "../configs/account-type";
import { ActivityIndicator } from "react-native";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Scan: React.FC<Props> = ({ navigation }) => {
  // const dispatch = useDispatch();
  const Aes = NativeModules.Aes;
  const type = useNavigationState((state: any) => state.routes[1].params.type);
  const [step, setStep] = useState(1);
  const [data, setData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<any>(null);

  const onSuccess = (e: any) => {
    // if (type === 'zilpay') {
    //   dispatch(zilpayKey(e.data));
    // } else {
    //   dispatch(arconnectKey(e.data));
    // }
    // navigation.navigate('Welcome');
    Alert.alert(`connected`, e.data);
  };

  const handleScan = React.useCallback(async (value: any) => {
    // setIsLoading(true);
    // Alert.alert('koko')

    const [uuid, iv] = value.data.split("/");

    if (uuid && iv) {
      try {
        const client = new W3cwebsocket("wss://ws.zilpay.io", "zilpay-connect");

        client.onerror = function () {
          client.close();
        };
        client.onmessage = function (e: any) {
          try {
            const parsed = JSON.parse(String(e.data));
            setData({
              ...parsed.data,
              iv,
            });
            console.log("####", parsed.data);
            handleDecrypt({
              ...parsed.data,
              iv,
            });
          } catch (err) {
            // console.log('parse', err);
          } finally {
            client.close();
          }
        };

        client.onopen = function () {
          if (client.readyState === client.OPEN) {
            client.send(
              JSON.stringify({
                type: "Connect",
                data: "",
                uuid,
              })
            );
          }
        };
      } catch (err) {
        Alert.alert("Failed", (err as Error).message);
      }
    } else {
      Alert.alert("Failed", "Invalid QR Code");
    }

    // setIsLoading(false);
  }, []);

  const handleDecrypt = React.useCallback(
    async (data: any) => {
      setIsLoading(true);

      // if (!data || !password) {
      //   Alert.alert(
      //     i18n.t('connect_invalid_qr_code_title'),
      //     i18n.t('connect_invalid_qr_code_des')
      //   );

      //   setIsLoading(false);

      //   return null;
      // }

      try {
        console.log("1");
        const password = "input here"; // ZilPay Password
        const pwd = await Aes.sha256(password);
        console.log("2");
        // Alert.alert('content', JSON.stringify(data.cipher))
        // console.log(data.chiper, pwd, data.iv)
        const content = await Aes.decrypt(
          data.cipher,
          pwd,
          data.iv,
          "aes-256-cbc"
        );
        console.log("3");
        const decrypted = JSON.parse(content);

        for (const account of data.wallet.identities) {
          console.log("4", account.type);
          try {
            if (account.type === AccountTypes.Seed) {
              // await keystore.addAccount(
              //   decrypted.seed,
              //   account.name,
              //   account.index
              // );
            } else if (account.type === AccountTypes.privateKey) {
              console.log("5");
              const found = decrypted.keys.find(
                (el: any) => el.index === account.index
              );
              if (!found) {
                continue;
              }
              Alert.alert("Private Key", JSON.stringify(found.privateKey));
              console.log(account.name);
              // await keystore.addPrivateKeyAccount(
              //   found.privateKey,
              //   account.name,
              //   password
              // );
            }
          } catch {
            continue;
          }
        }
      } catch (err) {
        // setPasswordError((err as Error).message);
      }

      setIsLoading(false);
    },
    [data]
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {step === 1 ? (
            <View>
              <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.backIco}
              >
                <Image source={back} style={styles.backIco} />
              </TouchableOpacity>
              <View style={styles.stepsWrapper}>
                {type === "zilpay" ? (
                  <>
                    <Text style={styles.title}>
                      How to connect your Zilpay wallet:
                    </Text>
                    <Text style={styles.subTitle}>
                      1. Open Zilpay extension on Desktop.
                    </Text>
                    <Text style={styles.subTitle}>
                      2. Go to Settings {`>`} Security.
                    </Text>
                    <Text style={styles.subTitle}>
                      3. Click `Mobile Connect`.
                    </Text>
                    <Text style={styles.subTitle}>4. Scan QR Code.</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.title}>
                      How to connect your ArConnect wallet:
                    </Text>
                    <Text style={styles.subTitle}>
                      1. Open ArConnect extension on Desktop.
                    </Text>
                    <Text style={styles.subTitle}>2. Click QR Code icon.</Text>
                    <Text style={styles.subTitle}>3. Scan QR Code.</Text>
                  </>
                )}
                <TouchableOpacity
                  onPress={() => setStep(2)}
                  style={styles.btnScan}
                >
                  <Text style={styles.btnScanTxt}>Scan</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <QRCodeScanner
              onRead={handleScan}
              topContent={<Text style={styles.scanTitle}>SCAN</Text>}
              bottomContent={
                <TouchableOpacity
                  onPress={() => setStep(1)}
                  style={styles.scanBackBtn}
                >
                  <Text style={styles.btnScanTxt}>Back</Text>
                </TouchableOpacity>
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
  },
  backIco: {
    width: 25,
    height: 25,
  },
  stepsWrapper: {
    marginTop: 20,
    alignSelf: "center",
    width: deviceWidth - 60,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  subTitle: {
    color: "#fff",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  btnScan: {
    width: 250,
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  btnScanTxt: {
    color: "#fff",
    fontWeight: "bold",
  },
  scanTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 3,
    marginBottom: 30,
  },
  scanBackBtn: {
    width: 150,
    height: 45,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 70,
  },
});
