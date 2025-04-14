import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

type Props = {
    position: [number, number];
    venue: string;
}

export default function MapComponent({position, venue}: Props) {
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={new Icon({iconUrl: markerIconPng})}>
                <Popup>
                    {venue}
                </Popup>
            </Marker>
        </MapContainer>
    )
}