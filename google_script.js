/**
 * Google Apps Script for Align-All Giveaway & Bookings
 * 
 * Paste this script into Extensions > Apps Script in your Google Sheet.
 * Click "Deploy" > "New Deployment", select "Web App", execute as "Me", and set Access to "Anyone".
 * Replace the scriptURL in your frontend files with the deployment web app URL.
 */

// Name of the sheet tabs
var BOOKINGS_SHEET_NAME = "Sheet1"; // Or your main bookings sheet name
var GIVEAWAY_SHEET_NAME = "Giveaway";

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Ensure Giveaway sheet exists
  var giveawaySheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
  if (!giveawaySheet) {
    giveawaySheet = ss.insertSheet(GIVEAWAY_SHEET_NAME);
    giveawaySheet.appendRow(["Timestamp", "Full Name", "WhatsApp / Phone", "Designation / Clinic"]);
    giveawaySheet.getRange("A1:D1").setFontWeight("bold").setBackground("#FFD700").setFontColor("#000000");
    giveawaySheet.setFrozenRows(1);
  }
}

function doPost(e) {
  setupSheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    var params = e.parameter;
    
    // Check if this is a giveaway form submission
    if (params.formType === "giveaway" || params.whatsapp) {
      var sheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
      var timestamp = new Date();
      var fullName = params.fullName || params.name || "";
      var whatsapp = params.whatsapp || params.phone || "";
      var designation = params.designation || params.clinic || "";
      
      // Append row to Giveaway sheet
      sheet.appendRow([timestamp, fullName, whatsapp, designation]);
      
      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        message: "Giveaway registration successful!"
      })).setMimeType(ContentService.MimeType.JSON);
    } 
    
    // Fallback: Default Booking Form Submission (if they use the same URL for both)
    var sheet = ss.getSheetByName(BOOKINGS_SHEET_NAME);
    var timestamp = new Date();
    
    // Extract default booking fields from standard form data
    var formType = params.formType || "doctor";
    var docName = params.docName || "";
    var clinicName = params.clinicName || "";
    var patientName = params.patientName || "";
    var patientCity = params.patientCity || "";
    var contactEmail = params.contactEmail || "";
    var contactPhone = params.contactPhone || "";
    var comments = params.comments || "";
    
    sheet.appendRow([
      timestamp, 
      formType, 
      docName, 
      clinicName, 
      patientName, 
      patientCity, 
      contactEmail, 
      contactPhone, 
      comments
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Booking submitted successfully!"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  setupSheet();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(GIVEAWAY_SHEET_NAME);
  
  // Get all rows in the Giveaway sheet (skipping the header)
  var rows = sheet.getDataRange().getValues();
  var data = [];
  
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    // Check if name is not empty
    if (row[1]) {
      data.push({
        timestamp: row[0],
        name: row[1],
        whatsapp: row[2],
        designation: row[3]
      });
    }
  }
  
  // Return JSON array of entries
  return ContentService.createTextOutput(JSON.stringify({
    result: "success",
    count: data.length,
    entries: data
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type"
  });
}
