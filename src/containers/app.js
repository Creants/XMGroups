'use-strict'

import React, {Component} from 'react';
import {View, Text, Navigator} from 'react-native';

import Menu from '../components/menu'
import Map from '../components/map'
import Guide from '../components/guide'

export default class XMGroups extends Component {

    render() {
        return (<Navigator initialRoute={{
            name: "menuScreen",
            title: "Menu",
            component: Menu
        }} renderScene={this.renderScene}/>);
    } // end render

    renderScene(route, navigator) {
        switch (route.name) {
            case 'menuScreen':
                return (
                    <Menu navigator={navigator} data={route} {...route.passProps}></Menu>
                );
            case 'mapScreen':
                return (
                    <Map navigator={navigator} data={route} {...route.passProps}></Map>
                );
            default:
                return (
                    <View></View>
                );
        }
    }

}
