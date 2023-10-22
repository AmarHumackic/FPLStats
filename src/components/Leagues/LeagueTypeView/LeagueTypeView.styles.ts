import {colors} from '@constants/colors';
import {sizes} from '@constants/sizes';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerContainer: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
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
  titleContainer: {
    backgroundColor: colors.purePrimary,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: sizes.marginHorizontal - 6,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    color: colors.accentDark,
    letterSpacing: 0.2,
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
    borderBottomWidth: 0.5,
    borderBottomColor: colors.text,
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
