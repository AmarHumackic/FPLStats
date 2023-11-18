import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  contentContainer: ViewStyle;
  itemHeaderContainer: ViewStyle;
  headerText: TextStyle;
  itemCollapsibleContainer: ViewStyle;
  text: TextStyle;
  textBold: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    backgroundColor: colors.backgroundPrimary,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  itemHeaderContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerText: {
    flex: 1,
    fontSize: sizes.l,
    fontWeight: '600',
    color: colors.accentDark,
    letterSpacing: 0.2,
    paddingVertical: 2.5,
  },
  itemCollapsibleContainer: {
    paddingHorizontal: 16,
  },
  text: {
    color: colors.textDark1,
    letterSpacing: 0.2,
    paddingVertical: 2.5,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
