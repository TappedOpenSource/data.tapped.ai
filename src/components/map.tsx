'use client';

import Image from 'next/image';
import { useState, useMemo, useCallback } from 'react';
import {
    Map,
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
    ScaleControl,
} from 'react-map-gl';
import { BoundingBox } from '@/utils/search';
import { useDebounce } from '@/context/debounce';
import { useSearch } from '@/context/search';
import { getProfileImage } from '@/types/user_model';

const defaultMapboxToken =
    'pk.eyJ1Ijoiam9uYXlsb3I4OSIsImEiOiJjbHJvNGdsemswNjl3MnFtdHNieXEyaWphIn0.gwc31X7uTzjxeDm6vcGzCg';
const mapboxDarkStyle = 'mapbox/dark-v11';
const mapboxLightStyle = 'mapbox/light-v10';

export default function VenueMap() {
    const [popupInfo, setPopupInfo] = useState<{
        longitude: number;
        latitude: number;
        city: string;
        state: string;
        image: string;
    } | null>(null);
    const { useVenueData } = useSearch();
    const [bounds, setBounds] = useState<null | BoundingBox>(null);
    const debouncedBounds = useDebounce<null | BoundingBox>(bounds, 250);

    const { data } = useVenueData(debouncedBounds);

    const onRender = useCallback((e: mapboxgl.MapboxEvent) => {
        const currentMapBounds = e.target.getBounds();

        setBounds({
            ne: {
                lat: currentMapBounds.getNorth(),
                lng: currentMapBounds.getWest(),
            },
            sw: {
                lat: currentMapBounds.getSouth(),
                lng: currentMapBounds.getEast(),
            }
        });
    }, []);

    const markers = useMemo(
        () =>
            (data || []).map((venue) => {
                const lat = venue.location?.lat;
                const lng = venue.location?.lng;

                if (!lat || !lng) {
                    return null;
                }

                const profileImage = getProfileImage(venue);
                return (
                    <Marker
                        key={venue.id}
                        longitude={lng}
                        latitude={lat}
                        anchor="bottom"
                        onClick={() => window.open(`https://tapped.ai/b/${venue.username}`, '_blank')}
                    >
                        <Image
                            src={profileImage}
                            alt="musician profile picture"
                            width={35}
                            height={35}
                            className="rounded-full hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
                            style={{ objectFit: "cover", overflow: "hidden" }}
                        />
                    </Marker>
                );
            }),
        [data]
    );

    return (

        <div className='w-screen h-screen m-0'>
            <Map
                initialViewState={{
                    latitude: 38.895,
                    longitude: -77.0366,
                    zoom: 5.5,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle={`mapbox://styles/${mapboxDarkStyle}`}
                mapboxAccessToken={defaultMapboxToken}
                onRender={onRender}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {markers}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.city}, {popupInfo.state} |{' '}
                            <a
                                target="_new"
                                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                            >
                                Wikipedia
                            </a>
                        </div>
                        <img width="100%" src={popupInfo.image} />
                    </Popup>
                )}
            </Map>

            {/* <ControlPanel /> */}
        </div >
    );
}
