const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");
// const convertWordToCSV = require("./word2csv-original");
const convertWordToCSV = require("./word2csv");

const path = require("path");

const app = express();
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

const cacheFolderPath = path.join(__dirname, "cache");
if (!fs.existsSync(cacheFolderPath)) {
	fs.mkdirSync(cacheFolderPath);
}

app.post("/convert", (req, res) => {
	const wordFile = req.files.wordFile;

	if (!wordFile) {
		return res.status(400).send("No file was uploaded.");
	}

	const inputPath = path.join(cacheFolderPath, wordFile.name);
	const outputFileName = path.parse(wordFile.name).name + ".csv";
	const outputPath = path.join(cacheFolderPath, outputFileName);

	wordFile.mv(inputPath, error => {
		if (error) {
			console.error("Error uploading file:", error);
			return res.status(500).send("File upload failed.");
		}

		convertWordToCSV(inputPath, outputPath)
			.then(() => {
				console.log("CSV conversion completed:", outputFileName);

				const downloadUrl = `/download/${encodeURIComponent(outputFileName)}`;
				res.send(downloadUrl);

				// remove the temp created word doc after we're done with it.
				fs.unlink(inputPath, unlinkError => {
					if (unlinkError) {
						console.error("Error deleting file:", unlinkError);
					} else {
						console.log(
							"Temporary document deleted successfully:",
							wordFile.name
						);
					}
				});
			})
			.catch(error => {
				console.error("Conversion error:", error);
				res.status(500).send("Conversion failed.");

				// uh oh.. we got probs buddy
				fs.unlink(inputPath, unlinkError => {
					if (unlinkError) {
						console.error("Error deleting file:", unlinkError);
					} else {
						console.log(
							"Temporary document deleted successfully:",
							wordFile.name
						);
					}
				});
			});
	});
});

app.get("/download/:fileName", (req, res) => {
	const fileName = decodeURIComponent(req.params.fileName);
	const filePath = path.join(cacheFolderPath, fileName);

	res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

	const fileStream = fs.createReadStream(filePath);
	fileStream.pipe(res);

	fileStream.on("end", () => {
		console.log("CSV file sent:", fileName);
	});

	fileStream.on("error", error => {
		console.error("Error reading file:", error);
		res.status(500).send("File download failed.");
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
	console.log(`Opening http://localhost:${port}.`);
	console.log(`Press ctrl-c to shutdown server.`);
});

const url = "http://localhost:3000";
require("child_process").exec(`open ${url}`);

app.post("/terminate", (req, res) => {
	console.log("Terminating Node.js process...");
	res.send("Node.js process terminated.");
	process.exit();
});
