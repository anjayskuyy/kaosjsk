// DATABASE GURU
const guruData = [
    {
        id: 1,
        name: 'Ahmad Wijaya, S.Pd',
        avatar: '👨‍🏫',
        subject: 'Matematika & Fisika',
        experience: '8 tahun',
        rating: 4.9,
        bio: 'Spesialis matematika dan fisika dengan metode pembelajaran interaktif',
        students: 245
    },
    {
        id: 2,
        name: 'Siti Nurhaliza, S.Pd',
        avatar: '👩‍🏫',
        subject: 'Bahasa Inggris & Sastra',
        experience: '6 tahun',
        rating: 4.8,
        bio: 'Native speaker dan lulusan Cambridge dengan pengalaman internasional',
        students: 189
    },
    {
        id: 3,
        name: 'Budi Santoso, S.Pd',
        avatar: '👨‍🏫',
        subject: 'Kimia & Biologi',
        experience: '7 tahun',
        rating: 4.9,
        bio: 'Penggiat riset sains dengan metode eksperimental yang menyenangkan',
        students: 176
    },
    {
        id: 4,
        name: 'Dewi Lestari, S.Pd',
        avatar: '👩‍🏫',
        subject: 'IPA & Matematika SD',
        experience: '5 tahun',
        rating: 4.9,
        bio: 'Ahli dalam mengajar anak-anak dengan pendekatan yang fun dan engaging',
        students: 198
    },
    {
        id: 5,
        name: 'Rudi Hermawan, M.Si',
        avatar: '👨‍🏫',
        subject: 'Kimia SMA',
        experience: '9 tahun',
        rating: 4.8,
        bio: 'Master bidang Kimia, pernah melatih peserta olimpiade',
        students: 156
    },
    {
        id: 6,
        name: 'Ratna Wijayanti, S.Pd',
        avatar: '👩‍🏫',
        subject: 'Bahasa Indonesia',
        experience: '6 tahun',
        rating: 4.9,
        bio: 'Penulis dan penggemar literasi dengan metode pembelajaran yang inovatif',
        students: 143
    }
];

// DATABASE TESTIMONI
const testimonialData = [
    {
        id: 1,
        name: 'Rafi Aldahhan',
        age: 16,
        school: 'SMA Negeri 1 Jakarta',
        avatar: '👦',
        rating: 5,
        text: 'Cosmos Bimbel benar-benar mengubah cara saya belajar. Guru-gurunya sangat profesional dan metodenya sangat efektif. Nilai saya naik drastis dari 7 menjadi 9!'
    },
    {
        id: 2,
        name: 'Ibu Sinta',
        role: 'Orang Tua',
        avatar: '👩',
        rating: 5,
        text: 'Sangat puas dengan layanan Cosmos Bimbel. Anak saya jadi lebih semangat belajar dan nilainya terus meningkat setiap bulannya. Terima kasih atas dedikasi tim!'
    },
    {
        id: 3,
        name: 'Nisa Safitri',
        age: 14,
        school: 'SMP Negeri 2 Bandung',
        avatar: '👧',
        rating: 5,
        text: 'Akses 24/7 ke materi pembelajaran sangat membantu. Saya bisa belajar kapan saja sesuai jadwal saya. Dashboard tracking-nya juga sangat detail dan memotivasi!'
    },
    {
        id: 4,
        name: 'Pak Bambang',
        role: 'Orang Tua',
        avatar: '👨',
        rating: 5,
        text: 'Investasi terbaik untuk masa depan anak saya. Guru-gurunya ramah, metodenya terbukti, dan hasil belajarnya nyata. Sangat worth it!'
    },
    {
        id: 5,
        name: 'Fajar Pratama',
        age: 15,
        school: 'SMA Taruna Nusantara',
        avatar: '👦',
        rating: 5,
        text: 'Terima kasih Cosmos Bimbel! Berkat bantuan guru-guru yang luar biasa, saya akhirnya lulus ujian masuk universitas impian saya dengan nilai bagus!'
    },
    {
        id: 6,
        name: 'Ibu Eka',
        role: 'Orang Tua',
        avatar: '👩',
        rating: 5,
        text: 'Pelayanan customer service-nya responsif dan helpful. Setiap pertanyaan dijawab dengan baik. Sistem pembayarannya juga fleksibel dan transparan. Rekomended!'
    }
];

// DATABASE BLOG
const blogData = [
    {
        id: 1,
        title: '10 Tips Jitu Meningkatkan Nilai Matematika',
        category: 'Matematika',
        excerpt: 'Discover proven strategies untuk menguasai matematika dan meningkatkan nilai ujian hingga 30%. Dari dasar hingga tingkat lanjut...',
        date: '2025-05-20',
        author: 'Ahmad Wijaya',
        readTime: '5 min'
    },
    {
        id: 2,
        title: 'Cara Efektif Belajar Bahasa Inggris',
        category: 'Bahasa Inggris',
        excerpt: 'Metode pembelajaran bahasa Inggris yang tidak membosankan dan terbukti meningkatkan kemampuan speaking dan listening...',
        date: '2025-05-18',
        author: 'Siti Nurhaliza',
        readTime: '4 min'
    },
    {
        id: 3,
        title: 'Pahami Konsep Kimia dengan Mudah',
        category: 'Kimia',
        excerpt: 'Strategi memahami konsep kimia yang sulit menjadi mudah dengan analogi dan praktik langsung yang menyenangkan...',
        date: '2025-05-16',
        author: 'Budi Santoso',
        readTime: '6 min'
    },
    {
        id: 4,
        title: 'Manajemen Waktu Belajar yang Tepat',
        category: 'Tips & Trik',
        excerpt: 'Bagaimana mengatur waktu belajar yang efisien tanpa mengorbankan waktu bermain dan istirahat? Ini jawabannya...',
        date: '2025-05-14',
        author: 'Dewi Lestari',
        readTime: '4 min'
    },
    {
        id: 5,
        title: 'Persiapan Ujian Nasional yang Sempurna',
        category: 'Ujian',
        excerpt: 'Panduan lengkap persiapan ujian nasional dari 3 bulan sebelumnya hingga hari H dengan strategi yang terbukti efektif...',
        date: '2025-05-12',
        author: 'Rudi Hermawan',
        readTime: '7 min'
    },
    {
        id: 6,
        title: 'Menulis Esai yang Menarik dan Berargumen',
        category: 'Sastra',
        excerpt: 'Teknik menulis esai yang persuasif, berlogika, dan menarik untuk meningkatkan nilai tugas dan ujian tulis...',
        date: '2025-05-10',
        author: 'Ratna Wijayanti',
        readTime: '5 min'
    }
];

// DATABASE SISWA (untuk admin)
const siswaData = [
    {
        id: 1,
        nama: 'Rafi Aldahhan',
        email: 'rafi@email.com',
        hp: '08123456789',
        jenjang: 'SMA',
        paket: 'Professional',
        nilai_awal: 7,
        nilai_saat_ini: 8.5,
        guru: 'Ahmad Wijaya',
        tanggal_daftar: '2025-01-15',
        status: 'aktif'
    },
    {
        id: 2,
        nama: 'Nisa Safitri',
        email: 'nisa@email.com',
        hp: '08234567890',
        jenjang: 'SMP',
        paket: 'Premium',
        nilai_awal: 6.5,
        nilai_saat_ini: 8.2,
        guru: 'Siti Nurhaliza',
        tanggal_daftar: '2025-02-20',
        status: 'aktif'
    }
];
