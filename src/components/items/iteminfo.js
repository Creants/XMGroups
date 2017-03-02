'use-strict'

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class ItemInfo extends Component {

    constructor(props) {
        super(props)

        this.data = props.data;

        // bind
        this._onPress = this._onPress.bind(this);

    }

    render() {
        return (
            <TouchableOpacity style={{
                backgroundColor: '#ffffff00'
            }} onPress={() => this._onPress()}>
                <View style={styles.container}>
                    <Text>{this.data.name}</Text>
                </View>
            </TouchableOpacity>
        );

    }

    _onPress() {
        console.log( this.props.data );
    }

}

ItemInfo.defaultProps = {
    data: null
};

module.exports = ItemInfo;
