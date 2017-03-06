'use-strict'

import React, {Component} from 'react';
import {View, TextInput} from 'react-native';

class ItemSearch extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    render() {
        return (
            <View style={[
                {
                    marginTop: 10,
                    marginLeft: 40,
                    marginRight: 40,
                    marginBottom: 0,
                    justifyContent: 'center',
                    alignItems: "center",
                },
                this.props.style,
                styles.itemSearch
            ]}>
                <TextInput underlineColorAndroid="transparent" autoCapitalize="none" placeholder="Enter text to see events" autoCorrect={false} style={{
                    color: 'black',
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingBottom: 0,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    flex: 1
                }}></TextInput>
            </View>
        );
    }

    componentDidMount() {}

    //---------------------- function ----------------------//

}

module.exports = ItemSearch;
