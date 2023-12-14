import { responsiveFontSize, width } from "../utils/Dimensions/Dimension";
import { AppColor } from "./AppColor";
import { Fonts } from "./Fonts";

export const customStyles = {
    simpleText: {
        fontFamily: Fonts.poppins.light,
        fontSize: responsiveFontSize(1.5),
        color: AppColor.black,
        textAlign: 'justify',
    },
    mediumText: {
        fontFamily: Fonts.poppins.medium,
        fontSize: responsiveFontSize(1.5),
        color: AppColor.black,
        textAlign: 'justify',
    },
    semiBoldText: {
        fontFamily: Fonts.poppins.semiBold,
        fontSize: responsiveFontSize(1.5),
        color: AppColor.black,
        textAlign: 'justify',
    },
    boldText: {
        fontFamily: Fonts.poppins.bold,
        fontSize: responsiveFontSize(1.5),
        color: AppColor.black,
        textAlign: 'justify',
    },
    heading: {
        fontFamily: Fonts.lobster.regular,
        fontSize: responsiveFontSize(2.5),
        color: AppColor.black,
        textAlign: 'justify',
    },
    input: {
        fontFamily: Fonts.poppins.regular,
        fontSize: responsiveFontSize(1.5),
        color: AppColor.black,
        textAlign: 'justify',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: AppColor.borderColor,
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColor.blueViolet,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    headingView: {
        justifyContent: 'center',
        paddingLeft: 10,
        paddingBottom: 5,
        borderBottomWidth: 0.5,
        borderColor: AppColor.borderColor
    }

}