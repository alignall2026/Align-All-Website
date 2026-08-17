// ==============================================================
// Google Apps Script for Align-All Giveaway ONLY
// Paste this in Extensions > Apps Script of a NEW Spreadsheet
// ==============================================================

var GIVEAWAY_SHEET_NAME = "Sheet1"; // Default first tab in a new Google Sheet

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
  
  // Set up header columns if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Full Name", "Designation / Clinic"]);
    sheet.getRange("A1:C1").setFontWeight("bold").setBackground("#FFD700").setFontColor("#000000");
    sheet.setFrozenRows(1);
  }
}

// Receive form registrations from users
function doPost(e) {
  setupSheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    var params = e.parameter;
    var sheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
    var timestamp = new Date();
    var fullName = params.fullName || params.name || "";
    var designation = params.designation || params.clinic || "";
    
    sheet.appendRow([timestamp, fullName, designation]);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Giveaway registration successful!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Send registrations to the host lucky draw screen (draw.html)
function doGet(e) {
  setupSheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
  
  var rows = sheet.getDataRange().getValues();
  var data = [];
  
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (row[1]) {
      data.push({
        name: row[1],
        designation: row[2] || 'Participant'
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    result: "success",
    entries: data
  })).setMimeType(ContentService.MimeType.JSON);
}
