import {colors, sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  text: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.black,
    marginBottom: 4,
    zIndex: 1,
  },
  text: {
    fontSize: sizes.s,
    lineHeight: 14,
    color: colors.purePrimary,
    fontWeight: 'bold',
  },
});
