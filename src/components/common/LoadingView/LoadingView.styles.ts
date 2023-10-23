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
    backgroundColor: colors.loadingBackground,
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
    backgroundColor: colors.primary,
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
    color: colors.textDark2,
  },
  loadingDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  description: {
    fontSize: sizes.m,
    paddingLeft: 10,
    color: colors.text,
  },
});
