import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  tabContainer: ViewStyle;
  activeTabContainer: ViewStyle;
  tabText: TextStyle;
  activeTabText: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.primary,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabContainer: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text,
    fontSize: sizes.m,
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: colors.accentDark,
    fontSize: sizes.ml,
    fontWeight: 'bold',
  },
});
