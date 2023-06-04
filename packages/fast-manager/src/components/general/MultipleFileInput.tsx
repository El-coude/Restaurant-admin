import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import upload from "../../assets/upload.png";
import { readFile } from "@fast-monorepo/shared/index";

export interface MultipleFileInputElement extends HTMLInputElement {
    selectedFiles: FileType[];
}
export type FileType = {
    src: string;
    pdfPages?: number;
};

type PropsType = {
    text?: string;
    onChange?: () => void;
    onDragOver?: () => void;
    name: string;
    ref?: React.MutableRefObject<MultipleFileInputElement>;
    onRemove?: () => void;
};
const MultipleFileInput = forwardRef<MultipleFileInputElement, PropsType>(
    (props, ref) => {
        const input = useRef<MultipleFileInputElement>(null!);
        useImperativeHandle(ref, () => input.current);
        const [draggingFile, setDraggingFile] = useState(false);

        const handleOnDrop = (ev: React.DragEvent<HTMLInputElement>) => {
            ev.preventDefault();

            const files: File[] = [];
            if (ev.dataTransfer.items) {
                // Use DataTransferItemList interface to access the file(s)
                [...ev.dataTransfer.items].forEach((item, i) => {
                    // If dropped items aren't files, reject them
                    if (item.kind === "file") {
                        const file = item.getAsFile();
                        if (file) {
                            files.push(file);
                        }
                    }
                });
            } else {
                // Use DataTransfer interface to access the file(s)
                [...ev.dataTransfer.files].forEach((file, i) => {
                    console.log(`… file[${i}].name = ${file.name}`);
                    files.push(file);
                });
            }
            readSelectedFiles(files);
            setDraggingFile(false);
        };

        const readSelectedFiles = async (files: File[] | FileList | null) => {
            const atts: FileType[] = [];

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const fileSrc = await readFile(files[i]);
                    atts.push({ ...fileSrc });
                }
                input.current.selectedFiles = atts;
                /* setSelectedFileSrc(fileSrc); */
            }
            props.onChange && props.onChange();
        };
        return (
            <div className="w-full">
                <div
                    onDragOver={(e) => {
                        e.stopPropagation();
                        setDraggingFile(true);
                    }}
                    onClick={() => input.current.click()}
                    className={`text-secondary cursor-pointer rounded-lg border border-secondary border-dashed text-center py-3 h-11 -mt-1 text-xl flex items-center justify-center gap-4`}>
                    <img src={upload} className="h-4" />
                    <p className="text-center text-xs text-grey-2">
                        {props.text}
                    </p>
                </div>
                <input
                    ref={input}
                    type="file"
                    className={`${
                        draggingFile
                            ? "bg-black opacity-20 fixed z-50 w-full h-full top-0 left-0 file:hidden text-transparent"
                            : "hidden"
                    }`}
                    onDrop={(e) => handleOnDrop(e)}
                    onDragLeaveCapture={(e) => {
                        e.stopPropagation();
                        setDraggingFile(false);
                    }}
                    name={props.name}
                    onChange={() => readSelectedFiles(input.current.files)}
                    multiple={true}
                />
            </div>
        );
    }
);

export default MultipleFileInput;
