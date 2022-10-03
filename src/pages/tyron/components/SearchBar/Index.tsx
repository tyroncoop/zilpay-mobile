import React, {useState} from 'react';
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
} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {updateDoc, updateDomain, updateName} from '../../redux/actions/user';
import search from '../../assets/img/search.png';
import * as tyron from '../../../../../node_modules/tyron';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import { userDoc, userDomain, userName } from 'app/lib/controller/tyron/user';

const DeviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const SearchBar: React.FC<Props> = ({navigation}) => {
  // const dispatch = useDispatch();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const isDark = tyronThemeDark.useValue()

  const styles = isDark ? stylesDark : stylesLight;
  const net = 'testnet';

  const resolveDid = () => {
    let name = searchInput;
    let domain = '';
    if (searchInput.includes('@')) {
      const [username = '', domain_ = ''] = searchInput.split('@');
      name = username;
      domain = domain_.replace('.did', '');
    }
    setLoading(true);
    if (tyron.SearchBarUtil.default.isValidUsername(name)) {
      tyron.SearchBarUtil.default
        .fetchAddr(net, name, domain)
        .then((address: string) => {
          if (name === 'xpoints') {
            setLoading(false);
            navigation.navigate('XPoints');
          } else {
            if (domain === '' || domain === 'did') {
              tyron.SearchBarUtil.default
                .Resolve(net, address)
                .then((res: any) => {
                  setSearchInput('');
                  userDoc.set(res)
                  userName.set(name)
                  userDomain.set(domain)
                  setLoading(false);
                  navigation.navigate('Services');
                })
                .catch((err: any) => {
                  setLoading(false);
                  Alert.alert(JSON.stringify(err));
                });
            } else {
              userName.set(name)
              userDomain.set(domain)
              setLoading(false);
              setSearchInput('');
              navigation.navigate('Stake');
            }
          }
        })
        .catch(() => {
          setLoading(false);
          Alert.alert('Username available to buy');
        });
    } else {
      setLoading(false);
      Alert.alert('Invalid username');
    }
  };

  return (
    <View>
      <Text style={styles.text}>{t('SEARCH_NFT')}</Text>
      <View style={styles.bar} />
      <View style={styles.contentWrapper}>
        <TextInput
          style={styles.input}
          value={searchInput}
          onChangeText={(text: string) => setSearchInput(text.toLowerCase())}
        />
        <View style={styles.line} />
        <TouchableOpacity onPress={resolveDid} style={styles.button}>
          <Image style={styles.searchIco} source={search} />
        </TouchableOpacity>
      </View>
      <View style={styles.bar} />
      {loading && (
        <ActivityIndicator
          style={{marginTop: 50}}
          color={isDark ? '#fff' : '#000'}
        />
      )}
    </View>
  );
};

export default SearchBar;

const stylesDark = StyleSheet.create({
  bar: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: DeviceWidth - 110,
    color: '#fff',
    marginLeft: -10,
    marginRight: 10,
  },
  button: {
    width: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIco: {
    width: 17,
    height: 17,
  },
  line: {
    width: 2,
    height: 25,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
});

const stylesLight = StyleSheet.create({
  bar: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: DeviceWidth - 110,
    color: '#000',
    paddingHorizontal: 10,
  },
  button: {
    width: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIco: {
    width: 17,
    height: 17,
  },
  line: {
    width: 2,
    height: 25,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
});
