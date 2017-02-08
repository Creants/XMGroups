'use-strict'

import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ListView} from 'react-native';
import Map from './map'

var catelogryData = [
    {
        title: 'Map',
        key: '1'
    }, {
        title: 'Group',
        key: '2'
    }
];

class Menu extends Component {

    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(catelogryData)
        };
    }

    render() {
        return (
            <View style={[styles.container]}>
                <ListView contentContainerStyle={styles.listviewCenter} dataSource={this.state.dataSource} renderRow={this.createButtonCatelogry.bind(this)}/>
            </View>
        ); // end return
    } // end render

    // btnMapOnPress
    btnMapOnPress(dic) {
        switch (dic.key) {
            case '1':
                {
                    this.props.navigator.push({name: 'mapScreen',
                      title: dic.title,
                      component: Map,
                      passProps: {}
                    })
                }
                break;
            default:
                break;
        }

    } // end btnMapOnPress

    // createButtonCatelogry
    createButtonCatelogry(property) {
        return (
            <TouchableOpacity style={[styles.btnCatelogry, styles.containerCenter]} onPress={this.btnMapOnPress.bind(this, property)}>
                <Text style={[styles.btnCatelogryTitle]}>
                    {property.title}
                </Text>
            </TouchableOpacity>
        );
    } // end createButtonCatelogry

} // end class

module.exports = Menu;
