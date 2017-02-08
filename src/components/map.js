'use-strict'

import React, {Component} from 'react';
import
{
    View,
    StyleSheet,
    PanResponder
}
from 'react-native';
import Marker from './marker';

import MapView from 'react-native-maps';

class Map extends Component {

    constructor(props) {
        super(props);

        // varibles
        this._panResponder = {};
        this._previousTop = 0;
        this._previousHeight = 0;
        this._circleStyles = {};
        this.circle = null;

        // init state
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: sizes.sizeLatitudeDelta,
                longitudeDelta: sizes.sizeLongtitudeDelta
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
        this._previousHeight = 100;
        this._circleStyles = {
            style: {
                height: this._previousHeight ,
                bottom: this._previousTop,
            }
        };

    } // componentWillMount

    render() {
        return (
            <View style={styles.container}>
                <MapView region={this.state.region} onRegionChange={this.onRegionChange} style={styles.mapContent}>
                    <MapView.Marker title="Citi Field" description="center field" coordinate={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude
                    }} pinColor="blue"/>
                </MapView>

                <Marker ref={(circle) => {
                    this.circle = circle;
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
                    longitudeDelta: sizes.sizeLongtitudeDelta
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

    onRegionChange(region) {
        this.setState({region});
    } // onRegionChange

    _highlight() {
        this._updateNativeStyles();
    }

    _unHighlight() {
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
        console.log(gestureState.dy);
        // this._circleStyles.style.bottom = this._previousTop - gestureState.dy;
        this._circleStyles.style.height = this._previousHeight - gestureState.dy;
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e : Object, gestureState : Object) {
        this._unHighlight();
        // this._circleStyles.style.height = this._previousHeight - gestureState.dy;
        this._previousHeight  -= gestureState.dy;
        // this._previousTop -= gestureState.dy;
    }

} // end

module.exports = Map;
