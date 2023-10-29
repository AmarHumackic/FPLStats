import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  itemContainer: ViewStyle;
  itemContainerSession: ViewStyle;
  rankContainer: ViewStyle;
  rank: TextStyle;
  teamContainer: ViewStyle;
  teamName: TextStyle;
  playerName: TextStyle;
  gwPoints: TextStyle;
  totalPoints: TextStyle;
  headerContainer: ViewStyle;
  headerText: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.marginHorizontal - 6,
    paddingVertical: 6,
    backgroundColor: colors.accentLight,
  },
  itemContainerSession: {
    backgroundColor: colors.highlight,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  rank: {
    color: colors.textDark2,
    letterSpacing: 0.2,
    marginRight: 4,
  },
  teamContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  teamName: {
    fontWeight: 'bold',
    color: colors.textDark2,
    letterSpacing: 0.2,
  },
  playerName: {
    color: colors.textDark2,
    letterSpacing: 0.2,
  },
  gwPoints: {
    color: colors.textDark2,
    letterSpacing: 0.2,
    marginLeft: 10,
    marginRight: 20,
    width: 30,
  },
  totalPoints: {
    color: colors.textDark2,
    letterSpacing: 0.2,
    width: 45,
  },
  headerContainer: {
    backgroundColor: colors.highlight,
  },
  headerText: {
    fontWeight: 'bold',
  },
});
