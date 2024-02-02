import {colors} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerTitle: TextStyle;
  //   scrollContentContainer: ViewStyle;
  //   identifierContainer: ViewStyle;
  //   hContainer: ViewStyle;
  //   separator: ViewStyle;
  //   aContainer: ViewStyle;
  //   elementContainer: ViewStyle;
  //   elementName: TextStyle;
  //   elementValue: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '80%',
    alignSelf: 'center',
    paddingTop: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.textLight1,
    fontWeight: '500',
  },
  //   scrollContentContainer: {
  //     paddingTop: 5,
  //     paddingBottom: 10,
  //   },
  //   identifierContainer: {
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     paddingVertical: 2,
  //   },
  //   hContainer: {
  //     flex: 1,
  //     alignItems: 'flex-end',
  //   },
  //   separator: {
  //     width: 1,
  //     backgroundColor: colors.textLight2,
  //     marginHorizontal: 5,
  //   },
  //   aContainer: {
  //     flex: 1,
  //     alignItems: 'flex-start',
  //   },
  //   elementContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     paddingVertical: 3,
  //   },
  //   elementName: {
  //     color: colors.textDark2,
  //     letterSpacing: 0.2,
  //   },
  //   elementValue: {
  //     color: colors.text,
  //     fontWeight: 'bold',
  //     letterSpacing: 0.2,
  //   },
});
