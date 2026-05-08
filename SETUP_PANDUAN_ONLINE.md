# 🚀 Sistem Pelaporan Sarana - Versi Online (Tanpa Instalasi)

**Status:** ✅ Siap Pakai  
**Waktu Setup:** 10-15 menit  
**Biaya:** Gratis (Google account saja)

---

## 📋 Apa Itu Versi Online?

✅ **Satu file HTML** → Buka langsung di browser  
✅ **Tanpa npm/instalasi** → Tidak perlu terminal  
✅ **Data ke Google Sheets** → Otomatis tersinkronisasi  
✅ **Responsive mobile** → Bekerja sempurna di HP  
✅ **Online 24/7** → Pakai kapan saja  

---

## 🎯 File-File Yang Anda Terima

1. **FacilitiesHelpdesk-Online.html** ← Ini yang dibuka di browser
2. **GoogleAppsScript-Backend.gs** ← Ini yang di-setup di Google Apps Script
3. **SETUP_PANDUAN.md** ← Panduan ini

---

## 🔧 SETUP LANGKAH DEMI LANGKAH

### STEP 1: Buat Google Sheet Kosong (2 menit)

1. Buka **Google Drive** → https://drive.google.com
2. Klik **+ Buat** → **Google Spreadsheet**
3. Beri nama: **"Sistem Pelaporan Sarana"** (atau nama lain)
4. Tunggu sheet terbuka

---

### STEP 2: Setup Google Apps Script (5 menit)

**2A. Buka Apps Script:**
1. Di Google Sheet Anda, klik **Ekstensi** (menu atas)
2. Klik **Apps Script**
3. Tab baru akan terbuka dengan editor kode

**2B. Ganti Kode:**
1. Di editor Apps Script, **hapus semua kode yang ada**
2. **Copy-paste seluruh kode** dari file `GoogleAppsScript-Backend.gs`
3. Klik **Simpan** (icon disket atau Ctrl+S)

**2C. Jalankan Setup:**
1. Di dropdown function (biasanya ada tulisan "Select function"), pilih **setupDatabase**
2. Klik tombol **▶ Eksekusi** / **Run**
3. Browser akan minta izin → Klik **Review permissions** → Pilih akun Anda
4. Beri izin dengan klik **Allow**
5. Di Log (bawah), akan muncul **✅ Database setup selesai**

---

### STEP 3: Deploy Web App (3 menit)

**3A. Deploy:**
1. Di editor Apps Script, klik **Deploy** (tombol biru, kanan atas)
2. Klik **New Deployment** (ikon + )
3. Di dropdown **Select type**, pilih **Web app**
4. Isi:
   - **Description:** Facilities Helpdesk
   - **Execute as:** Your Google Account
   - **Who has access:** Anyone
5. Klik **Deploy**

**3B. Salin Deployment ID:**
1. Popup akan muncul dengan deployment details
2. **Salin** URL yang mirip ini:
   ```
   https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/useFunctionByName
   ```
3. **Khususnya ambil bagian:** `YOUR_DEPLOYMENT_ID` (kode panjang di tengah URL)

---

### STEP 4: Update HTML File (1 menit)

1. Buka file **FacilitiesHelpdesk-Online.html** dengan text editor (Notepad++, VS Code, atau Sublime)
2. **Cari baris ini** (sekitar baris 407):
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/useFunctionByName?customFunction=addComplaint';
   ```
3. **Ganti `YOUR_DEPLOYMENT_ID`** dengan ID yang Anda copy dari STEP 3B
4. **Simpan file**

---

### STEP 5: Hosting File HTML (2 pilihan)

**PILIHAN A: Google Drive (PALING MUDAH)**
1. Buka Google Drive Anda
2. Upload file **FacilitiesHelpdesk-Online.html**
3. Klik kanan file → **Open with** → **Google Apps Script Editor**
4. Akan membuka di editor - tidak apa, tutup saja
5. Kembali ke Google Drive, klik kanan file lagi
6. Pilih **Get Link** → Copy link tersebut
7. Ubah URL dari:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```
   Menjadi:
   ```
   https://drive.google.com/uc?id=FILE_ID&export=download
   ```
8. **Buka URL yang sudah diubah** → Aplikasi akan terbuka! ✅

**PILIHAN B: GitHub Pages (GRATIS & MUDAH)**
1. Buat akun GitHub (gratis) → https://github.com
2. Buat repository baru → klik **New** → beri nama "helpdesk"
3. Upload file **FacilitiesHelpdesk-Online.html**
4. Di Settings → Pages → set Source ke "main branch"
5. URL-nya jadi: `https://username.github.io/helpdesk/FacilitiesHelpdesk-Online.html`

