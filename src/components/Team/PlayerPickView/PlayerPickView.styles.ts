import {colors, sizes} from '@constants/';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  captainContainer: ViewStyle;
  captain: TextStyle;
  starContainer: ViewStyle;
  playerImg: ImageStyle;
  textContainer: ViewStyle;
  playerName: TextStyle;
  eventPoints: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    height: 86,
    maxWidth: 67,
  },
  captainContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.black,
  },
  captain: {
    fontSize: sizes.s,
    lineHeight: 14,
    color: colors.purePrimary,
    fontWeight: 'bold',
  },
  starContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 16,
    height: 16,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.black,
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
