import { useEffect, useRef, useState } from "react";
import { Input } from "@fast-monorepo/shared/index";
import useMealsStore, { Meal } from "../../store/MealStore";
import Modal from "../general/Modal";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import MealsImages from "./MealsImages";
import useCategoryStore, { Category } from "../../store/CategoriesStore";

const AddMealModal = ({
    close,
    action = "create",
    prevValues,
}: {
    close: () => void;
    action?: "update" | "create";
    prevValues?: Meal;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { addMeal, updateMeal, loading } = useMealsStore((state) => state);
    const [images, setImages] = useState<string[]>(prevValues?.images || []);
    const [selectedCategories, setSelectedCategories] = useState<number[]>(
        prevValues?.categoryIds || []
    );

    const { categorys, getCategorys } = useCategoryStore((state) => state);

    useEffect(() => {
        getCategorys();
    }, []);

    const submit = (info: any) => {
        if (action == "create")
            addMeal(
                {
                    name: info.name,
                    description: info.description,
                    price: `${info.price}`,
                    categoryIds: selectedCategories,
                    images: images,
                },
                () => {
                    close();
                },
                (err) => (errLabel.current.innerText = err)
            );
        else
            updateMeal(
                {
                    id: prevValues?.id,
                    name: info.name,
                    description: info.description,
                    price: `${info.price}`,
                    categoryIds: selectedCategories,
                    images: images,
                },
                () => {
                    close();
                },
                (err) => (errLabel.current.innerText = err)
            );
    };

    const errLabel = useRef<HTMLParagraphElement>(null!);

    return (
        <Modal close={close}>
            <form
                className="flex flex-col gap-4 w-[780px]"
                onSubmit={handleSubmit(submit)}>
                <div className="flex gap-4 items-start">
                    <div className="flex w-1/2 flex-col gap-4 border-r border-gray-200 pr-4">
                        <Input
                            label="Meal's name"
                            type="text"
                            defaultValue={prevValues?.name}
                            {...register("name", { required: true })}
                        />

                        {errors.name && (
                            <p className="text-error text-sm">
                                Name can't be empty
                            </p>
                        )}

                        <Input
                            label="Meal's price"
                            type="number"
                            defaultValue={prevValues?.price}
                            {...register("price", {
                                required: true,
                            })}
                        />
                        {errors.email?.type == "required" && (
                            <p className="text-error text-sm">
                                Price can't be empty
                            </p>
                        )}

                        <label>Meal's description</label>
                        <textarea
                            className="border border-black rounded-md p-2"
                            defaultValue={prevValues?.description}
                            {...register("description")}></textarea>
                    </div>
                    <div className="w-1/2 flex flex-col gap-4">
                        <MealsImages images={images} setImages={setImages} />
                    </div>
                </div>

                <label className="mt-4">Meal categories</label>

                {!categorys.length && (
                    <p className="text-red-600 text-sm mt-4">
                        Failed to load categories
                    </p>
                )}
                <div className="flex gap-4 ">
                    {categorys.map((cat, i) => (
                        <div
                            key={i}
                            className={`rounded-full py-4 px-2 w-40 text-center border-2 border-secondary hover:bg-secondary hover:text-white cursor-pointer ${
                                selectedCategories.includes(cat.id!)
                                    ? "bg-secondary text-white"
                                    : "text-secondary"
                            }`}
                            onClick={() => {
                                if (!selectedCategories.includes(cat.id!))
                                    setSelectedCategories([
                                        ...selectedCategories,
                                        cat.id!,
                                    ]);
                                else
                                    setSelectedCategories(
                                        selectedCategories.filter(
                                            (c) => c !== cat.id
                                        )
                                    );
                            }}>
                            {cat.name}
                        </div>
                    ))}
                </div>

                <p className="text-rose-500" ref={errLabel}></p>
                <button
                    type="submit"
                    className="btn btn-secondary btn-block text-white flex gap-2">
                    {loading && <ImSpinner2 className="spinner" size={14} />}
                    Confirm
                </button>
            </form>
        </Modal>
    );
};

export default AddMealModal;
