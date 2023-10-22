import {colors, sizes} from '@constants/';
import {isAndroid} from '@utils/isAndroid';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  containerPosHeight: ViewStyle;
  elementType: TextStyle;
  topRightContainer: ViewStyle;
  iconContainer: ViewStyle;
  captain: TextStyle;
  alertIconContainer: ViewStyle;
  playerImg: ImageStyle;
  textContainer: ViewStyle;
  playerName: TextStyle;
  eventPoints: TextStyle;
}

const ELEMENT_TYPE_HEIGHT = 18;

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    height: 86,
    maxWidth: 67,
  },
  containerPosHeight: {
    height: 86 + ELEMENT_TYPE_HEIGHT,
  },
  elementType: {
    textAlign: 'center',
    color: colors.textDark1,
    fontSize: sizes.s,
    height: ELEMENT_TYPE_HEIGHT,
  },
  topRightContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  iconContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.black,
    marginBottom: 4,
    zIndex: 1,
  },
  captain: {
    fontSize: sizes.s,
    lineHeight: 14,
    color: colors.purePrimary,
    fontWeight: 'bold',
  },
  alertIconContainer: {
    zIndex: 1,
    marginBottom: 4,
  },
  playerImg: {
    width: 38.5,
    height: 49.28,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 67,
    backgroundColor: colors.text,
    borderRadius: 4,
    paddingVertical: 2,
    zIndex: isAndroid() ? 0 : -1,
  },
  playerName: {
    flex: 1,
    textAlign: 'center',
    fontSize: sizes.xs11,
    lineHeight: 14,
    color: colors.purePrimary,
  },
  eventPoints: {
    flex: 1,
    textAlign: 'center',
    fontSize: sizes.xs11,
    color: colors.purePrimary,
    marginTop: 2,
    fontWeight: 'bold',
  },
});
