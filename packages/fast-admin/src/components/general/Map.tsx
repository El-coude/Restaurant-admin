import mapbox, { Layer, Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "./Modal";
import { Button } from "@fast-monorepo/shared/index";
import Geo from "@mapbox/mapbox-sdk/services/geocoding";
import { FaMapMarkerAlt } from "react-icons/fa";

const PickFromMap = ({
    close,
    setInfo,
    defaultPos,
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
    defaultPos?: [number, number];
}) => {
    const [cords, setCords] = useState({
        longtitud: defaultPos ? defaultPos[1] : 1.105,
        latitud: defaultPos ? defaultPos[0] : 34.906,
    });
    useEffect(() => {
        mapbox.accessToken =
            "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q";
        const map = new Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [
                defaultPos ? defaultPos[1] : 1.105,
                defaultPos ? defaultPos[0] : 34.906,
            ], // Set the initial center of the map
            zoom: 6, // Set the initial zoom level
        });
        map.on("dragend", (e) => {
            var lngLat = map.getCenter();
            console.log(map.getCenter());
            setCords((prev) => ({
                longtitud: lngLat.lng,
                latitud: lngLat.lat,
            }));
        });
    }, []);

    const fetchLocationInfo = async (longitude: number, latitude: number) => {
        const geo = Geo({
            accessToken:
                "pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q",
            /*   Map.accessToken = 'YOUR_ACCESS_TOKEN'; */
        });
        try {
            // Make a reverse geocoding request
            console.log([longitude, latitude]);
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
            <div id="map" className="mb-4 h-[468px] w-[468px] relative">
                <div>
                    <FaMapMarkerAlt
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                        size={40}
                    />
                </div>
            </div>
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
