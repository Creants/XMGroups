'use-strict'

import React, {Component} from 'react';
import {View} from 'react-native';

class Marker extends Component {

    setNativeProps(nativeProps) {
        this._root .setNativeProps(nativeProps);
    }

    render() {
        return (
            <View ref={component => this._root = component} {...this.props}>
            </View>
        );
    }

} // end class

module.exports = Marker;
