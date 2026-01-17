## “Implementasi Aplikasi Pengaduan Masyarakat Berbasis Web dengan Teknologi AWS Lambda dan DynamoDB”

---

## Information ✅
-  Dosen Pengampu : Haris Setiaji,
MTI.,CISDE.,CISDV.,CITA.,MOS.,MCE.
- Kelas           : 7TI-P2

---
## Anggota Kelompok
| No | Npm | Nama | Role |
|------|---------|----------|----------|
| 1 | 22010022 | Zulfikar Juniarto | Fronend |
| 2 | 22010043 | ⁠Andriyas Ariya Firmansyah | DevOps |
| 3 | 22010059 | Akbar Ardiansyah | Cloud Engineering |
| 4 | 22010048 | Muhammad ridho sanjaya | Backend |

---
## 🌐  LINK ACCESS
-https://staging.d137unceakmtcj.amplifyapp.com/
---
## 🔐 Autentikasi & Role

Autentikasi dilakukan secara **sederhana** menggunakan:
- Email
- Password (plain text)

Role:
- `USER`
- `ADMIN`

> Pendekatan ini dipilih untuk menjaga kesederhanaan sistem dan fokus pada implementasi arsitektur serverless.

---

## 📡 Endpoint API

| Method | Endpoint | Deskripsi |
|------|---------|----------|
| POST | `/auth/register` | Registrasi user |
| POST | `/auth/login` | Login user/admin |
| POST | `/pengaduan` | Membuat pengaduan |
| GET | `/pengaduan/user` | Pengaduan milik user |
| GET | `/pengaduan/admin` | Semua pengaduan |
| PUT | `/pengaduan/{id}` | Update status |
| DELETE | `/pengaduan/{id}` | Hapus pengaduan |

---

## 🧪 Testing

Pengujian backend dilakukan menggunakan **Postman** dengan skenario:
1. Register user
2. Login user
3. Create pengaduan
4. Login admin
5. Update status pengaduan
6. Verifikasi perubahan data

Semua endpoint telah diuji dan berjalan dengan baik.

---

## 📦 Deployment

### Frontend
- Build React Vite
- Upload ke **AWS S3**
- Static Website Hosting enabled

### Backend
- AWS Lambda (Node.js 20)
- API Gateway (HTTP API)
- DynamoDB (NoSQL)

---

## 📸 Screenshot (Opsional)
Tambahkan screenshot UI aplikasi di sini untuk memperjelas tampilan sistem.

---

## ⚠️ Catatan Pengembangan

Beberapa peningkatan yang dapat dilakukan di masa depan:
- Hashing password (bcrypt)
- Token-based authentication (JWT / Cognito)
- Pagination & filtering data
- UI enhancement
- Logging & monitoring lanjutan

---

## 👨‍💻 Author

**Nama:** Zulfikar Juniarto  
**GitHub:** https://github.com/USERNAME  
**Project Type:** Web Application – Serverless Architecture

---

## 📄 Lisensi
Proyek ini dikembangkan untuk keperluan pembelajaran dan pengembangan sistem berbasis cloud.









