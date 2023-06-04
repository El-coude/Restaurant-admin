import mapbox, { Layer, Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@fast-monorepo/shared/index";
import Geo from "@mapbox/mapbox-sdk/services/geocoding";

const PickFromMap = ({
    close,
    setInfo,
}: {
    close: () => void;
    setInfo: Dispatch<
        SetStateAction<{
            visible: boolean;
            latitud?: number;
            longtitud?: number;
            address?: string;
        }>
    >;
}) => {
    const [cords, setCords] = useState({
        longtitud: 1.105,
        latitud: 34.906,
    });
    useEffect(() => {
        /*   Map.accessToken = 'YOUR_ACCESS_TOKEN'; */
        mapbox.accessToken =
            "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q";
        const map = new Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [1.105, 34.906], // Set the initial center of the map
            zoom: 6, // Set the initial zoom level
        });

        const marker = new Marker({
            draggable: true,
        })
            .setLngLat([1.105, 34.906])
            .addTo(map);

        marker.on("dragend", (e) => {
            var lngLat = marker.getLngLat();
            setCords((prev) => ({
                latitud: lngLat.lng,
                longtitud: lngLat.lat,
            }));
        });
    }, []);

    const fetchLocationInfo = async (longitude: number, latitude: number) => {
        const geo = Geo({
            accessToken:
                "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q",
        });
        try {
            // Make a reverse geocoding request
            const response = await geo
                .reverseGeocode({
                    query: [longitude, latitude],
                    types: ["address", "place"],
                    limit: 1,
                })
                .send();

            // Extract the city and address from the response
            const features = response.body.features;
            if (features.length > 0) {
                const city = features[0]?.context?.find((c) =>
                    c?.id?.includes("place")
                )?.text;
                const address = features[0].place_name;
                console.log("Address:", address);
                return address;
            } else {
                console.log("Location not found.");
                return `${longitude} | ${latitude}`;
            }
        } catch (error) {
            console.error("Error:", (error as any).message);
            return `${longitude} | ${latitude}`;
        }
    };

    return (
        <Modal close={close}>
            <div id="map" className="mb-4 h-[468px] w-[468px]"></div>
            <Button
                label="Confirm"
                className="w-full"
                onClick={async () => {
                    const address = await fetchLocationInfo(
                        cords.longtitud,
                        cords.latitud
                    );
                    setInfo((prev) => ({
                        ...prev,
                        ...cords,
                        address,
                    }));
                    close();
                }}
            />
        </Modal>
    );
};

export default PickFromMap;
