// UI
var importUI = new Window("palette", "Import Text for DocSpots", undefined);

var directions = importUI.add("statictext", undefined, "Please be sure that the CSV is formatted correctly.");
directions.alignment = ["center", "top"];

var button = importUI.add("group", undefined, "button");
var importCSV = button.add("button", undefined, "Import CSV File");

importCSV.onClick = function() {
    importFile();
}

importUI.center();
importUI.size = [300, 100];
importUI.show();

// Import
function importFile() {
  app.beginUndoGroup("Create Text Layers From CSV");

  // prompt to select DS frame CSV file
  var csvFile = File.openDialog("Please select input CSV file.", "CSV Files:*.csv");

  if (csvFile != null) {
      // open file
      var fileOK = csvFile.open("r");
      if (fileOK) {
          // read file contents
          var fileContents = csvFile.read();
          csvFile.close();

          // create project if necessary
          var proj = app.project;
          if (!proj) proj = app.newProject();

          // split file contents into rows
          var rows = fileContents.split("\n");

          // create new comp for each row
          for (var i = 0; i < rows.length; i++) {
            var rowColumns = rows[i].split(";"); // using ";" in case the content has a ",".  csv-writer only supports comma or semicolons.

            if (i === 0) {
              // header row
              var headerColumns = rowColumns;
            } else {
              // data row
              if (rowColumns.length != headerColumns.length) {
                alert("Row " + i + " has an invalid number of columns");
                continue;
              }

              var id = rowColumns[0];
              var compW = 1920; // comp width, assuming these...
              var compH = 1080; // comp height
              var compL = 30;  // comp length (seconds)
              var compRate = 24; // comp frame rate
              var compBG = [1, 1, 1];
              var comp = proj.items.addComp(id, compW, compH, 1, compL, compRate);
              comp.bgColor = compBG;

              // create text layers for row
              for (var c = 1; c < rowColumns.length; c++) {
                var textLayer = comp.layers.addText(rowColumns[c]);
                textLayer.name = headerColumns[c];
                textLayer.position.setValue([0, compH / 2 - c * 50]);

                var textProp = textLayer.property("ADBE Text Properties").property("ADBE Text Document"),
                layerFontSize = textProp.value;

                // Set font size for each of the 4 text layers
                if (headerColumns[c] == "Eyebrow copy") {
                  // update fontsize
                  layerFontSize.fontSize = 15;
                  textProp.setValue(layerFontSize);
                } else if (headerColumns[c] == "Body copy 1") {
                  // update fontsize
                  layerFontSize.fontSize = 40;
                  textProp.setValue(layerFontSize);
                } else if (headerColumns[c] == "Body copy 2") {
                  // update fontsize
                  layerFontSize.fontSize = 40;
                  textProp.setValue(layerFontSize);
                } else if (headerColumns[c] == "Footnote copy") {
                  layerFontSize.fontSize = 10;
                  textProp.setValue(layerFontSize);
                }
              }
            }
          }
        } else {
          alert("File open failed!");
      }
  } else {
      alert("No CSV file was selected.");
  }

  app.endUndoGroup();
  importUI.close();
}
