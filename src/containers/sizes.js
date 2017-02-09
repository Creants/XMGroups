import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

var sizes = {

    sizeLatitudeDelta: 0.0922,
    sizeLongtitudeDelta: 0.0421,

    screenHeight: height,
    screenWidth: width
}

module.exports = sizes;
