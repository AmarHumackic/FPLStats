import {colors, sizes} from '@constants/';
import {TextStyle, StyleSheet, ViewStyle} from 'react-native';

interface Style {
  containerAbsolute: ViewStyle;
  containerRelative: ViewStyle;
  contentContainer: ViewStyle;
  title: TextStyle;
  loadingDescriptionContainer: ViewStyle;
  description: TextStyle;
}

export default StyleSheet.create<Style>({
  containerAbsolute: {
    backgroundColor: colors.backgroundPrimary,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  containerRelative: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    backgroundColor: colors.purePrimary,
    elevation: 2,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    maxWidth: '80%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: sizes.xxl,
    paddingBottom: 16,
    color: colors.accentDark,
  },
  loadingDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    fontSize: sizes.m,
    paddingLeft: 10,
    color: colors.accentDark,
  },
});
