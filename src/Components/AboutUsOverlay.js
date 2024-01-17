import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { AppColor } from '../utils/AppColor';
import { Fonts } from '../utils/Fonts';
import { height, responsiveFontSize } from '../utils/Dimensions/Dimension';

const AboutUsOverlay = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: AppColor.blueViolet, padding: 20, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                        <Icons name="x" size={height / 35} color={AppColor.white} />
                    </TouchableOpacity>
                    <Text style={{ color: AppColor.white, fontFamily: Fonts.poppins.medium, fontSize: responsiveFontSize(1.5), marginBottom: 20 }}>
                        Report
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default AboutUsOverlay;
