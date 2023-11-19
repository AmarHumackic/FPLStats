import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerContainer: ViewStyle;
  chevronContainer: ViewStyle;
  eventNameLabel: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  chevronContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.text,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  eventNameLabel: {
    fontSize: sizes.l,
    letterSpacing: 0.3,
    color: colors.textDark3,
  },
});
