// ==========================================
// Google Apps Script untuk Facilities Helpdesk
// Copy-paste code ini ke Google Apps Script
// ==========================================

// ==================== SETUP ====================
// 1. Buka Google Sheet kosong di docs.google.com/spreadsheets
// 2. Klik Extensions → Apps Script
// 3. Ganti semua kode dengan code di bawah ini
// 4. Jalankan fungsi "doPost" (pilih untuk jalankan setup)
// 5. Deploy sebagai Web App (Deploy > New Deployment > Web app)
// 6. Copy Deployment ID ke HTML file

// ==================== CONFIG ====================
const SHEET_NAME = 'Complaints'; // Nama sheet (dibuat otomatis)
const PHOTO_FOLDER_ID = null; // Opsional: folder ID untuk simpan foto

// ==================== INITIALIZATION ====================
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Facilities Helpdesk')
        .addItem('Setup Database', 'setupDatabase')
        .addItem('View Stats', 'viewStats')
        .addToUi();
}

function setupDatabase() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        const headers = [
            'ID',
            'Waktu Lapor',
            'Nama Pelapor',
            'Unit Sekolah',
            'Kendala Fasilitas',
            'Status',
            'Nama Penutup',
            'Waktu Selesai',
            'Foto URL',
            'Foto Base64'
        ];
        
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
        sheet.getRange(1, 1, 1, headers.length).setBackground('#f3f4f6');
        
        // Set column widths
        sheet.setColumnWidth(1, 50);  // ID
        sheet.setColumnWidth(2, 150); // Waktu
        sheet.setColumnWidth(3, 150); // Nama
        sheet.setColumnWidth(4, 100); // Unit
        sheet.setColumnWidth(5, 250); // Kendala
        sheet.setColumnWidth(6, 100); // Status
        sheet.setColumnWidth(7, 120); // Penutup
        sheet.setColumnWidth(8, 150); // Waktu Selesai
        sheet.setColumnWidth(9, 150); // Foto URL
        sheet.setColumnWidth(10, 50);  // Foto Base64
        
        Logger.log('✅ Database setup selesai');
    }
}

// ==================== WEB APP HANDLERS ====================
function doGet(e) {
    return HtmlService.createHtmlOutput('Helpdesk System - Form submission endpoint is ready');
}

