const Image=require('../models/imageSchema');
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require('path');

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());
const uploade= async (req, res) => {
    try {
      const imageData = req.body.imageData;
      const email = 'omprakash@gmail.com'
      const base64Data = imageData;
      const uploadFolderPath = './uploads';
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath);
      }
      const date = new Date();
      const formattedDate = `${(date.getMonth() + 1)}-${date.getDate()}-${date.getFullYear()}`;
      const dynamicFilename = `${formattedDate}_nameOfEmployee_.jpg`;
      // const dynamicFilename = `output_${Date.now()}.jpg`; // Example: output_1646637389763.jpg
  
      const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const filePath = path.join(uploadFolderPath, dynamicFilename);
  
  
      const imageBuffer = Buffer.from(base64Image, 'base64');
      fs.writeFile(filePath, imageBuffer, 'base64', (err) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Image saved successfully');
        }
      });
      if (!imageData) {
        return res.status(400).send('Image data is missing');
      }
  
      // Store image path in MongoDB
      const newImage = await Image.create({ email: email, imagePath: filePath });
      console.log("Image uploaded:", newImage);
  
      res.status(200).send('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).send('Internal server error');
    }
  }



  module.exports={uploade}