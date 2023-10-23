import {colors} from '@constants/colors';
import {StackNavigationOptions} from '@react-navigation/stack';

export const defaultStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.accentDark,
  headerBackTitleVisible: false,
};
