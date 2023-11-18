import {colors} from '@constants/colors';
import {StyleSheet, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
