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
    backgroundColor: colors.backgroundPrimary,
  },
  label: {
    marginBottom: 24,
    color: colors.textDark1,
    fontWeight: 'bold',
    fontSize: sizes.l,
  },
  input: {
    width: '60%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.textLight2,
    color: colors.textDark1,
    paddingHorizontal: 10,
    fontSize: sizes.ml,
  },
});
