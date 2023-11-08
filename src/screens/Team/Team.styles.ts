import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  },
  chevronContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.primary,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  eventNameLabel: {
    fontSize: sizes.xl,
    color: colors.black,
  },
  flexView: {flex: 1},
  eventTransfersContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  avgPointsContainer: {
    width: 115,
    maxWidth: '33%',
    flexDirection: 'row',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.accentDark1,
    borderRadius: 8,
    padding: 6,
  },
  pointsValue: {
    textAlign: 'center',
    fontSize: sizes.xxl,
    textAlignVertical: 'center',
    color: colors.accentDark1,
  },
  pointsLabel: {
    fontSize: sizes.ml,
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
  },
  activeChipLabel: {
    textTransform: 'uppercase',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.activeChip,
    color: colors.purePrimary,
    letterSpacing: 0.5,
  },
});
