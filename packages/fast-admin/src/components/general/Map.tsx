import mapbox, { Layer, Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useEffect } from "react";
import Modal from "./Modal";
import { Button } from "@fast-monorepo/shared/index";

const PickFromMap = ({
    close,
    setInfo,
}: {
    close: () => void;
    setInfo: Dispatch<
        SetStateAction<{
            visible: boolean;
            lang: number;
            lat: number;
        }>
    >;
}) => {
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
            setInfo((prev) => ({
                ...prev,
                lang: lngLat.lng,
                lat: lngLat.lat,
            }));
        });
    }, []);
    return (
        <Modal close={close}>
            <div id="map" className="mb-4 h-[468px] w-[468px]"></div>
            <Button
                label="Confirm"
                className="w-full"
                onClick={() => close()}
            />
        </Modal>
    );
};

export default PickFromMap;
