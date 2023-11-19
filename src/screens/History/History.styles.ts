import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  scrollContentContainer: ViewStyle;
  itemContainer: ViewStyle;
  text: TextStyle;
  textBold: TextStyle;
  textChip: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContentContainer: {
    paddingTop: 16,
  },
  itemContainer: {
    backgroundColor: colors.purePrimary,
    marginBottom: 16,
    marginHorizontal: sizes.marginHorizontal,
    borderRadius: 8,
    padding: 8,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.4,
    shadowColor: colors.accentDark,
    elevation: 2,
  },
  text: {
    color: colors.textDark1,
    letterSpacing: 0.2,
    paddingVertical: 2.5,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textChip: {
    color: colors.text,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
