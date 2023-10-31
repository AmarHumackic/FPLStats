import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  titleContainer: ViewStyle;
  fullWidthContainer: ViewStyle;
  alignCenterContainer: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<Props>({
  titleContainer: {
    backgroundColor: colors.purePrimary,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: sizes.marginHorizontal - 6,
  },
  fullWidthContainer: {
    width: '100%',
  },
  alignCenterContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: colors.accentDark,
    letterSpacing: 0.2,
  },
});
