'use-strict'

// import
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
import MapView from 'react-native-maps';
import ListInfoView from './listinfo';
import MapUtils from '../commons/mapUtils';

// require
var apiConfig = require('../commons/apiConfig');

// class
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
        watchID : (null :
            ? number);

        this.deltaHeight = 77;

        // init state {region, markers}
        this.state = {
            region: {
                longitudeDelta: sizes.sizeLongitudeDelta,
                longitude: 0,
                latitude: 0,
                latitudeDelta: sizes.sizeLatitudeDelta
            },
            markers: []
        };

        // _onRegionChange bind
        this._onRegionChange = this._onRegionChange.bind(this);
        this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
        this.onCalloutPress = this.onCalloutPress.bind(this);
        this._checkIsRequestWithNewRegion = this._checkIsRequestWithNewRegion.bind(this);

        // PanResponder callback bind
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);

    }

    componentWillMount() {

        // panResponder
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });


        // valt
        this._previousBottom = 0;
        this._previousHeight = this.deltaHeight ;
        this._mapInfoStyles = {
            style: {
                height: this._previousHeight,
                bottom: this._previousBottom
            }
        };
        this._distance = 2000;

    }

    render() {

        const {region, markers} = this.state;

        return (

            <View style={styles.container}>

                <MapView showsUserLocation={true} loadingEnabled={true} style={styles.mapContent} region={this.state.region} _onRegionChange={this._onRegionChangeComplete} _onRegionChangeComplete={this._onRegionChangeComplete}>

                    {markers.map(marker => (<MapView.Marker key={marker.id} coordinate={{
                        latitude: marker.location.latitude,
                        longitude: marker.location.longitude
                    }} title={marker.name} pinColor="orange" description={marker.description} onCalloutPress={() => this.onCalloutPress(marker.link)}/>))}

                </MapView>

                <ListInfoView ref={(mapInfo) => {
                    this.mapInfo = mapInfo;
                }} style={styles.mapInfo} {...this._panResponder.panHandlers} data={markers}/>

            </View>

        );

    }

    componentDidMount() {

        // get current Location
        navigator.geolocation.getCurrentPosition((position) => {

            // console.log('\n getCurrentPosition: ' + JSON.stringify(position));

            var region = {
                longitudeDelta: sizes.sizeLongitudeDelta,
                longitude: Number(position.coords.longitude),
                latitude: Number(position.coords.latitude),
                latitudeDelta: sizes.sizeLatitudeDelta
            }

            if (this._checkIsRequestWithNewRegion(region)) {
                this._gymsLocationFromApi(region.latitude, region.longitude, this._distance);
                this.oldRegion = region;
            }

            this.setState({region: region});

        }, (error) => alert(JSON.stringify(error)), {

            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000

        });

        this.watchID = navigator.geolocation.watchPosition((position, error) => {
            // console.log('\n watchPosition: ' + JSON.stringify(position) + JSON.stringify(error));
        });

        this._updateNativeStyles();

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    /**
     * [_gymsLocationFromApi description]
     * @param  {Number} latitude            [description]
     * @param  {Number} longitude         [description]
     * @param  {Number} distance          [description]
     * @return  {Array}     markers list     [description]
     */
    _gymsLocationFromApi(latitude : Number, longitude : Number, distance : Number) {

        var apiUrl = apiConfig.domain + 'api/search?latitude=' + latitude + "&longitude=" + longitude + '&radius=' + distance + '&type=gym';
        fetch(apiUrl).then((response) => response.json()).then((responseJSON) => {

            // console.log(responseJSON);
            if (responseJSON && responseJSON !== undefined) {
                this.setState({markers: responseJSON});
            }

        }).catch((error) => {

            console.log('request error ' + JSON.stringify(error));
            console.log(" API url log" + apiUrl);
            alert( "fetch API errors \n" + JSON.stringify(error));
            // this._gymsLocationFromApi(this.oldRegion.latitude, this.oldRegion.longitude, this._distance);

        });

    }

    /**
     * [_checkIsRequestWithNewRegion description]
     * @param  {Object} region [description]
     * @return  {bool}              [description]
     */
    _checkIsRequestWithNewRegion(region : Object) {

        if (!this.oldRegion)
            return true;

        var preRegion = this.oldRegion;
        var ab = MapUtils.getDistance(preRegion.latitude, preRegion.longitude, region.latitude, region.longitude);
        console.log(ab);
        return (ab >= (this._distance / 2));
    }

    /**
     * [_onRegionChange description]
     * @param  {Object} region [description]
     */
    _onRegionChange(region : Object) {

        this.setState({region: region});

    }

    /**
     * [_onRegionChangeComplete description]
     * @param  {[type]} region [description]
     * @return {[type]}        [description]
     */
    _onRegionChangeComplete(region) {

        this.setState({region: region});

        if (this.oldRegion) {
            if (this._checkIsRequestWithNewRegion(region)) {
                this._gymsLocationFromApi(region.latitude, region.longitude, this._distance);
                this.oldRegion = region;
            }
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

    _mapInfoAnimationMove(dy : Number) {

        this._nextHeight = this._previousHeight - dy;
        if (this._nextHeight >= this.deltaHeight && this._nextHeight <= sizes.screenHeight - this.deltaHeight) {
            this._mapInfoStyles.style.height = this._nextHeight;
        }

    }

    _mapInfoAnimationEnd(dy : Number) {

        if (this._nextHeight <= 250) {
            this._previousHeight = this.deltaHeight;
        } else {
            this._previousHeight = sizes.screenHeight - this.deltaHeight;
        }
        this._mapInfoStyles.style.height = this._previousHeight;
        this._nextHeight = this._previousHeight;

    }

    _handleStartShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user presses down on the mapInfo?
        return true;
    }

    _handleMoveShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // Should we become active when the user moves a touch over the mapInfo?
        return false;
    }

    _handlePanResponderGrant(e : Object, gestureState : Object) {
        this._highlight();
    }

    _handlePanResponderMove(e : Object, gestureState : Object) {

        this._mapInfoAnimationMove(gestureState.dy);
        this._updateNativeStyles();
    }

    _handlePanResponderEnd(e : Object, gestureState : Object) {

        this._unHighlight();

        this._mapInfoAnimationEnd(gestureState.dy);
        this._updateNativeStyles();

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

} // end

module.exports = Map;
