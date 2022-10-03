import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import tyronLogo from '../../assets/img/tyron_logo.png';
import upDown from '../../assets/img/up_down_arrow.png';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import { tyronLang } from 'app/lib/controller/tyron/lang';

export type Props = {
  navigation: any;
};

const Footer: React.FC<Props> = ({navigation}) => {
  // const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const language = tyronLang.useValue()
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  const navigate = (type: string) => {
    navigation.navigate('Scan', {type});
  };

  const changeLanguage = (value: string) => {
    setShowDropdown(false);
    i18n
      .changeLanguage(value)
      .then(() => tyronLang.set(value))
      .catch(err => console.log(err));
  };

  const langDropdown = [
    {
      key: 'en',
      name: '🇬🇧 English',
    },
    {
      key: 'es',
      name: '🇪🇸 Spanish',
    },
    {
      key: 'cn',
      name: '🇨🇳 Chinese',
    },
    {
      key: 'id',
      name: '🇮🇩 Indonesian',
    },
    {
      key: 'ru',
      name: '🇷🇺 Russian',
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View>
        <TouchableOpacity
          onPress={() => navigate('zilpay')}
          style={styles.button}
        >
          <Text style={styles.buttonTxt}>SCAN</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <TouchableOpacity
          onPress={() => setShowDropdown(!showDropdown)}
          style={styles.langSelector}
        >
          <Text style={styles.langTxt}>
            {langDropdown.filter(val_ => val_.key === language)[0]?.name}
          </Text>
          <Image source={upDown} />
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.langOptWrapper}>
            {langDropdown.map((val, i) => (
              <TouchableOpacity
                onPress={() => changeLanguage(val.key)}
                style={{marginVertical: 3}}
                key={i}
              >
                <Text style={{color: '#fff'}}>{val.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL('http://tyron.network/ssiprotocol/tree')}
      >
        <Image source={tyronLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const stylesDark = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 5,
  },
  buttonTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  langSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
  },
  langTxt: {
    color: '#fff',
    marginRight: 10,
  },
  langOptWrapper: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
});

const stylesLight = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 5,
  },
  buttonTxt: {
    color: '#000',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  langSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    alignSelf: 'flex-start',
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
  },
  langTxt: {
    color: '#000',
    marginRight: 10,
  },
  langOptWrapper: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
});