function doPost(e) {
    try {
        const payload = JSON.parse(e.postData.contents);
        
        // Route ke function yang sesuai
        if (payload.action === 'addComplaint') {
            return addComplaint(payload);
        } else if (payload.action === 'updateStatus') {
            return updateStatus(payload);
        } else if (payload.action === 'getAllComplaints') {
            return getAllComplaints();
        }
        
    } catch(error) {
        Logger.log('Error: ' + error);
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// ==================== COMPLAINT OPERATIONS ====================
function addComplaint(data) {
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    try {
        // Generate ID
        const lastRow = sheet.getLastRow();
        const id = lastRow > 1 ? parseInt(sheet.getRange(lastRow, 1).getValue() || 0) + 1 : 1;
        
        // Save photo jika ada
        let photoUrl = '';
        let photoBase64 = '';
        
        if (data.fotoBase64) {
            // Simpan base64 langsung ke sheet (limit: 50MB per sheet)
            // Untuk production, upload ke Drive/Cloud Storage
            photoBase64 = data.fotoBase64.substring(0, 100000); // Truncate jika terlalu besar
        }
        
        // Prepare row data
        const rowData = [
            id,                                    // ID
            data.waktuLapor || new Date(),        // Waktu Lapor
            data.namaPerlapor || '',              // Nama Pelapor
            data.unitSekolah || '',               // Unit Sekolah
            data.kendalaFasilitas || '',          // Kendala
            data.status || 'Baru',                // Status
            data.namaPenutup || '',               // Nama Penutup
            data.waktuSelesai || '',              // Waktu Selesai
            photoUrl,                             // Foto URL
            photoBase64                           // Foto Base64
        ];
        
        // Insert row
        sheet.appendRow(rowData);
        
        // Send email notification (optional)
        sendNotificationEmail(data);
        
        Logger.log('✅ Complaint added: ID ' + id);
        
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            id: id,
            message: 'Laporan berhasil disimpan'
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch(error) {
        Logger.log('❌ Error adding complaint: ' + error);
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function updateStatus(data) {
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    try {
        const range = sheet.getDataRange().getValues();
        
        // Find row dengan matching ID
        for (let i = 1; i < range.length; i++) {
            if (range[i][0] == data.id) {
                // Update status (kolom F = index 5)
                sheet.getRange(i + 1, 6).setValue(data.status);
                
                // Update nama penutup jika ada (kolom G = index 6)
                if (data.namaPenutup) {
                    sheet.getRange(i + 1, 7).setValue(data.namaPenutup);
                }
                
                // Update waktu selesai jika ada (kolom H = index 7)
                if (data.waktuSelesai) {
                    sheet.getRange(i + 1, 8).setValue(data.waktuSelesai);
                }
                
                Logger.log('✅ Status updated: ID ' + data.id);
                
                return ContentService.createTextOutput(JSON.stringify({
                    status: 'success',
                    message: 'Status berhasil diupdate'
                })).setMimeType(ContentService.MimeType.JSON);
            }
        }
        
        throw new Error('Complaint not found');
        
    } catch(error) {
        Logger.log('❌ Error updating status: ' + error);
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

function getAllComplaints() {
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    try {
        const range = sheet.getDataRange();
        const values = range.getValues();
        const headers = values[0];
        
        const complaints = [];
        
        for (let i = 1; i < values.length; i++) {
            const row = values[i];
            complaints.push({
                id: row[0],
                waktuLapor: row[1],
                namaPerlapor: row[2],
                unitSekolah: row[3],
                kendalaFasilitas: row[4],
                status: row[5],
                namaPenutup: row[6],
                waktuSelesai: row[7],
                fotoUrl: row[8],
                fotoBase64: row[9].substring(0, 100) // Truncate untuk response
            });
        }
        
        return ContentService.createTextOutput(JSON.stringify({
            status: 'success',
            data: complaints,
            total: complaints.length
        })).setMimeType(ContentService.MimeType.JSON);
        
    } catch(error) {
        Logger.log('❌ Error getting complaints: ' + error);
        return ContentService.createTextOutput(JSON.stringify({
            status: 'error',
            message: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// ==================== STATISTICS ====================
function viewStats() {
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    const range = sheet.getDataRange().getValues();
    
    let stats = {
        total: range.length - 1,
        baru: 0,
        diproses: 0,
        selesai: 0,
        byUnit: {
            PAUD: 0,
            SDIT: 0,
            SMPIT: 0,
            SMAIT: 0
        }
    };
    
    for (let i = 1; i < range.length; i++) {
        const status = range[i][5];
        const unit = range[i][3];
        
        if (status === 'Baru') stats.baru++;
        else if (status === 'Diproses') stats.diproses++;
        else if (status === 'Selesai') stats.selesai++;
        
        if (unit in stats.byUnit) {
            stats.byUnit[unit]++;
        }
    }
    
    Logger.log(JSON.stringify(stats, null, 2));
    
    const ui = SpreadsheetApp.getUi();
    ui.alert('📊 STATISTIK LAPORAN\n\n' +
        'Total: ' + stats.total + '\n' +
        'Baru: ' + stats.baru + '\n' +
        'Diproses: ' + stats.diproses + '\n' +
        'Selesai: ' + stats.selesai + '\n\n' +
        'Berdasarkan Unit:\n' +
        'PAUD: ' + stats.byUnit.PAUD + '\n' +
        'SDIT: ' + stats.byUnit.SDIT + '\n' +
        'SMPIT: ' + stats.byUnit.SMPIT + '\n' +
        'SMAIT: ' + stats.byUnit.SMAIT
    );
}

// ==================== EMAIL NOTIFICATIONS ====================
function sendNotificationEmail(data) {
    try {
        const recipient = 'media@ar-rahmahsulawesi.id'; // Ganti dengan email Anda
        const subject = `Laporan Baru: ${data.kendalaFasilitas.substring(0, 50)}...`;
        const body = `
Laporan Sarana Baru Diterima:

Nama Pelapor: ${data.namaPerlapor}
Unit: ${data.unitSekolah}
Waktu: ${data.waktuLapor}

Kendala:
${data.kendalaFasilitas}

Silakan login ke dashboard untuk menindaklanjuti laporan ini.

---
Sistem Pelaporan Sarana & Prasarana
Yayasan Ar-Rahmah Sulawesi
        `;
        
        // Uncomment untuk enable email
        // GmailApp.sendEmail(recipient, subject, body);
        // Logger.log('📧 Email sent to ' + recipient);
        
    } catch(error) {
        Logger.log('Email error (tidak critical): ' + error);
    }
}

// ==================== HELPER FUNCTIONS ====================
function getSheetUrl() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Sheet URL: ' + ss.getUrl());
}

// ==================== EXPORT FUNCTIONS ====================
function exportToCSV() {
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    let csv = '';
    for (let i = 0; i < values.length; i++) {
        const row = values[i].map(cell => {
            if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
                return '"' + cell.replace(/"/g, '""') + '"';
            }
            return cell;
        });
        csv += row.join(',') + '\n';
    }
    
    Logger.log('CSV exported, length: ' + csv.length);
}

// ==================== TRIGGER SETUP ====================
function setupTriggers() {
    // Hapus trigger yang ada
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
    
    // Buat trigger baru (optional)
    // ScriptApp.newTrigger('cleanupOldData')
    //     .timeBased()
    //     .everyDays(7)
    //     .atHour(2)
    //     .nearMinute(0)
    //     .inTimezone('Asia/Jakarta')
    //     .create();
    
    Logger.log('Triggers setup selesai');
}

// ==================== CLEANUP ====================
function cleanupOldData() {
    // Optional: Delete complaints older than 6 months
    setupDatabase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    const range = sheet.getDataRange().getValues();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    let deletedCount = 0;
    
    for (let i = range.length - 1; i >= 1; i--) {
        const rowDate = new Date(range[i][1]);
        if (rowDate < sixMonthsAgo && range[i][5] === 'Selesai') {
            sheet.deleteRow(i + 1);
            deletedCount++;
        }
    }
    
    Logger.log('Deleted ' + deletedCount + ' old records');
}
