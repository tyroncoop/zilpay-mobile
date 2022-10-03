import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  Image,
  Linking,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import back from '../../assets/img/chevron-left.png';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {
  showMenu: boolean;
  setShowMenu: any;
  showConnect: any;
  showGetStarted: any;
};

const Menu: React.FC<Props> = ({
  showMenu,
  setShowMenu,
  showConnect,
  showGetStarted,
}) => {
  const {t} = useTranslation();
  const [child, setChild] = useState(false);
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  const showModal = (type: string) => {
    setShowMenu(false);
    if (type === 'connect') {
      showConnect(true);
    } else if (type === 'getStarted') {
      showGetStarted(true);
    }
  };

  return (
    <Modal transparent visible={showMenu}>
      <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
        <View style={styles.modalWrapper}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.btnBack}
                onPress={() => setShowMenu(false)}
              >
                <Image style={styles.btnBack} source={back} />
              </TouchableOpacity>
              <View style={styles.menuListWrapper}>
                <TouchableOpacity onPress={() => showModal('getStarted')}>
                  <Text style={styles.menuListTitle}>{t('GET_STARTED')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setChild(!child)}
                  style={styles.wrapperSsiProtocol}
                >
                  <Text
                    style={
                      child ? styles.menuListTitleActive : styles.menuListTitle
                    }
                  >
                    {t('SSI_PROTOCOL')}
                  </Text>
                  {child ? (
                    <Text style={styles.minusIco}>-</Text>
                  ) : (
                    <Text style={styles.plusIco}>+</Text>
                  )}
                </TouchableOpacity>
                {child && (
                  <View style={styles.menuChildWrapper}>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://www.ssiprotocol.com/#/about')
                      }
                    >
                      <Text style={styles.menuChildTitle}>{t('ABOUT')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://www.ssiprotocol.com/#/contact')
                      }
                    >
                      <Text style={styles.menuChildTitle}>{t('CONTACT')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL('https://www.ssiprotocol.com/#/wallets')
                      }
                    >
                      <Text style={styles.menuChildTitle}>
                        {t('DIDXWALLET')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://ssiprotocol.notion.site/TYRON-Whitepaper-5ca16fc254b343fb90cfeb725cbfa2c3',
                        )
                      }
                    >
                      <Text style={styles.menuChildTitle}>
                        {t('WHITEPAPER')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://ssiprotocol.notion.site/Frequently-Asked-Questions-4887d24a3b314fda8ff9e3c6c46def30',
                    )
                  }
                >
                  <Text style={styles.menuListTitle}>{t('FAQ')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Menu;

const stylesDark = StyleSheet.create({
  modalWrapper: {
    flex: 1,
  },
  modalView: {
    width: deviceWidth - (deviceWidth * 30) / 100,
    height: deviceHeight,
    alignSelf: 'flex-start',
    padding: 15,
    paddingRight: 0,
    backgroundColor: '#ffffff2e',
    paddingTop: Platform.OS === 'ios' ? 70 : 15,
    borderRightWidth: 1,
    borderRightColor: 'silver',
  },
  btnBack: {
    width: 25,
    height: 25,
  },
  menuListWrapper: {
    marginTop: 50,
    marginLeft: 35,
  },
  menuListTitle: {
    color: '#fff',
    fontSize: 20,
    marginVertical: 15,
  },
  menuListTitleActive: {
    color: 'yellow',
    fontSize: 20,
    marginVertical: 15,
  },
  menuChildWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  menuChildTitle: {
    color: '#fff',
    fontSize: 17,
    marginVertical: 10,
  },
  wrapperSsiProtocol: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  plusIco: {
    fontSize: 20,
    color: '#fff',
    marginTop: -5,
  },
  minusIco: {
    fontSize: 20,
    color: '#ffff32',
    marginTop: -5,
  },
});

const stylesLight = StyleSheet.create({
  modalWrapper: {
    flex: 1,
  },
  modalView: {
    width: deviceWidth - (deviceWidth * 30) / 100,
    height: deviceHeight,
    alignSelf: 'flex-start',
    padding: 15,
    paddingRight: 0,
    backgroundColor: '#ffffff2e',
    paddingTop: Platform.OS === 'ios' ? 70 : 15,
    borderRightWidth: 1,
    borderRightColor: 'silver',
  },
  btnBack: {
    width: 25,
    height: 25,
  },
  menuListWrapper: {
    marginTop: 50,
    marginLeft: 35,
  },
  menuListTitle: {
    color: '#000',
    fontSize: 20,
    marginVertical: 15,
  },
  menuListTitleActive: {
    color: 'yellow',
    fontSize: 20,
    marginVertical: 15,
  },
  menuChildWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  menuChildTitle: {
    color: '#000',
    fontSize: 17,
    marginVertical: 10,
  },
  wrapperSsiProtocol: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  plusIco: {
    fontSize: 20,
    color: '#000',
    marginTop: -5,
  },
  minusIco: {
    fontSize: 20,
    color: '#ffff32',
    marginTop: -5,
  },
});
