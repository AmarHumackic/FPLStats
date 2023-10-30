import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  dateContainer: ViewStyle;
  date: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {},
  dateContainer: {
    backgroundColor: colors.purePrimary,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: sizes.marginHorizontal - 6,
    marginVertical: 10,
  },
  date: {
    fontWeight: 'bold',
    color: colors.accentDark,
    letterSpacing: 0.2,
  },
});
