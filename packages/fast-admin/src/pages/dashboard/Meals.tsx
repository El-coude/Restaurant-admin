import { useEffect, useState } from "react";
import AddMealModal from "../../components/dashboard/AddMealModal";
import useMealStore from "../../store/MealStore";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";
import Container from "../../components/general/Container";
import { MdDeleteForever } from "react-icons/md";
import { HiOutlineUserAdd } from "react-icons/hi";

const Meals = () => {
    const { meals, getMeals, removeMeal, loading, error } = useMealStore(
        (state) => state
    );
    const [updateRes, setUpdateRes] = useState<number | null>(null);

    useEffect(() => {
        getMeals();
    }, []);

    const [addModalVisible, setAddModalVisible] = useState(false);

    const handleAddMeal = () => {
        setAddModalVisible(true);
    };

    const handeRemove = async (id: number) => {
        const res = await Swal.fire({
            title: "Are you sure you want to remove Meal",
            showDenyButton: true,
            denyButtonText: "Cancel",
            confirmButtonText: "Confirm",
        });
        if (res.isConfirmed) removeMeal(id);
    };

    return (
        <Container className="min-h-screen">
            <div className=" ml-auto mb-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Meals</h1>
                <button
                    className="btn btn-secondary text-white"
                    onClick={handleAddMeal}>
                    Create Meal
                </button>
                {addModalVisible && (
                    <AddMealModal
                        action="create"
                        close={() => setAddModalVisible(false)}
                    />
                )}
            </div>
            {error && <p className="text-center text-red-600">Network error</p>}
            {loading && <ImSpinner2 className="spinner m-auto" size={28} />}
            {meals.length > 0 && (
                <div className="mb-40">
                    <table className="table w-full border-spacing-2">
                        <thead>
                            <tr className="bg-transparent [&>th]:bg-transparent ">
                                <th>MEAL</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {meals.map((meal, i) => (
                                <tr
                                    key={i}
                                    onClick={() => setUpdateRes(i)}
                                    className="text-sm hover:bg-slate-200 cursor-pointer [&>td]:bg-transparent">
                                    <td>
                                        {meal.images.length ? (
                                            <img
                                                src={meal.images[0]}
                                                className="w-20 h-24"
                                            />
                                        ) : (
                                            <>No Image</>
                                        )}
                                    </td>
                                    <td>{meal.name}</td>
                                    <td>{meal.price}</td>
                                    <td>
                                        <button
                                            className="btn btn-circle btn-ghost text-error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handeRemove(meal.id!);
                                            }}>
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {updateRes != null && (
                <AddMealModal
                    prevValues={meals[updateRes]}
                    action="update"
                    close={() => setUpdateRes(null)}
                />
            )}
        </Container>
    );
};

export default Meals;
