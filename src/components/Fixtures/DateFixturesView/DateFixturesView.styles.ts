import {colors} from '@constants/';
import {sizes} from '@constants/';
import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  dateContainer: ViewStyle;
  date: TextStyle;
  itemContainer: ViewStyle;
  itemLeftContainer: ViewStyle;
  itemRightContainer: ViewStyle;
  logoImg: ImageStyle;
  teamName: TextStyle;
  textRight: TextStyle;
  textLeft: TextStyle;
  scores: TextStyle;
  scoresFinished: TextStyle;
  time: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {},
  dateContainer: {
    backgroundColor: colors.purePrimary,
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: sizes.marginHorizontal - 6,
    marginVertical: 10,
  },
  date: {
    fontWeight: 'bold',
    color: colors.accentDark,
    letterSpacing: 0.2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  itemLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 5,
  },
  itemRightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  logoImg: {
    width: 40,
    height: 40,
  },
  teamName: {
    flex: 1,
    color: colors.textLight1,
    fontSize: sizes.ml,
    fontWeight: 'bold',
    letterSpacing: 0.2,
    paddingHorizontal: 5,
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  scores: {
    borderWidth: 1,
    borderColor: colors.accentDark,
    borderRadius: 4,
    overflow: 'hidden',
    color: colors.accentDark1,
    fontSize: sizes.ml,
    fontWeight: 'bold',
    paddingVertical: 4,
    textAlign: 'center',
    width: 52,
  },
  scoresFinished: {
    backgroundColor: colors.primary,
  },
  time: {
    borderWidth: 1,
    borderColor: colors.textDark1,
    borderRadius: 4,
    color: colors.textDark2,
    fontSize: sizes.ml,
    fontWeight: 'bold',
    paddingVertical: 4,
    textAlign: 'center',
    width: 52,
  },
});
