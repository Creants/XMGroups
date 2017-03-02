'use-strict'

import React, {Component, PropTypes} from 'react';
import {View, Linking, Text} from 'react-native';

class CHyperLink extends Component{

    constructor() {
        super();

        // bind this
        this._openURL = this._openURL.bind(this);

    }

    static propTypes = {
        url: PropTypes.string.isRequired,
        title: PropTypes.string
    }

    componentWillMount() {}

    render() {

        const {title} = this.props;
        return (
            <Text onPress={this._openURL}>{title}
            </Text>
        );
    }

    componentDidMount() {}

    // --------------- function ----------------- //

    _openURL() {
        const {url} = this.props;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            } else {
                console.log('Don\'t know how to open URI: ' + this.props.url);
            }
        });
    }

}

module.exports = CHyperLink;
