export const readFile = (
    file: File
): Promise<{ src: string; pdfPages?: number }> => {
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.readAsBinaryString(file);
        reader.onloadend = async () => {
            var pdfPages = (reader.result as string).match(
                /\/Type[\s]*\/Page[^s]/g
            )?.length;
            console.log("page" + pdfPages);
            reader.readAsDataURL(file);
            reader.onloadend = async (progress) => {
                resolve({
                    src: reader.result as string,
                    pdfPages: pdfPages || 1,
                });
            };
        };
    });
};
