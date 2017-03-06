'use-strict'

import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';

let ItemInfo = require('./items/iteminfo');
let ItemSearch = require('./items/itemsearch');


class ListInfoView extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.data = props.data;

        this.state = {hasData : false, dataSource : this.ds.cloneWithRows(this.data)};

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

        this.data = nextProps.data;
        this.state = {hasData : true, dataSource : this.ds.cloneWithRows(this.data)};

    }

    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }

    render() {
        return (
            <View ref={component => this._root = component} {...this.props}>
                <View style={styles.mapInfoBorder}>

                    <ItemSearch style={{height: sizes.searchBoxHeight, }}>
                    </ItemSearch>

                    <View style={{height: 1, backgroundColor: '#F5A62333', margin: 10}}>
                    </View>

                    <ListView  dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
                </View>

            </View>
        );
    }

    _renderRow(rowData) {

        return (<ItemInfo data={rowData}/>);

    }

} // end class

ListInfoView.defaultProps = {
    data: null
};

module.exports = ListInfoView;
