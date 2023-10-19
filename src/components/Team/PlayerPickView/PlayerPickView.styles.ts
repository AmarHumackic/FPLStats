import {colors, sizes} from '@constants/';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  captain: TextStyle;
  playerImg: ImageStyle;
  textContainer: ViewStyle;
  playerName: TextStyle;
  eventPoints: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    height: 86,
  },
  captain: {
    position: 'absolute',
    top: 0,
    right: 8,
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
    maxWidth: 68,
    backgroundColor: colors.text,
    borderRadius: 4,
  },
  playerName: {
    textAlign: 'center',
    fontSize: sizes.xs11,
    color: colors.purePrimary,
  },
  eventPoints: {
    textAlign: 'center',
    fontSize: sizes.xs11,
    color: colors.purePrimary,
    marginTop: 2,
  },
});
