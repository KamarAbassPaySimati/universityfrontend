/* eslint-disable max-len */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapShimmer from './MapShimmer';
import malawiGeoJSON from '../../../components/GeoData.json';
import { dataService } from '../../../services/data.services';
import { useSelector } from 'react-redux';
import Image from '../../../components/Image/Image';
import GlobalContext from '../../../components/Context/GlobalContext';
import HoverToolTip from '../../../components/HoverToolTip';
import Dropdown from '../../../components/Dropdown';

const DEFAULT_CORDINATE = { latitude: -13.5, longitude: 32.5 };
const DEFAULT_ZOOM = 6;
const FILTERED_ZOOM = 10;

const createDotIcon = () => new L.DivIcon({
    className: 'custom-dot-icon cursor-pointer',
    html: `<div style="
        width: 8px;
        height: 8px;
        background-color: #3B2A6F;
        border-radius: 50%;
        opacity: 80%;
        "></div>`,
    iconSize: [8, 8],
    iconAnchor: [6, 6]
});

// Custom component to handle map view updates
const MapUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom, {
                animate: true,
                duration: 0.5
            });
        }
    }, [center, zoom, map]);
    return null;
};

const MapView = ({ DashboardName, endpoint, initialStates }) => {
    const [filteredCordinate, setFilterCordinate] = useState(DEFAULT_CORDINATE);
    const [filter, setFilter] = useState(initialStates.districtFilter);
    const [data, setData] = useState([]);
    const [currentZoom, setCurrentZoom] = useState(DEFAULT_ZOOM);
    const { user } = useSelector((state) => state.auth);
    const { user_type: CurrentUserRole } = user;
    const [loading, setLoading] = useState(true);
    const [exportLoading, setExportloading] = useState(false);
    const { setToastError, setToastSuccess, setToastInformation } = useContext(GlobalContext);
    const [mapKey, setMapKey] = useState(0);

    const getCoordinatesByDistrict = (districtName) => {
        if (districtName === 'All') {
            setFilterCordinate(DEFAULT_CORDINATE);
            setCurrentZoom(DEFAULT_ZOOM);
        } else {
            const districtData = data.find(item => item.district === districtName);
            if (districtData) {
                setFilterCordinate({
                    latitude: districtData.latitude,
                    longitude: districtData.longitude
                });
                setCurrentZoom(FILTERED_ZOOM);
            }
        }
        setMapKey(prev => prev + 1);
    };

    const handleInput = (value) => {
        setFilter(value);
        getCoordinatesByDistrict(value);
    };

    // Fetch map data
    useEffect(() => {
        const fetchMapData = async () => {
            try {
                setLoading(true);
                const res = await dataService.GetAPI(`merchant-dashboard/${endpoint}`);
                if (res.data && res.data.data) {
                    const filteredData = res.data.data.filter(item => item.latitude !== null && item.longitude !== null);
                    setData(filteredData);
                }
            } catch (error) {
                console.error('Error fetching map data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMapData();
    }, [endpoint]);

    const memoizedMarkers = useMemo(() => {
        return data.map((region, index) => (
            <Marker
                key={`${index}-${filter}`}
                position={[region.latitude, region.longitude]}
                icon={createDotIcon()}
            >
                <Tooltip
                    direction="center"
                    className='rounded-xl p-0 m-0'
                    offset={
                        region?.merchant_count
                            ? [5 * String(region.merchant_count).length, 0]
                            : [5, 0]
                    }
                    opacity={1}
                    permanent={filter !== 'All' && filter === region.district}
                >
                    <div className='map-tooltip'>
                        <div className='map-dot'></div>
                        <div className='text-center w-fit text-[12px] text-[#4F5962]'>
                            {region?.merchant_count}
                        </div>
                    </div>
                </Tooltip>
            </Marker>
        ));
    }, [data, filter]);

    const handleExport = async () => {
        try {
            setExportloading(true);
            const res = await dataService.GetAPI('hello');
            if (!res.error) {
                if (res.data.s3_url) {
                    window.open(
                        res.data.s3_url,
                        '_blank'
                    );
                    setToastSuccess('Exported successfully');
                } else {
                    setToastInformation(`${res.data.message}`);
                }
                setExportloading(false);
            } else {
                setToastError('An Error Occurred!');
                setExportloading(false);
            }
        } catch (error) {
            setToastError('An Error Occurred!');
            setExportloading(false);
        }
    };

    return (
        <div className='py-[24px]'>
            <div className='h-full border-[#F0ECFF] border p-4 rounded-[6px]'>
                <div className='flex justify-between pb-4'>
                    <h1 className='font-semibold text-[18px] leading-[26px] px-1 pt-1' data-testid={DashboardName}>{DashboardName}</h1>
                    <div className='flex gap-7'>
                        <Dropdown
                            initialSelect={filter}
                            onChange={handleInput}
                            data={['All', ...data.map(item => item.district)]}
                            testid='change_code'
                            testidInput='change_code_search'
                            testidOpions='change_code_option'
                            className='border rounded w-[130px] px-2 py-1 text-[#4F5962]'
                            optionClassname='my-1 mx-2 rounded-lg p-2 font-normal text-xs hover:bg-[#F2F4F5] text-[#444652] font-normal'
                            textColor='text-[#444652]'
                            scroll='thin-scrollBar'
                            height='max-h-[210px]'
                            searchIcon
                            toolTip
                        />
                        {
                            CurrentUserRole === 'Super admin' &&
                            <>
                                <button data-testid={`${DashboardName} Export`} onClick={handleExport} disabled={data?.length === 0 || exportLoading}>
                                    <Image src={'export'} className={`w-6 h-6 bottom-1 ${data?.length ? 'cursor-pointer' : ''}`} toolTipId='export' />
                                </button>
                                <HoverToolTip id='export' />
                            </>
                        }
                    </div>
                </div>

                <div className="h-[350px] relative">
                    {loading
                        ? (
                            <MapShimmer />
                        )
                        : data.length > 0
                            ? (
                                <MapContainer
                                    key={mapKey}
                                    className='z-10'
                                    center={[filteredCordinate.latitude, filteredCordinate.longitude]}
                                    zoom={currentZoom}
                                    style={{ height: '100%', width: '100%' }}
                                    maxBounds={[[-17, 32.0], [-9.0, 36.0]]}
                                    maxZoom={10}
                                    minZoom={6}
                                    scrollWheelZoom={true}
                                    zoomControl={true}
                                >
                                    <MapUpdater
                                        center={[filteredCordinate.latitude, filteredCordinate.longitude]}
                                        zoom={currentZoom}
                                    />
                                    {/* <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    /> */}
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://carto.com/attributions">CartoDB</a>'
                                    />
                                    <GeoJSON data={malawiGeoJSON} className='cursor-grab' style={{ color: '#3B2A6F', weight: 0.8, fillOpacity: 0.08 }} />
                                    {memoizedMarkers}
                                </MapContainer>
                            )
                            : (
                                <div className='flex justify-center items-center h-full'>
                                    <div className='border border-[#E5E9EB] text-center p-2 rounded-lg px-8 text-[#4F5962] font-normal text-[12px] leading-5'>
                                        No Data Found
                                    </div>
                                </div>
                            )}
                </div>
            </div>
        </div>
    );
};

export default MapView;
