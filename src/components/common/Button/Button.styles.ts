import {colors, sizes} from '@constants/';
import {TextStyle, StyleSheet, ViewStyle} from 'react-native';

interface Style {
  containerParent: ViewStyle;
  container: ViewStyle;
  rowContainer: ViewStyle;
  iconContainer: ViewStyle;
  title: TextStyle;
}

export default StyleSheet.create<Style>({
  containerParent: {
    width: 300,
    height: 49,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    paddingRight: 8,
  },
  title: {
    // fontFamily: fonts.LatoRegular,
    fontSize: sizes.xl,
    color: colors.primary,
  },
});
