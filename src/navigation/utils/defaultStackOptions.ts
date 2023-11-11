import {colors} from '@constants/colors';
import {StackNavigationOptions} from '@react-navigation/stack';

export const defaultStackOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.backgroundPrimary,
  },
  headerTintColor: colors.accentDark,
  headerBackTitleVisible: false,
};