**PILIHAN C: Netlify (GRATIS)**
1. Buka https://netlify.com
2. Drag & drop file **FacilitiesHelpdesk-Online.html**
3. Selesai! Dapat URL instant

---

## ✅ TESTING

### Test Form Submission:
1. Buka aplikasi HTML Anda
2. Klik tab **"Formulir Pengaduan"**
3. Isi form:
   - Nama Pelapor: Ibu Siti
   - Unit: SDIT
   - Kendala: Test laporan
4. Klik **Kirim Laporan**
5. Akan muncul toast "Laporan berhasil dikirim"

### Test Dashboard:
1. Klik tab **"Dashboard"**
2. Lihat data muncul di table (bisa ada delay 2-3 detik)
3. Test filter
4. Test tombol "Proses" dan "Selesai"

### Verifikasi Data di Google Sheets:
1. Buka Google Sheet Anda (dari STEP 1)
2. Buka tab **"Complaints"** (sheet sebelah kanan)
3. Lihat data form Anda sudah tersimpan!

---

## 📱 CARA PAKAI SETELAH SETUP

### Untuk Staff/Guru yang Ingin Lapor:
1. Buka link aplikasi (dari STEP 5)
2. Klik **"Formulir Pengaduan"**
3. Isi form dengan detail kendala
4. Klik **Kirim Laporan**
5. Selesai! ✓

### Untuk Admin/Kepala Sarana:
1. Buka link aplikasi
2. Klik **"Dashboard"**
3. Lihat stat laporan (Baru, Diproses, Selesai)
4. Gunakan filter untuk sort
5. Klik **"Proses"** ketika mulai kerjakan
6. Klik **"Selesai"** dan masukkan nama saat selesai
7. Semua otomatis tersimpan di Google Sheets

---

## 📊 DATA TERSIMPAN DI MANA?

Semua data disimpan di **Google Sheets Anda:**
- **Nama:** "Sistem Pelaporan Sarana" (atau nama yang Anda buat)
- **Sheet:** Tab "Complaints" (dibuat otomatis)
- **Kolom:**
  - ID
  - Waktu Lapor
  - Nama Pelapor
  - Unit Sekolah
  - Kendala Fasilitas
  - Status (Baru/Diproses/Selesai)
  - Nama Penutup
  - Waktu Selesai
  - Foto URL
  - Foto Base64

**Keuntungan:**
✅ Data tersentralisasi  
✅ Backup otomatis di Google  
✅ Bisa diakses offline setelah sync  
✅ Mudah diexport ke CSV/Excel  
✅ Bisa share dengan tim  

---

## 🔗 SHARING LINK APLIKASI

Setelah setup selesai, **bagikan link aplikasi** Anda ke semua staff:

**Cara bagikan:**
1. Copy link aplikasi (dari STEP 5)
2. Kirim via:
   - ✅ WhatsApp
   - ✅ Email
   - ✅ Google Classroom
   - ✅ Buat QR Code (pakai qr-server.com)
3. Mereka bisa langsung membuka dan mulai lapor!

**Contoh link:**
```
https://yourusername.github.io/helpdesk/FacilitiesHelpdesk-Online.html
```

---

## 🆘 TROUBLESHOOTING

### Problem: "Failed to add complaint" atau tidak ada response

**Solusi:**
1. Pastikan **Deployment ID** sudah benar di HTML file
2. Pastikan URL sudah di-update dengan benar
3. Coba **refresh** Google Apps Script → Run setupDatabase lagi
4. Coba **deploy ulang** dengan New Deployment baru

### Problem: Data tidak muncul di Dashboard

**Solusi:**
1. Refresh halaman aplikasi (F5)
2. Tunggu 3-5 detik, bisa ada delay
3. Buka Google Sheet langsung → cek apakah data ada
4. Jika data ada di Sheet tapi tidak muncul di dashboard → ada bug di getAllComplaints, hubungi support

### Problem: Foto tidak bisa diupload

**Solusi:**
1. Ukuran file maksimal 5MB
2. Format harus JPG atau PNG
3. Google Sheets ada limit besar file base64
4. Untuk production: gunakan Google Drive API untuk simpan foto

### Problem: "Permission denied" saat deploy

**Solusi:**
1. Pastikan menggunakan akun Google Anda sendiri
2. Di Apps Script, set "Execute as" → pilih akun Anda
3. Set "Who has access" → Anyone
4. Deploy ulang

### Problem: Tidak bisa akses aplikasi dari HP

**Solusi:**
1. Pastikan link benar (copy dari URL bar)
2. Coba buka dengan browser berbeda (Chrome, Firefox)
3. Clear browser cache → CTRL+SHIFT+DELETE
4. Jika pakai Google Drive link → pastikan file di-share dengan "Anyone with the link"

---

## 📈 FITUR-FITUR

