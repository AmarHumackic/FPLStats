import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  contentContainer: ViewStyle;
  headerLabel: TextStyle;
  itemContainer: ViewStyle;
  itemContainerSelected: ViewStyle;
  itemLabel: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizes.marginHorizontal,
    backgroundColor: colors.accentDark,
  },
  contentContainer: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '90%',
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  headerLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    height: 32,
    justifyContent: 'center',
    backgroundColor: colors.accentLight,
    marginBottom: 5,
    paddingHorizontal: 6,
    borderRadius: 8,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
  },
  itemContainerSelected: {
    borderWidth: 2,
    borderColor: colors.text,
  },
  itemLabel: {
    fontSize: sizes.ml,
  },
});
