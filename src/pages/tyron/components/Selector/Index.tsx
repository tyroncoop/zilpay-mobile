import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {Linking} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet, View, Dimensions, TextInput} from 'react-native';
import upDown from '../../assets/img/up_down_arrow.png';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {
  data: any;
  selectedData: any;
  setData: any;
};

const Selector: React.FC<Props> = ({data, selectedData, setData}) => {
  const {t} = useTranslation();
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowDropdown(!showDropdown)}
        style={styles.wrapperSelector}
      >
        <Text style={styles.txt}>
          {data.filter((val_: any) => val_.key === selectedData)[0]?.name}
        </Text>
        <Image source={upDown} />
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.optWrapper}>
          {data.map((val: any, i: number) => (
            <TouchableOpacity
              onPress={() => {
                setData(val.key);
                setShowDropdown(false);
              }}
              style={{marginVertical: 3}}
              key={i}
            >
              <Text style={{color: '#fff'}}>{val.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Selector;

const stylesDark = StyleSheet.create({
  wrapperSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  txt: {
    color: '#fff',
    marginRight: 10,
  },
  optWrapper: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
});

const stylesLight = StyleSheet.create({
  wrapperSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  txt: {
    color: '#fff',
    marginRight: 10,
  },
  optWrapper: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
});
