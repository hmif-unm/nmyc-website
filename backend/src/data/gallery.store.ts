import type { GalleryItem, GalleryCategory } from '../types'

// Data awal dokumentasi NMYC
const initialGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Lomba Peksimida - Solo Pop',
    category: 'Lomba',
    date: '2024',
    image: '/assets/dokumentasi-assets/Lomba Peksimida - Solo Pop.jpg',
    description: 'Partisipasi kontingen NMYC dalam ajang kompetisi Peksimida tangkai Solo Pop membawakan aransemen vokal terbaik.',
    fullDescription: 'Partisipasi kontingen Nusa Mandiri Youth Choir (NMYC) dalam ajang bergengsi Peksimida tangkai vokal Solo Pop. Penampilan ini menampilkan teknik vokal prima, penjiwaan mendalam, dan aransemen yang memukau dewan juri serta penonton.',
    createdAt: '2024-08-10T10:00:00Z'
  },
  {
    id: 2,
    title: 'Lomba Seleksi Daerah',
    category: 'Lomba',
    date: '2024',
    image: '/assets/dokumentasi-assets/Sertijab.jpg',
    description: 'Dokumentasi NMYC pada ajang seleksi daerah, menampilkan performa paduan suara terbaik.',
    fullDescription: 'Nusa Mandiri Youth Choir mengikuti ajang seleksi paduan suara tingkat daerah dengan penuh dedikasi dan kekompakan tim vokal.',
    createdAt: '2024-09-12T10:00:00Z'
  },
  {
    id: 3,
    title: 'Lomba di Kota Depok',
    category: 'Lomba',
    date: '2025',
    image: '/assets/dokumentasi-assets/Penampilan Vocal Grub di wisuda ke 37.jpg',
    description: 'Penampilan tim vocal group NMYC dalam festival paduan suara di Kota Depok.',
    fullDescription: 'Kompetisi paduan suara dan vocal group di tingkat Kota Depok yang mempertemukan berbagai kelompok paduan suara mahasiswa terbaik.',
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 4,
    title: 'Lomba Tingkat Depok',
    category: 'Lomba',
    date: '2025',
    image: '/assets/dokumentasi-assets/Penampilan Solo Pria di Wisuda ke 40.jpg',
    description: 'Penampilan solois pria NMYC dalam ajang perlombaan vokal tingkat daerah di Depok.',
    fullDescription: 'Solois pria NMYC tampil memukau membawakan lagu perlombaan dengan jangkauan vokal dan teknik vokal prima di hadapan dewan juri.',
    createdAt: '2025-02-20T10:00:00Z'
  },
  {
    id: 5,
    title: 'Tampil di Serasi 2025',
    category: 'Penampilan',
    date: '2025',
    image: '/assets/dokumentasi-assets/Tampil Pada saat Serasi 2025.jpg',
    description: 'Meriahkan gelaran Seni dan Apresiasi Budaya (Serasi) 2025 dengan penampilan paduan suara yang kompak dan energik.',
    fullDescription: 'NMYC mempersembahkan serangkaian lagu harmoni nusantara kontemporer dalam acara tahunan Pagelaran Seni dan Budaya (Serasi) 2025.',
    createdAt: '2025-05-18T10:00:00Z'
  },
  {
    id: 6,
    title: 'Tampil di Serasi 2026',
    category: 'Penampilan',
    date: '2026',
    image: '/assets/dokumentasi-assets/Tampil di Serasi 2026.jpg',
    description: 'Penampilan spektakuler NMYC pada ajang Serasi 2026 dengan kostum ungu kebanggaan dan formasi lengkap.',
    fullDescription: 'Penampilan spektakuler NMYC pada gelaran Serasi 2026 dengan kostum ungu identitas kebanggaan organisasi dan formasi vokal yang solid.',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 7,
    title: 'Penampilan di JIF Sebelum Wisuda',
    category: 'Penampilan',
    date: '2024',
    image: '/assets/dokumentasi-assets/Tampil di JIF sebelum Wisuda.jpg',
    description: 'Pertunjukan musik vokal di panggung Jakarta Islamic Fair (JIF) menjelang agenda seremoni wisuda kampus.',
    fullDescription: 'Tim NMYC tampil memukau mengisi panggung Jakarta Islamic Fair (JIF) dengan membawakan lagu-lagu harmoni penuh khidmat.',
    createdAt: '2024-10-05T10:00:00Z'
  },
  {
    id: 8,
    title: 'Liwetan bersama Seluruh Anggota NMYC',
    category: 'Kegiatan',
    date: '2025',
    image: '/assets/dokumentasi-assets/Liwetan bersama seluruh anggota NMYC.jpg',
    description: 'Tradisi santap bersama beralaskan daun pisang untuk mempererat tali persaudaraan dan kekeluargaan seluruh anggota.',
    fullDescription: 'Kegiatan santap bersama (liwetan) seluruh keluarga besar Nusa Mandiri Youth Choir yang diselenggarakan untuk mempererat rasa kekeluargaan dan keakraban antar-angkatan.',
    createdAt: '2025-07-22T10:00:00Z'
  },
  {
    id: 9,
    title: 'Penampilan Solo Wanita di Wisuda ke-40',
    category: 'Penampilan',
    date: '2024',
    image: '/assets/dokumentasi-assets/Penampilan Solo Wanita di wisuda ke 40.jpg',
    description: 'Penampilan vokal solo wanita memukau para wisudawan dengan teknik vokal soprano yang anggun dan berkarakter.',
    fullDescription: 'Penampilan solo wanita dari anggota berbakat NMYC pada wisuda ke-40 Universitas Nusa Mandiri dengan penghayatan mendalam.',
    createdAt: '2024-11-14T10:00:00Z'
  },
  {
    id: 10,
    title: 'Foto Latihan Rutin',
    category: 'Latihan',
    date: '2025',
    image: '/assets/dokumentasi-assets/Foto Latihan.jpg',
    description: 'Sesi latihan teknik pernapasan, intonasi, dinamika vokal, dan kekompakan paduan suara di bawah bimbingan pelatih.',
    fullDescription: 'Sesi latihan rutin berkala anggota NMYC meliputi olah vokal, harmonisasi notasi per seksi suara (SATB), dan persiapan repertoar lagu.',
    createdAt: '2025-04-10T10:00:00Z'
  },
  {
    id: 11,
    title: 'Tampil Pada Saat Event',
    category: 'Penampilan',
    date: '2024',
    image: '/assets/dokumentasi-assets/Tampil pada saat event.jpg',
    description: 'Ajang unjuk kemampuan vokal NMYC dalam berbagai pagelaran event kolaboratif kampus.',
    fullDescription: 'Dokumentasi NMYC saat mengisi berbagai event resmi kampus maupun eksternal dengan performa paduan suara yang solid.',
    createdAt: '2024-06-25T10:00:00Z'
  }
]

class GalleryStore {
  private items: GalleryItem[] = [...initialGalleryItems]
  private nextId: number = 12

  getAll(category?: string, search?: string): GalleryItem[] {
    let result = [...this.items]

    if (category && category !== 'Semua') {
      result = result.filter(item => item.category.toLowerCase() === category.toLowerCase())
    }

    if (search && search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    }

    // Urutkan dari yang terbaru (id terbesar)
    return result.sort((a, b) => b.id - a.id)
  }

  getById(id: number): GalleryItem | undefined {
    return this.items.find(item => item.id === id)
  }

  create(data: Omit<GalleryItem, 'id'>): GalleryItem {
    const newItem: GalleryItem = {
      ...data,
      id: this.nextId++,
      createdAt: new Date().toISOString()
    }
    this.items.unshift(newItem)
    return newItem
  }

  update(id: number, data: Partial<Omit<GalleryItem, 'id'>>): GalleryItem | null {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return null

    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return this.items[index]
  }

  delete(id: number): boolean {
    const initialLen = this.items.length
    this.items = this.items.filter(item => item.id !== id)
    return this.items.length < initialLen
  }
}

export const galleryStore = new GalleryStore()
