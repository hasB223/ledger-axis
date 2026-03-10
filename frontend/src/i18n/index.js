import { createI18n } from 'vue-i18n';

export const messages = {
  en: {
    appName: 'LedgerAxis',
    nav: {
      companies: 'Company Search',
      analytics: 'Analytics Dashboard',
      logout: 'Logout'
    },
    common: {
      tenant: 'Tenant',
      search: 'Search',
      loading: 'Loading...',
      noData: 'No data available',
      light: 'Light',
      dark: 'Dark',
      english: 'English',
      malay: 'Bahasa Melayu',
      page: 'Page {page} of {totalPages}'
    },
    auth: {
      title: 'Sign in',
      subtitle: 'Internal access for tenant-scoped company operations and analytics.',
      email: 'Email',
      password: 'Password',
      submit: 'Sign in',
      submitting: 'Signing in...'
    },
    companies: {
      title: 'Company Search',
      subtitle: 'Tenant-isolated records with registration, industry, and revenue visibility.',
      searchPlaceholder: 'Search by company or registration number',
      total: 'Total companies: {count}',
      name: 'Name',
      registration: 'Registration',
      industry: 'Industry',
      revenue: 'Revenue',
      employees: 'Employees',
      loading: 'Loading companies...'
    },
    companyDetail: {
      fallbackTitle: 'Company Detail',
      subtitle: 'Detailed tenant-scoped company profile and director roster.',
      registrationNumber: 'Registration Number',
      industry: 'Industry',
      revenue: 'Revenue',
      employeeCount: 'Employee Count',
      directors: 'Directors',
      fullName: 'Full Name',
      nationality: 'Nationality',
      birthYear: 'Birth Year',
      loading: 'Loading company detail...',
      empty: 'No directors assigned.'
    },
    analytics: {
      title: 'Analytics Dashboard',
      subtitle: 'Revenue concentration, industry distribution, and director-linked top performers.',
      industriesCovered: 'Industries Covered',
      topCompanyRevenue: 'Top Company Revenue',
      topCompanyDirectors: 'Top Company Directors',
      industrySummary: 'Industry Summary',
      topCompanies: 'Top Companies by Revenue',
      avgRevenue: 'Average Revenue',
      companies: 'Companies',
      directors: 'Directors',
      loading: 'Loading analytics...',
      industryChartTitle: 'Industry Distribution',
      revenueChartTitle: 'Revenue Mix of Top Companies'
    }
  },
  ms: {
    appName: 'LedgerAxis',
    nav: {
      companies: 'Carian Syarikat',
      analytics: 'Papan Pemuka Analitik',
      logout: 'Log keluar'
    },
    common: {
      tenant: 'Penyewa',
      search: 'Cari',
      loading: 'Memuatkan...',
      noData: 'Tiada data',
      light: 'Cerah',
      dark: 'Gelap',
      english: 'Bahasa Inggeris',
      malay: 'Bahasa Melayu',
      page: 'Halaman {page} daripada {totalPages}'
    },
    auth: {
      title: 'Log masuk',
      subtitle: 'Akses dalaman untuk operasi dan analitik syarikat berasaskan penyewa.',
      email: 'E-mel',
      password: 'Kata laluan',
      submit: 'Log masuk',
      submitting: 'Sedang log masuk...'
    },
    companies: {
      title: 'Carian Syarikat',
      subtitle: 'Rekod terpencil mengikut penyewa dengan keterlihatan pendaftaran, industri dan hasil.',
      searchPlaceholder: 'Cari mengikut syarikat atau nombor pendaftaran',
      total: 'Jumlah syarikat: {count}',
      name: 'Nama',
      registration: 'Pendaftaran',
      industry: 'Industri',
      revenue: 'Hasil',
      employees: 'Pekerja',
      loading: 'Sedang memuatkan syarikat...'
    },
    companyDetail: {
      fallbackTitle: 'Butiran Syarikat',
      subtitle: 'Profil syarikat terperinci mengikut penyewa dan senarai pengarah.',
      registrationNumber: 'Nombor Pendaftaran',
      industry: 'Industri',
      revenue: 'Hasil',
      employeeCount: 'Bilangan Pekerja',
      directors: 'Pengarah',
      fullName: 'Nama Penuh',
      nationality: 'Kewarganegaraan',
      birthYear: 'Tahun Lahir',
      loading: 'Sedang memuatkan butiran syarikat...',
      empty: 'Tiada pengarah ditetapkan.'
    },
    analytics: {
      title: 'Papan Pemuka Analitik',
      subtitle: 'Tumpuan hasil, agihan industri dan syarikat berprestasi tinggi berkaitan pengarah.',
      industriesCovered: 'Liputan Industri',
      topCompanyRevenue: 'Hasil Syarikat Tertinggi',
      topCompanyDirectors: 'Pengarah Syarikat Tertinggi',
      industrySummary: 'Ringkasan Industri',
      topCompanies: 'Syarikat Teratas Mengikut Hasil',
      avgRevenue: 'Purata Hasil',
      companies: 'Syarikat',
      directors: 'Pengarah',
      loading: 'Sedang memuatkan analitik...',
      industryChartTitle: 'Agihan Industri',
      revenueChartTitle: 'Campuran Hasil Syarikat Teratas'
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});
