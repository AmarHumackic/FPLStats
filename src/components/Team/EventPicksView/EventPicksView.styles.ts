import {StyleSheet, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  soccerFieldContainer: ViewStyle;
  rowContainer: ViewStyle;
  benchContainer: ViewStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  soccerFieldContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
  benchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 120,
  },
});
