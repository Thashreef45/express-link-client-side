import { useState } from "react";
import axios from "axios";

const link = import.meta.env.VITE_CLOUDINARY_IMAGE

const useImageUpload = () => {
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = async (image:string) => {
        try {
            const data = new FormData();
            data.append("upload_preset", "Thashreef");
            data.append("cloud_name", "expresslink");
            data.append("file", image);

            const response = await axios.post(
                link,data
            );

            if (response.status === 200) {
                const url = response.data.url;
                setImageUrl(url);
                return url;
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return { imageUrl, uploadImage };
};

export default useImageUpload;
