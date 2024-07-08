# DBN Project - Perangkingan Aduan Permasalahan dengan AHP

Website ini merupakan layanan pengaduan masalah pengguna dan merangking permasalahan yang lebih urgent untuk ditangani lebih dahulu oleh admin menggunakan sistem pendukung keputusan AHP. Studi kasus dilakukan di PO PT. Data Buana Nusantara - Kamil di Desa Wonorejo, Talun.

## Demo
[Link ke Demo](https://linkke.demo)

## Struktur Laman

### Laman Utama
1. **Beranda**
2. **Login**
3. **Registrasi**

### Laman Admin
1. **Dashboard**: Berisi jumlah permasalahan, yang sudah ditangani, dan yang belum, serta menampilkan 3 permasalahan yang urgent ditangani.
2. **Laman Aduan Permasalahan**: Berisi seluruh data permasalahan yang masuk, meliputi nama, tanggal masalah, jenis masalah, jarak rumah pelanggan, dan status progres yang dapat diedit.
3. **Laman Data Pelanggan**: Berisi seluruh data pelanggan meliputi nama, email, nomor HP, dan alamat, dengan opsi untuk melakukan penghapusan dan edit.

### Laman Pengguna
1. **Laman Form Pengaduan**: Pengguna dapat menginput permasalahan dengan melakukan login terlebih dahulu.
2. **Laman Cek Progress**: Pengguna dapat mengecek status permasalahan melalui token dari permasalahan mereka.
3. **Profil Pengguna**: Berisi data diri pengguna yang dapat diedit.

## Tools Pengembangan

### Tech Stack
- **Programming Language**: JavaScript

### Front End
- **React JS**: Library JavaScript front end
- **ShaCdn**: UI library
- **Axios**: HTTP request handler
- **Tailwind CSS**: CSS framework

### Back End
- **NodeJS + Express JS**: Library + framework
- **Nodemailer + SMTP**: Email handler
- **Prisma + PostgreSQL**: ORM + Database
- **JWT (JSON Web Token)**: Autentikasi login
- **AHP**: Perhitungan AHP

### API Documentation
- **Postman**

## Kontribusi
- **Frontend**: [@akuBetaa](https://github.com/akuBetaa/)
- **Backend**: [@vierynugroho](https://github.com/vierynugroho)
- **Dokumentasi**: [@danilafitria]()

## Repositori

### Front End
- [Front End Repository](https://github.com/akuBetaa/dbn-project)

### Back End
- [Back End Repository](https://github.com/vierynugroho/SPK-internet-service-provider.git)

### API Endpoint
- [API Endpoint](https://team-a-spk-internet-service-provider.vercel.app/api/v1)

### API Documentation
- [API Documentation](https://documenter.getpostman.com/view/22814931/2sA3XJkQLg)
