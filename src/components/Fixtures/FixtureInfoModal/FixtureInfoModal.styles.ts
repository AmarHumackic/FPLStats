import {colors} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  headerTitle: TextStyle;
  contentContainer: ViewStyle;
}

export default StyleSheet.create<Props>({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    maxHeight: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    borderRadius: 16,
  },
  headerTitle: {
    textAlign: 'center',
    color: colors.textLight1,
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});
