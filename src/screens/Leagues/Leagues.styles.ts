import {colors} from '@constants/colors';
import {StyleSheet, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  scrollContentContainer: ViewStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContentContainer: {
    paddingBottom: 24,
  },
});
