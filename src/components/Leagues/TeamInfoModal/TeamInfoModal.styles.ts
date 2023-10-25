import {colors} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  contentContainer: ViewStyle;
  headerTitle: TextStyle;
  centerText: TextStyle;
  rowContainer: ViewStyle;
  captainContainer: ViewStyle;
  label: TextStyle;
  labelFlex: TextStyle;
  value: TextStyle;
}

export default StyleSheet.create<Props>({
  contentContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 16,
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  headerTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.textDark2,
  },
  centerText: {
    textAlign: 'center',
    marginBottom: 10,
    color: colors.textDark2,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  captainContainer: {
    flexDirection: 'row',
    marginBottom: -2,
  },
  label: {
    flex: 0,
    color: colors.textDark1,
  },
  labelFlex: {
    flex: 1,
    color: colors.textDark1,
  },
  value: {
    color: colors.textDark1,
    fontWeight: 'bold',
  },
});
