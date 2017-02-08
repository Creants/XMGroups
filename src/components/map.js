'use-strict'

import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    PanResponder
}
from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component {

    constructor(props) {
        super(props);

        // varibles
        this._panResponder = {};
        this._previousTop = 0;
        this._circleStyles = {};
        this.circle = null;

        // init state
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: sizes.sizeLatitudeDelta,
                longitudeDelta: sizes.longitudeDelta
            }
        };

        // onRegionChange bind
        this.onRegionChange = this.onRegionChange.bind(this);

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
        this._previousTop = 0;
        this._circleStyles = {
            style: {
                bottom: -100,
                backgroundColor: 'green'
            }
        };

    } // end componentWillMount

    render() {
        return (
            <View style={[styles.container]}>
                <MapView region={this.state.region} onRegionChange={this.onRegionChange} style={styles.mapContent}>
                  <View ref={(circle) => {
                      this.circle = circle;
                  }} style={styles.mapInfo} {...this._panResponder.panHandlers}/>
                </MapView>
            </View>
        );
    } // end render

    componentDidMount() {

        this._updateNativeStyles();

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: sizes.sizeLatitudeDelta,
                    longitudeDelta: sizes.sizeLongtitudeDelta
                }
            });

        }, (error) => alert(JSON.stringify(error)), {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });

        this.watchID = navigator.geolocation.watchPosition((position) => {
            var lastPosition = JSON.stringify(position);
            this.setState({lastPosition});
        });

    } // end componentDidMount

    onRegionChange(region) {
        this.setState({region});
    } // end onRegionChange

    _highlight() {
        this._circleStyles.style.backgroundColor = 'blue';
        this._updateNativeStyles();
    }

    _unHighlight() {
        this._circleStyles.style.backgroundColor = 'green';
        this._updateNativeStyles();
    }

    _updateNativeStyles() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handleStartShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user presses down on the circle?
        return true;
    }

    _handleMoveShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user moves a touch over the circle?
        return true;
    }

    _handlePanResponderGrant(e : Object, gestureState : Object) {
        this._highlight();
    }

    _handlePanResponderMove(e : Object, gestureState : Object) {
        this._circleStyles.style.bottom = this._previousTop - gestureState.dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e : Object, gestureState : Object) {
        this._unHighlight();
        this._previousTop -= gestureState.dy;
    }

} // end class

module.exports = Map;
