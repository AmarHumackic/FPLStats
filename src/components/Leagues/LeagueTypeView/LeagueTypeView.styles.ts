import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerContainer: ViewStyle;
  headerRank: TextStyle;
  itemContainer: ViewStyle;
  itemContainerSeparator: ViewStyle;
  name: TextStyle;
  rankContainer: ViewStyle;
  rank: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRank: {
    marginRight: sizes.marginHorizontal,
    fontWeight: 'bold',
    color: colors.textDark2,
    width: 90 - 16 - 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.marginHorizontal,
    paddingVertical: 6,
  },
  itemContainerSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textLight2,
  },
  name: {
    fontWeight: 'bold',
    color: colors.textDark2,
    letterSpacing: 0.2,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 90,
  },
  rank: {
    color: colors.textDark2,
    letterSpacing: 0.2,
    marginLeft: 8,
  },
});
