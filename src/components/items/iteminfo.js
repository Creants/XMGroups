'use-strict'

import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CHyperLink from '../userinterface/hyperlink'

class ItemInfo extends Component {

    constructor(props) {
        super(props)

        this.data = props.data;

        // bind this
        this._onPress = this._onPress.bind(this);
        this._changeToInfoView = this._changeToInfoView.bind(this);

    }

    render() {
        const {
            phone,
            scope,
            name,
            location,
            fblink,
            website
        } = this.props.data;
        return (

            <View style={[
                styles.itemSearch, {
                    margin: 10,
                    padding: 10
                }
            ]}>
                <TouchableOpacity style={{
                    backgroundColor: '#ffffff00'
                }} onPress={() => this._onPress()}>
                    <View style={[
                        styles.container, {
                            flexDirection: 'row'
                        }
                    ]}>

                        <View style={{
                            flex: 4
                        }}>

                            <View style={{
                                marginBottom: 20
                            }}>
                                <Text style={styles.textTitle}>{this.data.name}</Text>
                                <Text style={[
                                    styles.textDescription, {
                                        marginLeft: 10
                                    }
                                ]}>{this.data.location.street}</Text>
                            </View>


                            <View style={{
                                marginBottom: 10
                            }}>
                                <Text style={[
                                    styles.textNormal, {
                                        marginLeft: 10
                                    }
                                ]}>{phone}</Text>

                                <Text style={[
                                    styles.textNormal, {
                                        marginLeft: 10
                                    }
                                ]}>{fblink}</Text>
                            </View>

                            <View style={{marginBottom: 10}}>
                              <Text style={{color: '#F6A623', fontSize: 14}} onPress={this._changeToInfoView}>View more info</Text>
                            </View>

                        </View>

                        <View style={{
                            flex: 1
                        }}>
                            <Text>Distance</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );

    }


    // ----------------- function --------------- //
    _onPress() {
        alert(JSON.stringify(this.props.data));
    }

    _changeToInfoView() {
        alert ("view more info");
    }

}

ItemInfo.defaultProps = {
    data: null
};

module.exports = ItemInfo;
