import {colors} from '@constants/colors';
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
  },
  activeTabText: {
    color: colors.accentDark,
    fontWeight: 'bold',
  },
});
