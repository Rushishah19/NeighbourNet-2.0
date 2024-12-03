import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function MapPage() {
  const [workerLocations, setWorkerLocations] = useState([]);

  useEffect(() => {
    console.log("MapPage mounted"); // Debug log
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/users/map/data');
        console.log("Worker Locations:", response.data); // Debug log
        setWorkerLocations(response.data);
      } catch (error) {
        console.error('Error fetching worker locations:', error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Worker Locations</h1>
      <div style={{ height: '500px', width: '100%' }} className="bg-gray-100 rounded-lg shadow-lg p-6">
        <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

          {workerLocations.map((worker) => (
            <Marker key={worker.id} position={[worker.lat, worker.lng]}>
              <Popup>
                <h3>{worker.name}</h3>
                <p>Skill: {worker.skill}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
