import 'dotenv/config';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';

// CLOUDINARY CONFIG
export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    // If you don't specify a folder here the files will just be dumped into the media folder
    folder: 'sickfits',
};

export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'source',
        }),
        altText: text(),
        product: relationship({ ref: 'Product.photo' }),
    },
    ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product'],
        },
    },
});
