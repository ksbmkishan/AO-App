import { normalize } from "../config/constants";
import { colors } from "../config/Constants1";

export const Colors = {
  primaryDark: '#D56A14',
  primaryLight: '#D56A14',
  white: '#fff',
  whiteDark: '#F5F5F5',
  grayLight: '#ECEAEA',
  gray: '#A3A3A3',
  grayDark: '#9C9797',
  grayDarkA: '#5A5A5A',
  grayMedium: '#9B9696',
  grayA: '#7B7B7B',
  grayB: '#E6E4E4',
  blackLight: '#717171',
  black: '#090A0A',
  greenLight: '#2B8600',
  greenDark: '#34A853',
  green_a: '#5DC709',
  red: '#FF0000',
  red_a: '#FF0404',
  blueFacebook: '#1877F2',
  orange: '#F27806',
  orange_light: '#FFF2E5',
  bodyColor: '#fff',
};

export const Fonts = {
  primaryDark11InterMedium: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: Colors.primaryDark,
  },
  primaryDark14RobotoMedium: {
    fontSize: 14,
    color: Colors.primaryDark,
    fontFamily: 'Poppins-Medium',
  },
  primaryDark16RobotoMedium: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontFamily: 'Poppins-Medium',
  },

  primaryDark18RobotoMedium: {
    fontSize: 18,
    color: Colors.primaryDark,
    fontFamily: 'Poppins-Medium',
  },

  primaryLight14RobotoRegular: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Regular',
  },

  primaryLight14RobotoMedium: {
    fontSize: 14,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Medium',
  },

  primaryLight15RobotoLight: {
    fontSize: 15,
    color: Colors.primaryDark,
    fontFamily: 'Poppins-Light',
  },

  primaryLight15RobotoMedium: {
    fontSize: 15,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Medium',
  },

  primaryLight15RobotoRegular: {
    fontSize: 15,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Regular',
  },

  primaryLight18RobotoRegular: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Regular',
  },

  primaryLight18RobotoMedium: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Medium',
  },

  black12RobotoRegular: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  black14RobotoRegular: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  black16RobotoRegular: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  black16RobotoMedium: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  black18RobotoRegular: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },

  black18RobotoMedium: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },

  black22RobotoMedium: {
    color: Colors.black,
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
  },

  blackLight14RobotoRegular: {
    color: Colors.blackLight,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },

  blackLight16RobotoMedium: {
    color: Colors.blackLight,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  gray18RobotoRegular: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },
  gray18RobotoMedium: {
    fontSize: 18,
    color: Colors.gray,
    fontFamily: 'Poppins-Medium',
  },

  grayLightRobotoRegular: {
    fontSize: 14,
    color: Colors.grayLight,
    fontFamily: 'Poppins-Regular',
  },

  gray9RobotoRegular: {
    fontSize: 9,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },

  gray11RobotoRegular: {
    fontSize: 11,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },

  gray14RobotoRegular: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },

  gray12RobotoMedium: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'Poppins-Medium',
  },

  gray12RobotoRegular: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },

  gray14RobotoMedium: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: 'Poppins-Medium',
  },

  grayA14RobotoMedium: {
    fontSize: 14,
    color: Colors.grayA,
    fontFamily: 'Poppins-Medium',
  },

  gray16RobotoMedium: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: 'Poppins-Medium',
  },

  gray16RobotoRegular: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: 'Poppins-Regular',
  },


  white11InterMedium: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
  },
  white12RobotoMedium: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  white12RobotoRegular: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Poppins-Regualr',
  },
  white14RobotoRegular: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
  },
  white14RobotoMedium: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  white16RobotoMedium: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  white18RobotMedium: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  white18RobotBold: {
    fontSize: 18,
    // color: Colors.white,
    fontFamily: 'Poppins-BoldItalic',
  },

  greenDark14InterMedium: {
    fontSize: 14,
    color: Colors.greenDark,
    fontFamily: 'Poppins-Medium',
  },
  black11InterMedium: {
    fontSize: 11,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  black14InterMedium: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },

  primaryLight18RighteousRegular: {
    fontSize: 18,
    color: Colors.primaryLight,
    fontFamily: 'Poppins-Regular',
  },
  primaryPoppinsItalic: {
    fontSize: 18,
    color: colors.black_color,
    fontFamily: 'Poppins-Italic',
  },
  PoppinsRegular: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
  },
  PoppinsMedium: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  PoppinsSemiBold: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  PoppinsBold: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
  },
  PoppinsLightItalic: {
    fontSize: 15,
    color: colors.black_color,
    fontFamily: 'Poppins-LightItalic',
  },

 };

export const Sizes = {
  fixPadding: normalize(10),
};

