import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react';

const mapStyles = {
    width: '300px',
    position: 'relative',
    height: '250px'
};

// Source: https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
export class MapContainer extends Component {
    render() {
        let coords = {
            lat: this.props.lat || 40.45683,
            lng: this.props.lng || 49.74461
        };

        return (
            <Map
                center={coords}
                google={this.props.google}
                zoom={14}
                style={mapStyles}

                zoomControl={false}
                mapTypeControl={false}
                scaleControl={false}
                streetViewControl={false}
                panControl={false}
                rotateControl={false}
                fullscreenControl={false}
            >
                <Circle
                    radius={200}
                    center={coords}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.3}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB0XEPXM2X4A6eB2l1G9bYaYJWmoE6mX88'
})(MapContainer);