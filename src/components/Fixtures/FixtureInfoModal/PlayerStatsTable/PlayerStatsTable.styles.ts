import {colors, sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  tabContainer: ViewStyle;
  tabItemContainer: ViewStyle;
  scrollContentContainer: ViewStyle;
  headerContainer: ViewStyle;
  headerTouchableContainer: ViewStyle;
  headerText: TextStyle;
  rowContainer: ViewStyle;
  rowText: TextStyle;
}

export default StyleSheet.create<Props>({
  tabContainer: {
    margin: 10,
  },
  tabItemContainer: {
    height: 26,
    marginHorizontal: 4,
    borderRadius: 16,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.accentDark,
  },
  scrollContentContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: colors.accentLight,
  },
  headerTouchableContainer: {
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: colors.textDark2,
    fontSize: sizes.sm,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  rowContainer: {
    flexDirection: 'row',
    height: 30,
  },
  rowText: {
    textAlign: 'center',
    color: colors.textDark1,
    fontSize: sizes.sm,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