### ✅ Form Page
- Input nama pelapor
- Dropdown unit (PAUD, SDIT, SMPIT, SMAIT)
- Textarea deskripsi kendala
- Upload foto (optional)
- Form validation
- Success toast notification

### ✅ Dashboard Page
- **Stat Cards:** Jumlah laporan Baru/Diproses/Selesai
- **Filters:** Berdasarkan Unit & Status
- **Data Table:** Semua laporan dengan aksi buttons
- **Status Change:** 
  - Baru → Klik "Proses" → Diproses
  - Diproses → Klik "Selesai" → Modal tanya nama → Selesai
- **Photo Viewer:** Modal untuk lihat foto
- **Responsive:** Mobile-first design

### ✅ Backend (Google Apps Script)
- Automatic database setup
- POST handler untuk form submission
- GET handler untuk fetch data
- Update status function
- Email notification (optional)
- Data export to CSV (optional)

---

## 🔒 SECURITY & PRIVACY

### ✅ Keamanan Data
- Data tersimpan di Google Sheets Anda (terenkripsi)
- Backup otomatis 30 hari
- Akses kontrol bisa diatur per user

### ⚠️ Untuk Production:
1. **Batasi akses Google Sheet** → share hanya dengan admin
2. **Gunakan Google Sheet protected** → kurangi edit rights
3. **Monitor siapa yang akses** → Google Sheet ada activity log
4. **Backup regular** → Donwload as Excel setiap bulan

---

## 📞 SUPPORT & FAQ

### Q: Apakah gratis?
**A:** Ya! 100% gratis. Hanya butuh Google account (juga gratis).

### Q: Ada limit data?
**A:** Google Sheets free tier: unlimited rows (tapi max 5 juta cells per sheet). Cukup untuk ribuan laporan.

### Q: Bisa offline?
**A:** Google Sheets bisa offline (auto-sync saat online kembali). Aplikasi HTML butuh internet untuk POST/GET data.

### Q: Bisa multi-user?
**A:** Ya! Bisa share link ke siapa saja. Multiple user bisa submit laporan bersamaan. Google Sheet handle concurrent writes.

### Q: Bisa export data?
**A:** Yes! Langsung download dari Google Sheet sebagai CSV/Excel.

### Q: Custom domain?
**A:** Jika pakai GitHub Pages, bisa pakai custom domain (domain sendiri).

### Q: Bisa integrasi API lain?
**A:** Ya! Google Apps Script bisa integrasi dengan berbagai service (WhatsApp API, Email, Slack, dll).

### Q: Bagaimana update aplikasi?
**A:** Update HTML file → upload ke Google Drive/GitHub → done. Auto update untuk semua user.

---

## 📚 FILE REFERENCE

### FacilitiesHelpdesk-Online.html
- Ukuran: ~30KB
- Type: Single HTML file
- Tidak perlu build
- Buka langsung dengan browser

### GoogleAppsScript-Backend.gs
- Ukuran: ~8KB
- Type: Google Apps Script
- Dijalankan di Google Cloud
- Free tier unlimited execution

---

## 🎓 CUSTOMIZATION

### Ubah Nama Organisasi
Edit HTML file, cari baris:
```html
<span>Yayasan Ar-Rahmah</span>
```
Ganti dengan nama Anda.

### Ubah Warna/Tema
Edit CSS di HTML file:
```css
/* Primary color: Emerald (#10b981) */
/* Secondary: Blue (#3b82f6) */
```

### Tambah Unit Baru
Edit bagian `<select id="unitSekolah">`:
```html
<option value="UNIT_BARU">Nama Unit</option>
```

### Tambah Fields
Edit form HTML & Google Apps Script untuk handle field baru.

---

## 📋 CHECKLIST SETELAH SETUP

- [ ] Google Sheet sudah dibuat
- [ ] Apps Script sudah di-setup (setupDatabase ran successfully)
- [ ] Web App sudah di-deploy
- [ ] Deployment ID sudah di-copy
- [ ] HTML file sudah di-update dengan Deployment ID
- [ ] HTML file sudah di-upload ke hosting (Drive/GitHub/Netlify)
- [ ] Test form submission → berhasil
- [ ] Test dashboard → data muncul
- [ ] Test filter → berfungsi
- [ ] Test status change → berhasil
- [ ] Link sudah di-share ke team

---

## 🎉 SELESAI!

Aplikasi Anda siap digunakan. Semua staff bisa mulai submit laporan kapan saja, dan semua data otomatis tersimpan di Google Sheets Anda.

---

**Pertanyaan?** Email: media@ar-rahmahsulawesi.id  
**Butuh bantuan setup?** Chat WhatsApp ke nomor sekolah  
**Versi terbaru:** Check GitHub releases

---

**Status:** ✅ Production Ready  
**Versi:** 1.0.0  
**Updated:** May 2025
