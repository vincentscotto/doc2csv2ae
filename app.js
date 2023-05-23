const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');
const convertWordToCSV = require('./word2csv');
const path = require('path');

const app = express();
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

const tempFolderPath = path.join(__dirname, 'cache');
if (!fs.existsSync(tempFolderPath)) {
  fs.mkdirSync(tempFolderPath);
}

app.post('/convert', (req, res) => {
  const wordFile = req.files.wordFile;

  if (!wordFile) {
    return res.status(400).send('No file was uploaded.');
  }

  const inputPath = path.join(tempFolderPath, wordFile.name);
  const outputFileName = path.parse(wordFile.name).name + '.csv';
  const outputPath = path.join(tempFolderPath, outputFileName);

  wordFile.mv(inputPath, (error) => {
    if (error) {
      console.error('Error uploading file:', error);
      return res.status(500).send('File upload failed.');
    }

    convertWordToCSV(inputPath, outputPath)
      .then(() => {
        console.log('CSV conversion completed:', outputFileName);

        const downloadUrl = `/download/${encodeURIComponent(outputFileName)}`;
        res.send(downloadUrl);
      })
      .catch((error) => {
        console.error('Conversion error:', error);
        res.status(500).send('Conversion failed.');
      });
  });
});

app.get('/download/:fileName', (req, res) => {
  const fileName = decodeURIComponent(req.params.fileName);
  const filePath = path.join(tempFolderPath, fileName);

  res.download(filePath, (error) => {
    if (error) {
      console.error('Error downloading file:', error);
      res.status(500).send('File download failed.');
    } else {
      // Delete the file after it has been downloaded
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        } else {
          console.log('Cached file deleted successfully:', fileName);
        }
      });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Opening http://localhost:${port}.`);
  console.log(`Press ctrl-c to shutdown server.`)
});
const url = 'http://localhost:3000';
require('child_process').exec(`open ${url}`);

app.post('/terminate', (req, res) => {
  console.log('Terminating Node.js process...');
  res.send('Node.js process terminated.');
  process.exit();
});
