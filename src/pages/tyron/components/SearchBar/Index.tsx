import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import search from "../../assets/img/search.png";
import * as tyron from "../../../../../node_modules/tyron";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import {
  userDoc,
  userDomain,
  userName,
  userResolved,
} from "app/lib/controller/tyron/user";
import smartContract from "../../util/smartContract";
import ThreeDots from "../ThreeDots/Index";

const DeviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const SearchBar: React.FC<Props> = ({ navigation }) => {
  const zcrypto = tyron.Util.default.Zcrypto();
  const { t } = useTranslation();
  const { getSmartContract } = smartContract();

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const isDark = tyronThemeDark.useValue();

  const styles = isDark ? stylesDark : stylesLight;
  const net = "testnet";

  const resolveNft = async () => {
    let name = searchInput.toLowerCase();
    let domain = "";
    if (searchInput.includes("@")) {
      const [domain_ = "", username = ""] = searchInput.split("@");
      name = username.toLowerCase().replace(".did", "");
      domain = domain_;
    }
    setLoading(true);
    setSearchInput("");
    if (tyron.SearchBarUtil.default.isValidUsername(name)) {
      await tyron.SearchBarUtil.default
        .fetchAddr(net, name, "")
        .then(async (addr) => {
          if (
            addr.toLowerCase() === "0x92ccd2d3b771e3526ebf27722194f76a26bc88a4"
          ) {
            throw new Error("premium");
          } else {
            return addr;
          }
        })
        .then(async (addr) => {
          let _addr = addr;
          if (domain !== "") {
            try {
              _addr = await tyron.SearchBarUtil.default.fetchAddr(
                net,
                name,
                domain
              );
            } catch (error) {
              throw new Error("domNotR");
            }
          }

          let res = await getSmartContract(_addr, "version");
          const version = res.result.version.slice(0, 7);
          userResolved.set({
            name: name,
            domain: domain,
            addr: _addr,
          });
          userName.set(name);
          userDomain.set(domain);
          switch (version.toLowerCase()) {
            case "didxwal":
              resolveDid(name, "did");
              break;
            case "xwallet":
              resolveDid(name, "did");
              break;
            case "initi--":
              resolveDid(name, "did");
              break;
            case "xpoints":
              navigation.navigate("XPoints");
              setLoading(false);
              break;
            case "tokeni-":
              // Router.push('/fungibletoken/nft')
              setLoading(false);
              break;
            case "$siprox":
              // Router.push('/ssidollar')
              setLoading(false);
              break;
            default:
              // It could be an older version of the DIDxWallet
              resolveDid(name, domain);
              break;
          }
        })
        .catch(async (error) => {
          if (String(error).slice(-7) === "premium") {
            Alert.alert("Get in contact for more info.");
          } else if (String(error).slice(-7) === "domNotR") {
            Alert.alert("Unregistered DID Domain");
          } else {
            try {
              await tyron.SearchBarUtil.default.fetchAddr(net, name, "");
              Alert.alert("Upgrade required");
              userName.set(name);
              navigation.navigate("Services");
            } catch (error) {
              Alert.alert("Username available to buy");
            }
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Alert.alert("Username available to buy");
        });
    } else {
      setLoading(false);
      Alert.alert("Invalid username");
    }
  };

  const resolveDid = async (_username: string, _domain: string) => {
    await tyron.SearchBarUtil.default
      .fetchAddr(net, _username, "did")
      .then(async (addr) => {
        await tyron.SearchBarUtil.default
          .Resolve(net, addr)
          .then(async (result: any) => {
            const did_controller = zcrypto.toChecksumAddress(result.controller);
            const res = await getSmartContract(addr, "version");
            userDoc.set({
              did: result.did,
              controller: did_controller,
              version: result.version,
              doc: result.doc,
              dkms: result.dkms,
              guardians: result.guardians,
            });

            if (_domain === "did") {
              userResolved.set({
                name: _username,
                domain: _domain,
                addr: addr,
                status: result.status,
                version: res.result.version,
              });
              navigation.navigate("Services");
            } else {
              await tyron.SearchBarUtil.default
                .fetchAddr(net, _username, _domain)
                .then(async (domain_addr) => {
                  const res = await getSmartContract(domain_addr, "version");
                  userResolved.set({
                    name: _username,
                    domain: _domain,
                    addr: domain_addr,
                    status: result.status,
                    version: res.result.version,
                  });
                  switch (res.result.version.slice(0, 8).toLowerCase()) {
                    case "zilstake":
                      navigation.navigate("Stake");
                      break;
                    case ".stake--":
                      navigation.navigate("Stake");
                      break;
                    case "zilxwall":
                      navigation.navigate("Stake");
                      break;
                    case "vcxwalle":
                      navigation.navigate("SBT");
                      break;
                    case "sbtxwall":
                      navigation.navigate("SBT");
                      break;
                    default:
                      navigation.navigate("Servvices");
                      setTimeout(() => {
                        Alert.alert("Unregistered DID Domain.");
                      }, 1000);
                  }
                })
                .catch(() => {
                  Alert.alert("Uninitialized DID Domain.");
                  navigation.navigate("Servvices");
                });
            }
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          })
          .catch((err) => {
            if (
              String(err).includes("did_status") ||
              String(err).includes(".result") ||
              String(err).includes("null")
            ) {
              Alert.alert("Available in the future.");
            } else {
              Alert.alert(String(err));
            }
            setLoading(false);
          });
      })
      .catch(() => {
        Alert.alert("Upgrade required.");
        navigation.navigate("Servvices");
        setLoading(false);
      });
  };

  return (
    <View>
      <View style={styles.bar} />
      <Text style={styles.text}>{t("SEARCH_NFT")}</Text>
      <View style={styles.contentWrapper}>
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text: string) => setSearchInput(text)}
        />
        <View style={styles.line} />
        <TouchableOpacity onPress={resolveNft} style={styles.button}>
          {loading ? (
            <ThreeDots />
          ) : (
            <Image style={styles.searchIco} source={search} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bar} />
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          color={isDark ? "#fff" : "#000"}
        />
      )}
    </View>
  );
};

export default SearchBar;

const stylesDark = StyleSheet.create({
  bar: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    marginBottom: -10,
  },
  input: {
    height: 40,
    width: DeviceWidth - 110,
    color: "#fff",
    marginLeft: -10,
    marginRight: 10,
  },
  button: {
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIco: {
    width: 17,
    height: 17,
  },
  line: {
    width: 2,
    height: 25,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
});

const stylesLight = StyleSheet.create({
  bar: {
    height: 1,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 5,
  },
  text: {
    color: "#000",
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: DeviceWidth - 110,
    color: "#000",
    paddingHorizontal: 10,
  },
  button: {
    width: 30,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIco: {
    width: 17,
    height: 17,
  },
  line: {
    width: 2,
    height: 25,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
});
