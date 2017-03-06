import {Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

var sizes = {

    sizeLatitudeDelta: 0.0922,
    sizeLongitudeDelta: 0.0421,

    screenHeight: height,
    screenWidth: width,

    searchBoxHeight: 36,
}

module.exports = sizes;
