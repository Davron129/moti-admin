import { RefObject, useState} from "react";
import { FileUploader} from "react-drag-drop-files";
import DropContainer from './DropContainer';

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

type DropFileInputProps = {
    setFile: Function,
    imageRef: RefObject<HTMLImageElement> 
}

function DropFileInput({ setFile, imageRef } : DropFileInputProps) {
    const [ isDropped, setIsDropped ] = useState<boolean>(false);

    const handleChange = (file: File) => {
        setFile(file);
        setIsDropped(true);
        if(imageRef && imageRef.current) {
            imageRef.current.src = URL.createObjectURL(file);
        }
        console.log(file)
    };

    const handleError = (err: ErrorEvent) => {
        console.log(err);
    }

    return (
        <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            onTypeError={handleError}
            children={<DropContainer isDropped={isDropped} />}
        />
    )
}

export default DropFileInput
