import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Headline from '../../../../components/Headline/Index';
import DIDLayout from '../../../../components/Layout/DID/Index';
import replaceIco from '../../../../assets/img/retweet.png';
import trashIco from '../../../../assets/img/trash.png';
import arrowDownIco from '../../../../assets/img/arrow_down_icon.png';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import { userDoc } from 'app/lib/controller/tyron/user';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Crud: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Crud;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const doc = userDoc.useValue()

  const items = [
    {label: t('Select document element'), value: ''},
    {label: t('KEYS'), value: 'keys'},
    {label: t('SOCIAL TREE'), value: 'social'},
  ];

  const dataHeadline = [
    {
      route: 'Wallet',
      name: t('Wallet'),
    },
    {
      route: 'Crud',
      name: t('DID OPERATIONS'),
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={dataHeadline} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderWrapper}>
          <Text style={styles.txtHeader}>{t('DID UPDATE')}</Text>
          <Text style={styles.subTxtHeader}>
            {t(
              'WITH THIS TRANSACTION, YOU WILL UPLOAD A BRAND NEW DID DOCUMENT',
            )}
          </Text>
        </View>
        <View>
          <View style={styles.picker}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              multiple={false}
              setOpen={setOpen}
              setValue={setValue}
              placeholder=""
              placeholderStyle={styles.txt}
              theme="DARK"
              style={{backgroundColor: 'transparent', borderColor: '#fff'}}
            />
          </View>
          <View>
            {doc?.doc.map((val: any, i: number) => {
              if (
                val[0] !== 'DID services' &&
                val[0] !== 'Decentralized identifier' &&
                value === 'keys'
              ) {
                return (
                  <View style={styles.keyWrapper}>
                    <Text style={styles.keyTitle}>
                      {t(val[0].toUpperCase())}
                    </Text>
                    <Text style={styles.keySubTitle}>
                      {val[1][0].slice(0, 17)}...
                    </Text>
                    <Image style={styles.icoReplace} source={replaceIco} />
                  </View>
                );
              } else if (val[0] === 'DID services' && value === 'social') {
                return (
                  <>
                    {val[1].map((val: any, i: number) => (
                      <View style={styles.keyWrapper}>
                        <Text style={styles.keyTitle}>
                          {val[1][0].split('#')[0]}
                        </Text>
                        <Text style={styles.keySubTitle}>{val[1][1]}</Text>
                        <View style={styles.treeFooterIco}>
                          <Image
                            style={styles.icoReplace}
                            source={replaceIco}
                          />
                          <View style={{marginTop: 20}}>
                            <View style={styles.slider} />
                            <Image
                              style={styles.icoReplace}
                              source={trashIco}
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                    <View style={styles.newLink}>
                      <Text style={styles.txt}>{t('COMMON LINKS')}</Text>
                      <View style={styles.dropDownNewLink}>
                        <Text style={{marginRight: 15, ...styles.txt}}>
                          {t('Add new links')}
                        </Text>
                        <Image source={arrowDownIco} />
                      </View>
                    </View>
                    <TouchableOpacity style={styles.btnCreate}>
                      <Text style={{color: '#fff'}}>
                        {t('CREATE NEW LINK')}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    marginBottom: 100,
  },
  txtHeader: {
    fontSize: 20,
    color: '#dbe4eb',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 13,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  picker: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    alignSelf: 'center',
    marginVertical: 20,
    zIndex: 2,
  },
  icoReplace: {
    marginTop: 10,
  },
  keyWrapper: {
    padding: 20,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginVertical: 10,
    width: deviceWidth * 0.6,
    alignSelf: 'center',
  },
  keyTitle: {
    color: '#fff',
    fontSize: 17,
  },
  keySubTitle: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 17,
  },
  treeFooterIco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  slider: {
    height: 5,
    width: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    marginBottom: -25,
  },
  newLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  dropDownNewLink: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  btnCreate: {
    width: 180,
    backgroundColor: 'rgba(255,255,255,.2)',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  txt: {
    color: '#fff',
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginBottom: 100,
  },
  txtHeader: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 13,
    color: '#000',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  picker: {
    color: '#000',
    width: deviceWidth * 0.6 + 25,
    alignSelf: 'center',
    marginVertical: 20,
    zIndex: 2,
  },
  icoReplace: {
    marginTop: 10,
  },
  keyWrapper: {
    padding: 20,
    backgroundColor: '#333333',
    borderRadius: 5,
    marginVertical: 10,
    width: deviceWidth * 0.6,
    alignSelf: 'center',
  },
  keyTitle: {
    color: '#fff',
    fontSize: 17,
  },
  keySubTitle: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 17,
  },
  treeFooterIco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  slider: {
    height: 5,
    width: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    marginBottom: -25,
  },
  newLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  dropDownNewLink: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  btnCreate: {
    width: 180,
    backgroundColor: 'rgba(255,255,255,.2)',
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  txt: {
    color: '#000',
  },
});
