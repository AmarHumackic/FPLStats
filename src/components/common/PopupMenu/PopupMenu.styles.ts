import {colors, sizes} from '@constants/';
import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Style {
  container: ViewStyle;
  childrenContainer: ViewStyle;
  dropdownContainer: ViewStyle;
  dropdownHeader: ViewStyle;
  dropdownListContainer: ViewStyle;
  dropdownListItem: ViewStyle;
  dropdownListItemSmall: ViewStyle;
  dropdownListIcon: ViewStyle;
  dropdownItemLabel: TextStyle;
  dropdownItemLabelSmall: TextStyle;

  closeView: ViewStyle;
}

const {width, height} = Dimensions.get('window');

export default StyleSheet.create<Style>({
  container: {},
  childrenContainer: {
    padding: 6,
    marginTop: -10,
    marginHorizontal: 2,
  },
  dropdownContainer: {
    position: 'absolute',
    right: 0,
    height,
    width: width - 30,
  },
  dropdownHeader: {
    flexDirection: 'row',
  },
  dropdownListContainer: {
    backgroundColor: colors.purePrimary,
    maxWidth: '65%',
    minWidth: 180,
    paddingRight: 6,
    alignSelf: 'flex-end',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 8,
  },
  dropdownListItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    overflow: 'hidden',
  },
  dropdownListItemSmall: {
    paddingLeft: 6,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 38,
    overflow: 'hidden',
  },
  dropdownListIcon: {
    flexDirection: 'row',
    width: 24,
    justifyContent: 'center',
  },
  dropdownItemLabel: {
    // fontFamily: fonts.LatoRegular,
    fontSize: sizes.sm,
    fontWeight: 'normal',
    lineHeight: 16,
    letterSpacing: 0.1,
    color: colors.textDark1,
    marginLeft: 8,
    marginRight: 19,
  },
  dropdownItemLabelSmall: {
    // fontFamily: fonts.LatoRegular,
    fontSize: sizes.s,
    fontWeight: 'normal',
    lineHeight: 14.4,
    letterSpacing: 0.1,
    color: colors.textDark1,
    marginLeft: 6,
  },

  closeView: {
    flex: 1,
  },
});
