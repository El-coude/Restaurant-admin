import { useEffect, useState } from "react";
import { Button } from "@fast-monorepo/shared/index";
import AddRestaurantModal from "../../components/dashboard/AddRestaurantModal";
import useRestaurantStore from "../../store/RestaurantStore";

const Restaurants = () => {
    const { restaurants, getRestaurants } = useRestaurantStore(
        (state) => state
    );
    useEffect(() => {
        getRestaurants();
    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAddRestaurant = () => {
        setAddModalVisible(true);
    };
    return (
        <>
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl ">Restaurants</h1>
                <Button
                    label="CREATE RESTAURANT"
                    onClick={handleAddRestaurant}
                />
                {addModalVisible && (
                    <AddRestaurantModal setVisible={setAddModalVisible} />
                )}
            </div>
            <div>
                {restaurants.map((rest, i) => (
                    <div className="flex gap-4">
                        <p>{rest.name}</p>
                        <p>{rest.city}</p>
                        <p>{rest.address}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Restaurants;
