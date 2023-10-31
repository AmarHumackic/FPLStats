import {colors} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerTitle: TextStyle;
  identifierContainer: ViewStyle;
  hContainer: ViewStyle;
  separator: ViewStyle;
  aContainer: ViewStyle;
  elementContainer: ViewStyle;
  elementName: TextStyle;
  elementValue: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    maxHeight: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    borderRadius: 16,
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.textLight1,
    fontWeight: '500',
  },
  identifierContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  hContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  separator: {
    width: 1,
    backgroundColor: colors.textLight2,
    marginHorizontal: 5,
  },
  aContainer: {
    flex: 1,
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 1,
  },
  elementName: {
    color: colors.textDark2,
    letterSpacing: 0.2,
  },
  elementValue: {
    color: colors.text,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
});
