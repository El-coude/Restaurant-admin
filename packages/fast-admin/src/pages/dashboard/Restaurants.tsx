import { useEffect, useState } from "react";
import {
    Button,
    Table,
    TableRow,
    TableRowDataType,
} from "@fast-monorepo/shared/index";
import AddRestaurantModal from "../../components/dashboard/AddRestaurantModal";
import useRestaurantStore from "../../store/RestaurantStore";
import Swal from "sweetalert2";
import AddManagerModal from "../../components/dashboard/AddManagerModal";
import { ImSpinner2 } from "react-icons/im";
import Container from "../../components/general/Container";

const Restaurants = () => {
    const { restaurants, getRestaurants, removeRestaurant, loading, error } =
        useRestaurantStore((state) => state);
    const [rows, setRows] = useState<TableRowDataType[]>([]);
    const [managerModal, setManagerModal] = useState<number | null>(null); // null invisible else restaurant id

    useEffect(() => {
        getRestaurants();
    }, []);

    useEffect(() => {
        let rows: TableRowDataType[] = [];
        restaurants.forEach((rest) => {
            rows.push({
                data: Object.values({
                    name: rest.name,
                    address: rest.address,
                    city: rest.city,
                    manager: rest.manager ? (
                        rest.manager.name
                    ) : (
                        <Button
                            size="small"
                            ocbButton
                            label="Add manager"
                            onClick={() => setManagerModal(rest.id!)}
                        />
                    ),
                }),
            });
        });
        setRows([...rows]);
    }, [restaurants]);

    const [addModalVisible, setAddModalVisible] = useState(false);
    const handleAddRestaurant = () => {
        setAddModalVisible(true);
    };
    return (
        <Container className="h-screen">
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-2xl ">Restaurants</h1>
                <Button
                    label="Create restaurant"
                    onClick={handleAddRestaurant}
                />
                {addModalVisible && (
                    <AddRestaurantModal
                        close={() => setAddModalVisible(false)}
                    />
                )}
            </div>
            {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
            {error && <p className="text-center text-red-600">Network error</p>}
            {rows.length > 0 && (
                <div>
                    <Table header={["Name", "Adresse", "City", "Manager", ""]}>
                        {rows.map((row, i) => (
                            <>
                                <TableRow row={row} key={i} />
                                <Button
                                    size="small"
                                    label="remove"
                                    backgroundColor="red"
                                    color="#fff"
                                    onClick={async () => {
                                        const res = await Swal.fire({
                                            text: "Are you sure you want to remove",
                                            showDenyButton: true,
                                            denyButtonText: "Cancel",
                                            confirmButtonText: "Confirm",
                                        });
                                        if (res.isConfirmed)
                                            removeRestaurant(
                                                restaurants[i].id!
                                            );
                                    }}
                                />
                            </>
                        ))}
                    </Table>
                </div>
            )}

            {managerModal != null && (
                <AddManagerModal
                    restaurantId={managerModal}
                    close={() => setManagerModal(null)}
                />
            )}
        </Container>
    );
};

export default Restaurants;
