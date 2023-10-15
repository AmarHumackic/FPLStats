import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  label: TextStyle;
  input: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.marginHorizontal,
    backgroundColor: colors.accentDark,
  },
  label: {
    marginBottom: 24,
    color: colors.text,
    fontWeight: 'bold',
    fontSize: sizes.l,
  },
  input: {
    width: '60%',
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.accentLight,
    color: colors.text,
    paddingHorizontal: 10,
    fontSize: sizes.ml,
  },
});
