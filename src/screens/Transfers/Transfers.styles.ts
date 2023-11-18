import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  itemContainer: ViewStyle;
  itemContainerSeparator: ViewStyle;
  headerContainer: ViewStyle;
  column1Container: ViewStyle;
  column2Container: ViewStyle;
  column3Container: ViewStyle;
  column4Container: ViewStyle;
  text: TextStyle;
  textBold: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.marginHorizontal - 6,
    paddingVertical: 6,
    backgroundColor: colors.backgroundPrimary,
  },
  itemContainerSeparator: {
    borderBottomWidth: 0.25,
    borderBottomColor: colors.textLight2,
  },
  headerContainer: {
    backgroundColor: colors.accentDark,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.backgroundPrimary,
  },
  column1Container: {
    width: 55,
  },
  column2Container: {
    flex: 1,
    marginLeft: 2,
  },
  column3Container: {
    flex: 1,
    marginLeft: 2,
  },
  column4Container: {
    width: 26,
    marginLeft: 2,
  },
  text: {
    color: colors.textDark2,
    letterSpacing: 0.2,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
