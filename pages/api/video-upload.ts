import { v2 as cloudinary } from 'cloudinary';
import Formidable from 'formidable';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('response', res);
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const data = await new Promise<{ file: Formidable.File }>(
    (resolve, reject) => {
      const form = new Formidable.IncomingForm({
        keepExtensions: true,
        multiples: false,
      });
      console.log('form', form);
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ file: files.myFile as Formidable.File });
        console.log('err', err);
        console.log('fields', fields);
        console.log('files', files);
      });
    },
  );

  console.log('what is this data', data);

  console.log('data file', data.file);
  console.log('data file path', data.file.path);

  try {
    const uploadedVideo = await cloudinary.uploader.upload(
      data.file.path,
      { resource_type: 'video' },
      function (error, result) {
        console.log(result, error);
      },
    );
    res.statusCode = 200;
    res.json({ secure_url: uploadedVideo.secure_url });
    console.log('uploaded video', uploadedVideo);
    console.log('uploaded video url', uploadedVideo.secure_url);
  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({ secure_url: 'error' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default endpoint;
