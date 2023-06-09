const fs = require("fs");
const mammoth = require("mammoth");
const csvWriter = require("csv-writer");

function convertWordToCSV(inputPath, outputPath) {
	return new Promise((resolve, reject) => {
		const options = {
			styleMap: [
				'p[style-name="Eyebrow copy"] => Eyebrow copy',
				'p[style-name="Body copy 1"] => Body copy 1',
				'p[style-name="Body copy 2"] => Body copy 2',
				'p[style-name="Footnote copy"] => Footnote copy'
			]
		};

		mammoth
			.extractRawText({ path: inputPath }, options)
			.then(result => {
				const frames = [];
				let frame = null;
				let currentHeader = "";
				let isInFrame = false;

				const lines = result.value.split("\n");

				for (const line of lines) {
					if (line === "=== FRAME START ===") {
						frame = {};
						isInFrame = true;
					} else if (line === "=== FRAME END ===") {
						if (frame) {
							frames.push(frame);
							frame = null;
						}
						isInFrame = false;
					} else if (frame && isInFrame && line !== "") {
						const separatorIndex = line.indexOf(":");
						if (separatorIndex !== -1) {
							const key = line.substring(0, separatorIndex).trim();
							const value = line.substring(separatorIndex + 1).trim();
							frame[key] = value;
							currentHeader = key;
						} else if (currentHeader) {
							frame[currentHeader] += " " + line.trim();
						}
					}
				}

				const csvHeader = [
					{ id: "ID", title: "ID" },
					{ id: "Eyebrow copy", title: "Eyebrow copy" },
					{ id: "Body copy 1", title: "Body copy 1" },
					{ id: "Body copy 2", title: "Body copy 2" },
					{ id: "Footnote copy", title: "Footnote copy" }
				];

				const csvWriterOptions = {
					header: csvHeader,
					path: outputPath,
					fieldDelimiter: ";"
				};

				const csvData = frames.map((frame, index) => ({
					ID: `Frame ${index + 1}`,
					"Eyebrow copy": (frame["Eyebrow copy"] || "").trim(),
					"Body copy 1": (frame["Body copy 1"] || "").trim(),
					"Body copy 2": (frame["Body copy 2"] || "").trim(),
					"Footnote copy": (frame["Footnote copy"] || "").trim()
				}));

				const writer = csvWriter.createObjectCsvWriter(csvWriterOptions);

				writer
					.writeRecords(csvData)
					.then(() => {
						const csvContent = fs
							.readFileSync(outputPath, "utf-8")
							.replace(/\r?\n$/, "");
						fs.writeFileSync(outputPath, csvContent);
						console.log("\nCSV file has been written successfully.");
						resolve(outputPath);
					})
					.catch(error => {
						console.error("Error writing CSV file:", error);
						reject(error);
					});
			})
			.catch(error => {
				console.error("Error extracting text from the Word document:", error);
				reject(error);
			});
	});
}

module.exports = convertWordToCSV;
