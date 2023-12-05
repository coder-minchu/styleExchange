import { Dimensions } from "react-native";
import { useEffect, useState } from 'react';
function useScreenDimensions() {
    const [screenDimensions, setScreenDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });
    useEffect(() => {
        const updateDimensions = () => {
            setScreenDimensions({
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            });
        };
        const subscription = Dimensions.addEventListener(
            'change',
            updateDimensions,
        );
        return () => {
            subscription.remove();
        };
    }, []);
    return screenDimensions;
}
export default useScreenDimensions;

export const { height, width } = Dimensions.get('window');

const percenttgeCalculation = (max, val) => max * (val / 100)

const fontCalculation = (height, width, val) => {
    const widthDimention = height > width ? width : height;
    const aspectRatioBasedHeight = (16 / 9) * widthDimention;
    return percenttgeCalculation(
        Math.sqrt(
            Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimention, 2)
        ),
        val
    )
}
export const responsiveFontSize = (f) => {
    const { height, width } = Dimensions.get('window');
    return fontCalculation(height, width, f)
}