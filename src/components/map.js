'use-strict'

import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    PanResponder,
    Linking,
    Text
}
from 'react-native';
import Marker from './marker';
import MapUtils from '../commons/mapUtils';

var apiConfig = require('../commons/apiConfig');

import MapView from 'react-native-maps';

class Map extends Component {

    constructor(props) {
        super(props);

        // varibles
        this._panResponder = {};
        this._previousBottom = 0;
        this._previousHeight = 0;
        this._nextHeight = 0;
        this._mapInfoStyles = {};
        this.mapInfo = null;
        this._distance = 0;
        this.oldRegion = null;

        // init state
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: sizes.sizeLatitudeDelta,
                longitudeDelta: sizes.sizeLongitudeDelta
            },
            mapData: []
        };

        // onRegionChange bind
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
        this.onCalloutPress = this.onCalloutPress.bind(this);

        // PanResponder callback bind
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
    }

    componentWillMount() {

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
        this._previousBottom = 0;
        this._previousHeight = 100;
        this._mapInfoStyles = {
            style: {
                height: this._previousHeight,
                bottom: this._previousBottom
            }
        };
        this._distance = 2500;
    } // componentWillMount

    render() {
        return (
            <View style={styles.container}>
                <MapView showsUserLocation={true} style={styles.mapContent} region={this.state.region} onRegionChange={this.onRegionChange}  onRegionChangeComplete={this.onRegionChangeComplete}>

                    {this.state.mapData.map(marker => (<MapView.Marker key={marker.id} coordinate={{
                        latitude: marker.location.latitude,
                        longitude: marker.location.longitude
                    }} title={marker.name} pinColor="orange" description={marker.description} onCalloutPress={() => this.onCalloutPress(marker.link)}/>))}

                </MapView>

                <Marker ref={(mapInfo) => {
                    this.mapInfo = mapInfo;
                }} style={styles.mapInfo} {...this._panResponder.panHandlers}/>
            </View>
        );
    } // render

    componentDidMount() {

        this._updateNativeStyles();

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: sizes.sizeLatitudeDelta,
                    longitudeDelta: sizes.sizeLongitudeDelta
                }
            });

        }, (error) => alert(JSON.stringify(error)), {
            enableHighAccuracy: false,
            timeout: 20000
        });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });

    } //  componentDidMount

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    //----------------------- map location fetch ------------------------/
    _gymsLocationFromApi(latitude : Number, longitude : Number, distance : Number) {

        var apiUrl = apiConfig.domain + 'GYMs/fbfind?location=' + latitude + "," + longitude + '&distance=' + distance;
        fetch(apiUrl).then((response) => response.json()).then((responseJSON) => {
            this.setState({mapData: responseJSON});
        }).catch((error) => {
            this.setState({mapData: []});
            alert('gym location from api error, source: map.js, error: ' + error);
        });

    }

    //----------------------- update map info ------------------------/

    _checkIsRequestWithNewRegion(region) {
        var preRegion = this.oldRegion
            ? this.oldRegion
            : this.state.region;
        var ab = MapUtils.getDistance(preRegion.latitude, preRegion.longitude, region.latitude, region.longitude);
        return (ab > this.distance) || !this.oldRegion;
    }

    // change location
    onRegionChange(region) {

        this.setState({region});
        if (this._checkIsRequestWithNewRegion(region)) {
            this.oldRegion = region;
            this._gymsLocationFromApi(region.latitude, region.longitude, this._distance);
        }

    } // onRegionChange

    onRegionChangeComplete(region) {
        this.setState({region});
        if (this._checkIsRequestWithNewRegion(region)) {
            this.oldRegion = region;
            this._gymsLocationFromApi(region.latitude, region.longitude, this._distance);
        }
    }

    onCalloutPress(link) {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        });
    }
    // call when move mapinfo
    // check top
    // check height
    _mapInfoAnimationMove(dy : Number) {

        this._nextHeight = this._previousHeight - dy;
        if (this._nextHeight >= 100 && this._nextHeight <= sizes.screenHeight - 100) {
            this._mapInfoStyles.style.height = this._nextHeight;
        }

    }

    _mapInfoAnimationEnd(dy : Number) {

        if (this._nextHeight <= 250) {
            this._previousHeight = 100;
        } else {
            this._previousHeight = sizes.screenHeight - 100;
        }
        this._mapInfoStyles.style.height = this._previousHeight;
        this._nextHeight = this._previousHeight;

    }

    _highlight() {
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.mapInfo && this.mapInfo.setNativeProps(this._mapInfoStyles);
    }

    //----------------------- pan gesture respond ------ -- -- -- -- -- -- -- -- -- /

    _handleStartShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user presses down on the mapInfo?
        return true;
    }

    _handleMoveShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user moves a touch over the mapInfo?
        return true;
    }

    // Begin Pan
    _handlePanResponderGrant(e : Object, gestureState : Object) {
        this._highlight();
    }

    // Move
    _handlePanResponderMove(e : Object, gestureState : Object) {

        this._mapInfoAnimationMove(gestureState.dy);
        this._updateNativeStyles();
    }

    // End Pan
    _handlePanResponderEnd(e : Object, gestureState : Object) {

        this._unHighlight();

        this._mapInfoAnimationEnd(gestureState.dy);
        this._updateNativeStyles();

    }

} // end

module.exports = Map;
