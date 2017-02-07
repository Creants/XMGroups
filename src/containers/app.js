'use-strict'

import React, {Component} from 'react';
import {View, Text, Navigator} from 'react-native';

import Menu from '../components/menu'
import Map from '../components/map'

export default class XMGroups extends Component {

    render() {
        return (<Navigator initialRoute={{
            name: 'menuScreen'
        }} renderScene={this.renderScene}/>); // end return
    } // end render

    renderScene(route, navigator) {
        switch (route.name) {
            case 'menuScreen':
                return (
                    <Menu></Menu>
                );
            case 'mapScreen':
                return (
                    <Map></Map>
                );
            default:
                return (
                    <View></View>
                );
        }
    }

}
