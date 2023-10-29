import {colors} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  contentContainer: ViewStyle;
  headerTitle: TextStyle;
}

export default StyleSheet.create<Props>({
  contentContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    maxHeight: '90%',
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
});
