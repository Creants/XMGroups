import {
  StyleSheet,
  Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');

var styles = StyleSheet.create ({

  container: {
    flex: 1,
    backgroundColor: '#F6A623'
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
    marginBottom: 20,
  },

  btnCatelogryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F6A623',
    textAlign: 'center',
  },

  listviewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  mapContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

});

module.exports = styles;
