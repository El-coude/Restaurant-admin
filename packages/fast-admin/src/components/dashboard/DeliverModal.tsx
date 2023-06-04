import { useRef } from "react";
import { Input } from "@fast-monorepo/shared/index";
import useDeliversStore, { Deliver } from "../../store/DeliverStore";
import Modal from "../general/Modal";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";

const DeliverModal = ({
    close,
    prevValues,
}: {
    close: () => void;
    prevValues?: Deliver;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const { updateDeliver, loading } = useDeliversStore((state) => state);

    const submit = (info: any) => {
        updateDeliver(
            {
                id: prevValues?.id,
                name: info.name,
                phone: "+213" + info.phone,
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
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submit)}>
                <Input
                    label="Deliver's name"
                    type="text"
                    defaultValue={prevValues?.name}
                    {...register("name", { required: true })}
                />

                {errors.name && (
                    <p className="text-error text-sm">Name can't be empty</p>
                )}

                {errors.email?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid email format</p>
                )}

                <label>Deliver's phone</label>
                <div className="flex items-end gap-1">
                    <div className="bg-slate-50 rounded-md border border-black p-2">
                        +213
                    </div>
                    <Input
                        type="text"
                        defaultValue={prevValues?.phone.slice(4)}
                        {...register("phone", {
                            pattern: /^\d{9}$/,
                            required: true,
                        })}
                    />
                </div>
                {errors.phone?.type == "required" && (
                    <p className="text-error text-sm">Phone can't be empty</p>
                )}
                {errors.phone?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid phone format</p>
                )}

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

export default DeliverModal;
