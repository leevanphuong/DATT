import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: "db4xq5lij",
    api_key: "681173186842651",
    api_secret: 'k-to1uHffNmL4lFjfTt8FZYCMK8'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'DATTPOLY',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        public_id: (req, file) => `${file.originalname}`,
    }
})
const upload = multer({ storage })
export default upload