import { Cloudinary } from 'cloudinary-core'; 

const cloudinaryConfig = new Cloudinary({
  cloud: {
    cloudName: 'dhpzonbdq',
    cloudPublicId: 'image/UserAvatar.jpg',
  }
});

export default cloudinaryConfig;
