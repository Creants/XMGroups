import {StyleSheet, Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create({

    container: {
        flex: 1
    },

    containerCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnCatelogry: {
        width: 250,
        height: 45,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        marginTop: 20,
        marginBottom: 20
    },

    btnCatelogryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F6A623',
        textAlign: 'center'
    },

    listviewCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    mapContent: {
        flex: 1
    },

    mapInfo: {
        height: 0,
        alignSelf: 'stretch',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent'
    },

    mapInfoBorder: {
        backgroundColor: '#F5F3EEBF',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#D9AB61',
        shadowOpacity: 4,
        shadowOffset: {
            width: 0,
            height: -2
        },
        flex: 1,
        top: 20
    },

    itemSearch: {
        borderWidth: 1,
        borderColor: '#F6A623',
        borderRadius: 4,

    },

    textNormal: {
      fontSize: 14,
      fontFamily: 'Helvetica',
    },

    textTitle: {
      fontSize: 14,
      fontFamily: 'Helvetica',
      fontWeight: 'bold'
    },

    textDescription: {
      fontSize: 14,
      fontFamily: 'HelveticaNeue',
      color: '#7B7976',
    },

});

module.exports = styles;
