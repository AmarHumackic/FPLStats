import {colors} from '@constants/';
import {sizes} from '@constants/';
import {isAndroid} from '@utils/isAndroid';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  upperContainer: ViewStyle;
  teamNameLabel: TextStyle;
  playerNameLabel: TextStyle;
  eventSwitchContainer: ViewStyle;
  chevronContainer: ViewStyle;
  eventNameLabel: TextStyle;
  flexView: ViewStyle;
  eventTransfersContainer: ViewStyle;
  eventTransfers: TextStyle;
  pointsContainer: ViewStyle;
  oneThirdView: ViewStyle;
  overallViewContainer: ViewStyle;
  overallViewText: TextStyle;
  avgPointsContainer: ViewStyle;
  pointsValue: TextStyle;
  pointsLabel: TextStyle;
  currentPointsContainer: ViewStyle;
  currentPointsValue: TextStyle;
  currentPointsLabel: TextStyle;
  activeChipContainer: ViewStyle;
  activeChipLabel: TextStyle;
}

export default StyleSheet.create<Props>({
  upperContainer: {},
  teamNameLabel: {
    fontSize: sizes.xl,
    color: colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  playerNameLabel: {
    fontSize: sizes.xl,
    color: colors.text,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  eventSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
  },
  chevronContainer: {
    backgroundColor: colors.text,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  eventNameLabel: {
    fontSize: sizes.l,
    letterSpacing: 0.3,
    color: colors.textDark3,
    marginHorizontal: 10,
  },
  flexView: {flex: 1},
  eventTransfersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  eventTransfers: {
    fontSize: sizes.l,
    fontWeight: 'bold',
    color: colors.accentDark1,
    marginLeft: 2,
  },
  pointsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  oneThirdView: {
    width: 115,
    height: 36,
    maxWidth: '33%',
  },
  overallViewContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  overallViewText: {
    fontSize: sizes.ml,
    lineHeight: 18.8,
    letterSpacing: 0.3,
    fontWeight: '500',
    marginRight: -2,
    color: colors.accentDark2,
  },
  avgPointsContainer: {
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.accentDark1,
    borderRadius: 8,
    padding: 6,
  },
  pointsValue: {
    textAlign: 'center',
    fontSize: sizes.xxl,
    lineHeight: 25,
    textAlignVertical: 'center',
    color: colors.accentDark1,
  },
  pointsLabel: {
    fontSize: sizes.ml,
    lineHeight: isAndroid() ? 22 : 24,
    color: colors.accentDark1,
  },
  currentPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    marginTop: 8,
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  currentPointsValue: {
    textAlign: 'center',
    fontSize: sizes.title,
    textAlignVertical: 'center',
    color: colors.purePrimary,
  },
  currentPointsLabel: {
    fontSize: sizes.xl,
    color: colors.purePrimary,
  },
  activeChipContainer: {
    marginTop: 10,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    backgroundColor: colors.text,
    borderRadius: 4,
  },
  activeChipLabel: {
    textTransform: 'uppercase',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: sizes.sm,
    lineHeight: 15,
    color: colors.purePrimary,
    letterSpacing: 0.5,
  },
});
