import {colors} from '@constants/';
import {sizes} from '@constants/';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Props {
  container: ViewStyle;
  eventSwitchContainer: ViewStyle;
  chevronContainer: ViewStyle;
  eventNameLabel: TextStyle;
  pointsContainer: ViewStyle;
  pointsValue: TextStyle;
  pointsLabel: TextStyle;
}

export default StyleSheet.create<Props>({
  container: {
    flex: 1,
    backgroundColor: colors.accentLight,
  },
  eventSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  chevronContainer: {
    marginHorizontal: 16,
    backgroundColor: colors.primary,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  eventNameLabel: {
    fontSize: sizes.xl,
    color: colors.black,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 6,
    marginTop: 8,
    backgroundColor: colors.accentDark,
    borderRadius: 8,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
  },
  pointsValue: {
    textAlign: 'center',
    fontSize: sizes.title,
    textAlignVertical: 'center',
    color: colors.purePrimary,
  },
  pointsLabel: {
    fontSize: sizes.xl,
    color: colors.purePrimary,
  },
});
