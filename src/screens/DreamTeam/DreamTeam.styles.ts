import {colors, sizes} from '@constants/';
import {isAndroid} from '@utils/isAndroid';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  topPlayerContainer: ViewStyle;
  topPlayerText: TextStyle;
  topPlayerRowContainer: ViewStyle;
  topPlayerLeftContainer: ViewStyle;
  topPlayerImg: ImageStyle;
  topPlayerName: TextStyle;
  topPlayerCenterContainer: ViewStyle;
  topPlayerInfoText: TextStyle;
  topPlayerRightContainer: ViewStyle;
  topPlayerPointsValue: TextStyle;
  topPlayerPointsLabel: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  topPlayerContainer: {
    height: 120,
    paddingVertical: 5,
  },
  topPlayerText: {
    textAlign: 'center',
    fontSize: sizes.l,
    color: colors.accentDark1,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  topPlayerRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topPlayerLeftContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  topPlayerImg: {
    width: 50.05,
    height: 64.06,
    alignSelf: 'center',
  },
  topPlayerName: {
    fontWeight: 'bold',
    fontSize: sizes.ml,
    color: colors.textDark3,
    marginTop: isAndroid() ? 2 : 5,
  },
  topPlayerCenterContainer: {
    flex: 1,
    height: '100%',
    marginTop: isAndroid() ? 8 : 14,
  },
  topPlayerInfoText: {
    fontSize: sizes.m,
    paddingLeft: 15,
    marginTop: 1,
    color: colors.textDark3,
    fontWeight: '500',
  },
  topPlayerRightContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  topPlayerPointsValue: {
    fontSize: sizes.xxxl,
    color: colors.accentDark,
    fontWeight: '700',
  },
  topPlayerPointsLabel: {
    fontSize: sizes.l,
    color: colors.accentDark,
  },
});
