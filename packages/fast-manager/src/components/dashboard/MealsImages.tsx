import { Dispatch, SetStateAction, useRef, useState } from "react";
import MultipleFileInput, {
    MultipleFileInputElement,
} from "../general/MultipleFileInput";
import { MdDeleteForever } from "react-icons/md";

const MealsImages = ({
    images,
    setImages,
}: {
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
}) => {
    const imagesRef = useRef<MultipleFileInputElement>(null!);
    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <>
            <label>Choose meal images</label>
            <MultipleFileInput
                ref={imagesRef}
                name="images"
                text="Drag & drop images here"
                onChange={() =>
                    setImages([
                        ...images,
                        ...imagesRef.current?.selectedFiles.map(
                            (file) => file.src
                        ),
                    ])
                }
            />
            <div className="mb-2 flex  flex-wrap gap-2">
                {images.map((img, i) => (
                    <div
                        className="relative"
                        key={i}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}>
                        <img
                            src={img}
                            className="rounded-sm w-28 h-36 border-2 border-secondary"
                        />
                        {hovered == i && (
                            <div className="absolute flex items-center justify-center inset-0 w-full h-full bg-black opacity-90">
                                <button
                                    className="btn btn-circle btn-ghost text-error"
                                    onClick={(e) =>
                                        setImages([
                                            ...images.filter(
                                                (im) => im !== img
                                            ),
                                        ])
                                    }>
                                    <MdDeleteForever size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default MealsImages;
