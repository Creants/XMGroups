'use-strict'

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';


class  Menu extends Component {

  render () {
    return (
      <View style={[styles.container, styles.containerCenter]}>
      <TouchableOpacity style={[styles.btnCatelogry,styles.containerCenter]} >
      <Text style={[styles.btnCatelogryTitle]}>
        Map
      </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btnCatelogry,styles.containerCenter]} >
      <Text style={[styles.btnCatelogryTitle]}>
        Groups
      </Text>
      </TouchableOpacity>
      </View>
    ); // end return
  } // end render

}

module.exports = Menu;
