/**
 * Created by kunee on 04/05/2019.
 */
import React, {Component} from 'react';
import { withScriptjs, GoogleMap, Marker, withGoogleMap } from "react-google-maps"


const Map =  withScriptjs(withGoogleMap((props) => {

    console.log(props);
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: props.lat, lng: props.lng }}
            center={{ lat: props.lat, lng: props.lng }}
        >
            { <Marker position={{ lat: props.lat, lng: props.lng }} />}
        </GoogleMap>
    )
}));

export default Map;