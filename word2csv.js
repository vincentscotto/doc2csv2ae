const fs = require('fs');
const mammoth = require('mammoth');
const csvWriter = require('csv-writer');

function convertWordToCSV(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const options = {
      styleMap: [
        'p[style-name="Eyebrow copy"] => Eyebrow copy',
        'p[style-name="Body copy 1"] => Body copy 1',
        'p[style-name="Body copy 2"] => Body copy 2',
        'p[style-name="Footnote copy"] => Footnote copy',
      ],
    };

    mammoth
      .extractRawText({ path: inputPath }, options)
      .then((result) => {
        const paragraphs = result.value.split('\n');
        const frames = [];

        let frame = {};
        let frameIndex = 1;

        let currentHeader = '';

        for (const paragraph of paragraphs) {
          if (paragraph.startsWith('Frame')) {
            if (Object.keys(frame).length > 0) {
              frames.push(frame);
              frame = {};
            }
            frame['ID'] = `Frame ${frameIndex++}`;
          } else if (paragraph !== '=== FRAME END ===') {
            if (paragraph.includes(': ')) {
              const separatorIndex = paragraph.indexOf(': ');
              const key = paragraph.substring(0, separatorIndex);
              const value = paragraph.substring(separatorIndex + 2).trim();
              frame[key] = value;
              currentHeader = key;
            } else if (currentHeader) {
              frame[currentHeader] += ' ' + paragraph.trim();
            }
          }
        }

        if (Object.keys(frame).length > 0) {
          frames.push(frame);
        }

        const csvHeader = [
          { id: 'ID', title: 'ID' },
          { id: 'Eyebrow copy', title: 'Eyebrow copy' },
          { id: 'Body copy 1', title: 'Body copy 1' },
          { id: 'Body copy 2', title: 'Body copy 2' },
          { id: 'Footnote copy', title: 'Footnote copy' },
        ];

        const csvWriterOptions = {
          header: csvHeader,
          path: outputPath,
          fieldDelimiter: ';',
        };

        const csvData = frames.map((frame) => ({
          ID: frame['ID'] || '',
          'Eyebrow copy': frame['Eyebrow copy'] || '',
          'Body copy 1': frame['Body copy 1'] || '',
          'Body copy 2': frame['Body copy 2'] || '',
          'Footnote copy': frame['Footnote copy'] || '',
        }));

        const writer = csvWriter.createObjectCsvWriter(csvWriterOptions);

        writer
          .writeRecords(csvData)
          .then(() => {
            console.log('\nCSV file has been written successfully.');
            resolve(outputPath);
          })
          .catch((error) => {
            console.error('Error writing CSV file:', error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error('Error extracting text from the Word document:', error);
        reject(error);
      });
  });
}

module.exports = convertWordToCSV;
