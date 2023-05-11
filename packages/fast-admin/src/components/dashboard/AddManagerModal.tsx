import { useRef } from "react";
import { Input } from "@fast-monorepo/shared/index";
import useManagersStore, { Manager } from "../../store/ManagerStore";
import Modal from "../general/Modal";
import { useForm } from "react-hook-form";

const AddManagerModal = ({
    restaurantId,
    close,
    onSuccess,
}: {
    restaurantId: number;
    close: () => void;
    onSuccess: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const add = (info: any) => {
        addManager(
            {
                name: info.name,
                email: info.email,
                restaurantId,
            },
            () => {
                onSuccess();
                close();
            },
            (err) => (errLabel.current.innerText = "Could not add manager")
        );
    };

    const errLabel = useRef<HTMLParagraphElement>(null!);
    const { addManager } = useManagersStore((state) => state);

    return (
        <Modal close={close}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(add)}>
                <Input
                    label="Manager's email"
                    type="text"
                    {...register("email", {
                        pattern:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        required: true,
                    })}
                />
                {errors.email?.type == "required" && (
                    <p className="text-error text-sm">Email can't be empty</p>
                )}
                {errors.email?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid email format</p>
                )}
                <Input
                    label="Manager's name"
                    type="text"
                    {...register("name", { required: true })}
                />

                {errors.name && (
                    <p className="text-error text-sm">Name can't be empty</p>
                )}

                <p className="text-rose-500" ref={errLabel}></p>
                <button
                    type="submit"
                    className="btn btn-secondary btn-block text-white">
                    Confirm
                </button>
            </form>
        </Modal>
    );
};

export default AddManagerModal;
