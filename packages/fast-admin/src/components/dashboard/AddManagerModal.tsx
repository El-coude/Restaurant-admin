import { useRef } from "react";
import { Button, Input } from "@fast-monorepo/shared/index";
import useManagersStore from "../../store/ManagerStore";
import Modal from "../general/Modal";

const AddManagerModal = ({
    restaurantId,
    close,
}: {
    restaurantId: number;
    close: () => void;
}) => {
    const name = useRef<HTMLInputElement>(null!);
    const email = useRef<HTMLInputElement>(null!);

    const errLabel = useRef<HTMLParagraphElement>(null!);

    const { addManager } = useManagersStore((state) => state);
    return (
        <Modal close={close}>
            <div className="flex flex-col gap-4">
                <Input ref={name} label="Managers name" type="text" />
                <Input ref={email} label="Managers city" type="text" />

                <p className="text-rose-500" ref={errLabel}></p>
                <Button
                    label="Confirm"
                    ocbButton
                    onClick={() =>
                        addManager(
                            {
                                name: name.current.value,
                                email: email.current.value,
                                restaurantId,
                            },
                            () => {
                                close();
                            },
                            (err) =>
                                (errLabel.current.innerText =
                                    "Could not add manager")
                        )
                    }
                />
            </div>
        </Modal>
    );
};

export default AddManagerModal;
