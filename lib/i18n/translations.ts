export type Language = "en" | "es" | "fr" | "ru" | "ar"

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

export type TranslationKeys = {
  // Header
  home: string
  pricing: string
  sampleReport: string
  signIn: string
  getStarted: string
  toggleTheme: string

  // Hero
  proVehicleHistory: string
  knowBeforeYouBuy: string
  knowBeforeYouBuyPlate: string
  heroSubtitle: string

  // VIN Input
  byVin: string
  byUsPlate: string
  enterVin: string
  checkVin: string
  checking: string
  scanBarcode: string
  plateNumber: string
  state: string
  lookUpPlate: string
  plateLookupComingSoon: string
  vinValidationError: string
  scanVinBarcode: string
  scanLicensePlate: string
  scanPlateInstructions: string
  cameraPreview: string
  scanningInstructions: string
  scanning: string

  // Trust Badges
  nmvtisVerified: string
  bankLevelSecurity: string
  privacyProtected: string
  trustNote: string
  extensiveReport: string
  secureCheckout: string
  refundEligible: string

  // How It Works
  howItWorks: string
  enterVinStep: string
  enterVinStepDesc: string
  instantAnalysis: string
  instantAnalysisDesc: string
  getReport: string
  getReportDesc: string

  // Features
  comprehensiveData: string
  comprehensiveDataDesc: string
  accidentHistory: string
  accidentHistoryDesc: string
  ownershipRecords: string
  ownershipRecordsDesc: string
  titleBrands: string
  titleBrandsDesc: string
  recallAlerts: string
  recallAlertsDesc: string
  marketValue: string
  marketValueDesc: string

  // Pricing
  choosePlan: string
  singleReport: string
  perReport: string
  bestValue: string
  proPass: string
  reports: string
  perReportSavings: string
  monthly: string
  perMonth: string
  unlimitedReports: string
  buyNow: string
  subscribe: string
  compareFeatures: string
  feature: string
  included: string
  notIncluded: string

  // Footer
  footerTagline: string
  product: string
  vinCheck: string
  company: string
  about: string
  contact: string
  careers: string
  legal: string
  privacyPolicy: string
  termsOfService: string
  dataProtection: string
  encrypted: string
  neverSellData: string
  allRightsReserved: string

  // Report
  aiSummary: string
  overview: string
  ownership: string
  history: string
  accidents: string
  recalls: string
  marketValueTab: string
  share: string
  download: string
  email: string
  verifiedReport: string
  reportId: string
  generatedFor: string
}

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    home: "Home",
    pricing: "Pricing",
    sampleReport: "Sample Report",
    signIn: "Sign In",
    getStarted: "Get Started",
    toggleTheme: "Toggle theme",

    // Hero - Removed trailing periods
    proVehicleHistory: "Free Vehicle History",
    knowBeforeYouBuy: "Clarity for Every VIN",
    knowBeforeYouBuyPlate: "Clarity for Every License Plate",
    heroSubtitle: "AI-powered vehicle report",

    // VIN Input
    byVin: "By VIN",
    byUsPlate: "By US Plate",
    enterVin: "Enter 17-character VIN",
    checkVin: "Check VIN",
    checking: "Checking...",
    scanBarcode: "Scan",
    plateNumber: "Plate #",
    state: "State",
    lookUpPlate: "Look Up Plate",
    plateLookupComingSoon: "Enter or scan a 17-character VIN or a US license plate",
    vinValidationError: "VIN must be 17 characters. You entered",
    scanVinBarcode: "Scan VIN Barcode",
    scanLicensePlate: "Scan License Plate",
    scanPlateInstructions:
      "Position the license plate within the frame. Ensure the plate is clearly visible and well-lit.",
    cameraPreview: "Camera preview",
    scanningInstructions:
      "Position the VIN barcode within the frame. Usually found on the driver's door jamb or lower windshield.",
    scanning: "Scanning...",

    // Trust Badges
    nmvtisVerified: "NMVTIS Verified",
    bankLevelSecurity: "Bank-level Security",
    privacyProtected: "No Data Resale",
    trustNote: "Reports include data from 100+ sources including NMVTIS, insurance companies, and auto auctions.",
    extensiveReport: "Extensive Report",
    secureCheckout: "Secure Checkout",
    refundEligible: "Refund Eligible",

    // How It Works - Updated step descriptions
    howItWorks: "How It Works",
    enterVinStep: "Enter VIN or Plate",
    enterVinStepDesc: "Enter or scan the vehicle's 17-character VIN, or its license plate",
    instantAnalysis: "Instant Analysis",
    instantAnalysisDesc: "We search millions of records in seconds",
    getReport: "Get Report",
    getReportDesc: "Review comprehensive history and make informed decisions",

    // Features
    comprehensiveData: "Comprehensive Data",
    comprehensiveDataDesc:
      "Access records from 100+ trusted sources including NMVTIS, insurance companies, and service records.",
    accidentHistory: "Accident History",
    accidentHistoryDesc: "Detailed accident reports with damage severity, airbag deployment, and repair estimates.",
    ownershipRecords: "Ownership Records",
    ownershipRecordsDesc: "Complete ownership timeline including registration history and title transfers.",
    titleBrands: "Title Brands",
    titleBrandsDesc: "Check for salvage, rebuilt, flood damage, lemon law, and other critical title brands.",
    recallAlerts: "Recall Alerts",
    recallAlertsDesc: "Active manufacturer recalls with completion status and remedy information.",
    marketValue: "Market Value",
    marketValueDesc: "Real-time market valuation based on condition, mileage, and comparable sales.",

    // Pricing
    choosePlan: "Choose Your Plan",
    singleReport: "Single Report",
    perReport: "per report",
    bestValue: "Best Value",
    proPass: "Pro Pass",
    reports: "reports",
    perReportSavings: "per report",
    monthly: "Monthly",
    perMonth: "per month",
    unlimitedReports: "Unlimited reports",
    buyNow: "Buy Now",
    subscribe: "Subscribe",
    compareFeatures: "Compare Features",
    feature: "Feature",
    included: "Included",
    notIncluded: "Not included",

    // Footer
    footerTagline: "Vehicle reports trusted by thousands.",
    product: "Product",
    vinCheck: "VIN Check",
    company: "Company",
    about: "About",
    contact: "Contact",
    careers: "Careers",
    legal: "Legal",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    dataProtection: "Data Protection",
    encrypted: "Encrypted",
    neverSellData: "We never sell your data",
    allRightsReserved: "All rights reserved.",

    // Report
    aiSummary: "AI Summary",
    overview: "Overview",
    ownership: "Ownership",
    history: "History & Events",
    accidents: "Accidents & Damage",
    recalls: "Recalls & Safety",
    marketValueTab: "Market Value",
    share: "Share",
    download: "Download",
    email: "Email",
    verifiedReport: "Verified Report",
    reportId: "Report ID",
    generatedFor: "Generated for",
  },
  es: {
    // Header
    home: "Inicio",
    pricing: "Precios",
    sampleReport: "Informe de Muestra",
    signIn: "Iniciar Sesión",
    getStarted: "Comenzar",
    toggleTheme: "Cambiar tema",

    // Hero - Removed trailing periods
    proVehicleHistory: "Historial Vehicular Gratis",
    knowBeforeYouBuy: "Claridad para Cada VIN",
    knowBeforeYouBuyPlate: "Claridad para Cada Placa",
    heroSubtitle: "Reporte de vehículo con IA",

    // VIN Input
    byVin: "Por VIN",
    byUsPlate: "Por Placa US",
    enterVin: "Ingrese VIN de 17 caracteres",
    checkVin: "Verificar VIN",
    checking: "Verificando...",
    scanBarcode: "Escanear",
    plateNumber: "Placa #",
    state: "Estado",
    lookUpPlate: "Buscar Placa",
    plateLookupComingSoon: "Ingrese o escanee un VIN de 17 caracteres o una placa de EE.UU.",
    vinValidationError: "El VIN debe tener 17 caracteres. Ingresaste",
    scanVinBarcode: "Escanear Código VIN",
    scanLicensePlate: "Escanear Placa",
    scanPlateInstructions:
      "Posicione la placa dentro del marco. Asegúrese de que esté claramente visible y bien iluminada.",
    cameraPreview: "Vista previa de cámara",
    scanningInstructions:
      "Posicione el código de barras VIN dentro del marco. Usualmente se encuentra en el marco de la puerta del conductor o en el parabrisas inferior.",
    scanning: "Escaneando...",

    // Trust Badges
    nmvtisVerified: "Verificado NMVTIS",
    bankLevelSecurity: "Seguridad Bancaria",
    privacyProtected: "Sin Reventa de Datos",
    trustNote:
      "Los informes incluyen datos de más de 100 fuentes, incluyendo NMVTIS, compañías de seguros y subastas de autos.",
    extensiveReport: "Informe Extenso",
    secureCheckout: "Pago Seguro",
    refundEligible: "Elegible para Reembolso",

    // How It Works - Updated step descriptions
    howItWorks: "Cómo Funciona",
    enterVinStep: "Ingrese VIN o Placa",
    enterVinStepDesc: "Ingrese o escanee el VIN de 17 caracteres del vehículo, o su placa",
    instantAnalysis: "Análisis Instantáneo",
    instantAnalysisDesc: "Buscamos millones de registros en segundos",
    getReport: "Obtener Informe",
    getReportDesc: "Revise el historial completo y tome decisiones informadas",

    // Features
    comprehensiveData: "Datos Completos",
    comprehensiveDataDesc:
      "Acceda a registros de más de 100 fuentes confiables, incluyendo NMVTIS, compañías de seguros y zapisów serwisowych.",
    accidentHistory: "Historia de Accidentes",
    accidentHistoryDesc:
      "Szczegółowe raporty wypadków z oceną uszkodzeń, aktywacją poduszek powietrznych i kosztorysami napraw.",
    ownershipRecords: "Registros de Propiedad",
    ownershipRecordsDesc: "Pełna oś czasu własności, w tym historia rejestracji i transferenia tytułu.",
    titleBrands: "Marcas de Título",
    titleBrandsDesc:
      "Sprawdź pojazdy powypadkowe, odbudowane, zalane, z prawem cytryny i inne krytyczne oznaczenia tytułu.",
    recallAlerts: "Alerty Wycofań",
    recallAlertsDesc: "Aktywne wycofania producenta ze statusem realizacji i informacjami o naprawie.",
    marketValue: "Wartość Rynkowa",
    marketValueDesc: "Wycena rynkowa w czasie rzeczywistym na podstawie stanu, przebiegu i porównywalnych sprzedaży.",

    // Pricing
    choosePlan: "Elige Tu Plan",
    singleReport: "Informe Individual",
    perReport: "por informe",
    bestValue: "Mejor Valor",
    proPass: "Pase Pro",
    reports: "raportów",
    perReportSavings: "por raport",
    monthly: "Mensual",
    perMonth: "miesięcznie",
    unlimitedReports: "Informe ilimitados",
    buyNow: "Kup Teraz",
    subscribe: "Subskrybuj",
    compareFeatures: "Comparar Características",
    feature: "Funkcja",
    included: "Zawarte",
    notIncluded: "Nie zawarte",

    // Footer
    footerTagline: "Vehicle reports trusted by thousands.",
    product: "Product",
    vinCheck: "Sprawdzenie VIN",
    company: "Empresa",
    about: "Acerca de",
    contact: "Contacto",
    careers: "Kariera",
    legal: "Prawne",
    privacyPolicy: "Polityka Prywatności",
    termsOfService: "Regulamin",
    dataProtection: "Ochrona Danych",
    encrypted: "Szyfrowane",
    neverSellData: "Nie sprzedajemy danych",
    allRightsReserved: "Wszelkie prawa zastrzeżone.",

    // Report
    aiSummary: "Podsumowanie AI",
    overview: "Przegląd",
    ownership: "Własność",
    history: "Historia i Zdarzenia",
    accidents: "Wypadki i Uszkodzenia",
    recalls: "Wycofania i Bezpieczeństwo",
    marketValueTab: "Wartość Rynkowa",
    share: "Udostępnij",
    download: "Pobierz",
    email: "Email",
    verifiedReport: "Zweryfikowany Raport",
    reportId: "ID Raportu",
    generatedFor: "Wygenerowano dla",
  },
  fr: {
    // Header
    home: "Accueil",
    pricing: "Tarifs",
    sampleReport: "Rapport Exemple",
    signIn: "Connexion",
    getStarted: "Commencer",
    toggleTheme: "Changer le thème",

    // Hero - Removed trailing periods
    proVehicleHistory: "Historique Véhicule Gratuit",
    knowBeforeYouBuy: "Clarté pour Chaque VIN",
    knowBeforeYouBuyPlate: "Clarté pour Chaque Plaque",
    heroSubtitle: "Rapport véhicule alimenté par IA",

    // VIN Input
    byVin: "Par VIN",
    byUsPlate: "Par Plaque US",
    enterVin: "Entrez le VIN à 17 caractères",
    checkVin: "Vérifier VIN",
    checking: "Vérification...",
    scanBarcode: "Scanner",
    plateNumber: "Plaque #",
    state: "État",
    lookUpPlate: "Rechercher Plaque",
    plateLookupComingSoon: "Entrez ou scannez un VIN à 17 caractères ou une plaque américaine",
    vinValidationError: "Le VIN doit comporter 17 caractères. Vous avez entré",
    scanVinBarcode: "Scanner Code-barres VIN",
    scanLicensePlate: "Scanner la Plaque",
    scanPlateInstructions:
      "Positionnez la plaque dans le cadre. Assurez-vous qu'elle soit clairement visible et bien éclairée.",
    cameraPreview: "Aperçu caméra",
    scanningInstructions:
      "Positionnez le code-barres VIN dans le cadre. Généralement situé sur le montant de porte conducteur ou le bas du pare-brise.",
    scanning: "Scan en cours...",

    // Trust Badges
    nmvtisVerified: "Vérifié NMVTIS",
    bankLevelSecurity: "Sécurité Bancaire",
    privacyProtected: "Pas de Revente de Données",
    trustNote:
      "Les rapports incluent des données de plus de 100 sources, y compris NMVTIS, compagnies d'assurance et автоаукционы.",
    extensiveReport: "Rapport Complet",
    secureCheckout: "Paiement Sécurisé",
    refundEligible: "Remboursement Possible",

    // How It Works - Updated step descriptions
    howItWorks: "Comment Ça Marche",
    enterVinStep: "Entrez VIN ou Plaque",
    enterVinStepDesc: "Entrez ou scannez le VIN à 17 caractères du véhicule, ou son numéro de plaque",
    instantAnalysis: "Analyse Instantanée",
    instantAnalysisDesc: "Nous recherchons des millions de dossiers en quelques secondes",
    getReport: "Obtenir le Rapport",
    getReportDesc: "Consultez l'historique complet et prenez des décisions éclairées",

    // Features
    comprehensiveData: "Données Complètes",
    comprehensiveDataDesc:
      "Accédez aux dossiers de plus de 100 sources fiables, y compris NMVTIS, compagnies d'assurance et service records.",
    accidentHistory: "Historique des Accidents",
    accidentHistoryDesc:
      "Rapports d'accidents détaillés avec gravité des dommages, acionnement de airbags et estimations de réparation.",
    ownershipRecords: "Registres de Propriété",
    ownershipRecordsDesc:
      "Chronologie complète de propriété incluant l'historique d'immatriculation et les transferts de titre.",
    titleBrands: "Marques de Titre",
    titleBrandsDesc:
      "Vérifiez les épaves, reconstructions, dommages d'inondation, loi citron et autres marques critiques de titre.",
    recallAlerts: "Оповещения об Отзывах",
    recallAlertsDesc: "Активные отзывы производителя со статусом выполнения и информацией о ремонте.",
    marketValue: "Рыночная Стоимость",
    marketValueDesc: "Оценка рыночной стоимости в реальном времени на основе состояния, пробега и сопоставимых продаж.",

    // Pricing
    choosePlan: "Choisissez Votre Plan",
    singleReport: "Rapport Unique",
    perReport: "par rapport",
    bestValue: "Meilleure Valeur",
    proPass: "Про Пропуск",
    reports: "rapports",
    perReportSavings: "par rapport",
    monthly: "Mensuel",
    perMonth: "в месяц",
    unlimitedReports: "Безлимитные отчёты",
    buyNow: "Acheter Maintenant",
    subscribe: "S'abonner",
    compareFeatures: "Comparer les Fonctionnalités",
    feature: "Fonctionnalité",
    included: "Inclus",
    notIncluded: "Non inclus",

    // Footer
    footerTagline: "Vehicle reports trusted by thousands.",
    product: "Product",
    vinCheck: "VIN-Prüfung",
    company: "Entreprise",
    about: "À propos",
    contact: "Contact",
    careers: "Karriere",
    legal: "Rechtliches",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    dataProtection: "Datenschutz",
    encrypted: "Verschlüsselt",
    neverSellData: "Nous ne vendons jamais vos données",
    allRightsReserved: "Tous droits réservés.",

    // Report
    aiSummary: "AI Résultat",
    overview: "Aperçu",
    ownership: "Propriété",
    history: "Historique et Événements",
    accidents: "Accidents et Dommages",
    recalls: "Rappels et Sécurité",
    marketValueTab: "Valeur Marchande",
    share: "Partager",
    download: "Télécharger",
    email: "E-Mail",
    verifiedReport: "Rapport Vérifié",
    reportId: "ID du Rapport",
    generatedFor: "Généré pour",
  },
  ru: {
    // Header
    home: "Главная",
    pricing: "Цены",
    sampleReport: "Пример Отчёта",
    signIn: "Войти",
    getStarted: "Начать",
    toggleTheme: "Сменить тему",

    // Hero
    proVehicleHistory: "Бесплатная История Авто",
    knowBeforeYouBuy: "Ясность для Каждого VIN",
    knowBeforeYouBuyPlate: "Ясность для Каждого Номера",
    heroSubtitle: "Отчет об авто на базе ИИ",

    // VIN Input
    byVin: "По VIN",
    byUsPlate: "По Номеру US",
    enterVin: "Введите 17-значный VIN",
    checkVin: "Проверить VIN",
    checking: "Проверка...",
    scanBarcode: "Сканировать",
    plateNumber: "Номер",
    state: "Штат",
    lookUpPlate: "Найти Номер",
    plateLookupComingSoon: "Введите или отсканируйте 17-значный VIN или номер США",
    vinValidationError: "VIN должен содержать 17 символов. Вы ввели",
    scanVinBarcode: "Сканировать Штрих-код VIN",
    scanLicensePlate: "Сканировать Номер",
    scanPlateInstructions: "Расположите номерной знак в рамке. Убедитесь, что он хорошо виден и освещён.",
    cameraPreview: "Предпросмотр камеры",
    scanningInstructions:
      "Расположите штрих-код VIN в рамке. Обычно находится на дверной стойке водителя или нижней части лобового стекла.",
    scanning: "Сканирование...",

    // Trust Badges
    nmvtisVerified: "Проверено NMVTIS",
    bankLevelSecurity: "Банковская Безопасность",
    privacyProtected: "Без Перепродажи Данных",
    trustNote: "Отчёты включают данные из более чем 100 источников, включая NMVTIS, страховые компании и автоаукционы.",
    extensiveReport: "Полный Отчёт",
    secureCheckout: "Безопасная Оплата",
    refundEligible: "Возврат Возможен",

    // How It Works - Updated step descriptions
    howItWorks: "Как Это Работает",
    enterVinStep: "Введите VIN или Номер",
    enterVinStepDesc: "Введите или отсканируйте 17-значный VIN автомобиля или его номерной знак",
    instantAnalysis: "Мгновенный Анализ",
    instantAnalysisDesc: "Мы ищем миллионы записей за секунды",
    getReport: "Получить Отчёт",
    getReportDesc: "Изучите полную историю и принимайте взвешенные решения",

    // Features
    comprehensiveData: "Полные Данные",
    comprehensiveDataDesc:
      "Доступ к записям из более чем 100 надёжных источников, включая NMVTIS, страховые компании и сервисные записи.",
    accidentHistory: "История Аварий",
    accidentHistoryDesc:
      "Детальные отчёты об авариях с указанием серьёзности повреждений, срабатывания подушек безопасности и оценки ремонта.",
    ownershipRecords: "Записи о Владении",
    ownershipRecordsDesc: "Полная хронология владения, включая историю регистрации и передачи права собственности.",
    titleBrands: "Марки Титула",
    titleBrandsDesc:
      "Проверьте на утилизацию, восстановление, затопление, лимонный закон и другие критические марки титула.",
    recallAlerts: "Оповещения об Отзывах",
    recallAlertsDesc: "Активные отзывы производителя со статусом выполнения и информацией о ремонте.",
    marketValue: "Рыночная Стоимость",
    marketValueDesc: "Оценка рыночной стоимости в реальном времени на основе состояния, пробега и сопоставимых продаж.",

    // Pricing
    choosePlan: "Выберите План",
    singleReport: "Один Отчёт",
    perReport: "за отчёт",
    bestValue: "Лучшая Цена",
    proPass: "Про Пропуск",
    reports: "отчётов",
    perReportSavings: "за отчёт",
    monthly: "Ежемесячно",
    perMonth: "в месяц",
    unlimitedReports: "Безлимитные отчёты",
    buyNow: "Купить Сейчас",
    subscribe: "Подписаться",
    compareFeatures: "Сравнить Функции",
    feature: "Функция",
    included: "Включено",
    notIncluded: "Не включено",

    // Footer
    footerTagline: "Отчеты об автомобилях, которым доверяют тысячи.",
    product: "Продукт",
    vinCheck: "VIN-Prüfung",
    company: "Компания",
    about: "О нас",
    contact: "Контакт",
    careers: "Karriere",
    legal: "Rechtliches",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    dataProtection: "Datenschutz",
    encrypted: "Verschlüsselt",
    neverSellData: "Мы никогда не продаём ваши данные",
    allRightsReserved: "Все права защищены.",

    // Report
    aiSummary: "AI Резюме",
    overview: "Обзор",
    ownership: "Владение",
    history: "История и События",
    accidents: "Аварии и Повреждения",
    recalls: "Отзывы и Безопасность",
    marketValueTab: "Рыночная Стоимость",
    share: "Поделиться",
    download: "Скачать",
    email: "E-Mail",
    verifiedReport: "Проверенный Отчёт",
    reportId: "ID Отчёта",
    generatedFor: "Сгенерировано для",
  },
  ar: {
    // Header
    home: "الرئيسية",
    pricing: "الأسعار",
    sampleReport: "تقرير نموذجي",
    signIn: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
    toggleTheme: "تغيير المظهر",

    // Hero
    proVehicleHistory: "تاريخ المركبة مجاناً",
    knowBeforeYouBuy: "وضوح لكل رقم VIN",
    knowBeforeYouBuyPlate: "وضوح لكل لوحة ترخيص",
    heroSubtitle: "تقرير المركبة بالذكاء الاصطناعي",

    // VIN Input
    byVin: "بواسطة VIN",
    byUsPlate: "بواسطة لوحة US",
    enterVin: "أدخل رقم VIN المكون من 17 حرفاً",
    checkVin: "تحقق من VIN",
    checking: "جاري التحقق...",
    scanBarcode: "مسح",
    plateNumber: "رقم اللوحة",
    state: "الولاية",
    lookUpPlate: "البحث عن اللوحة",
    plateLookupComingSoon: "أدخل أو امسح رقم VIN المكون من 17 حرفاً أو لوحة أمريكية",
    vinValidationError: "يجب أن يتكون VIN من 17 حرفاً. أدخلت",
    scanVinBarcode: "مسح باركود VIN",
    scanLicensePlate: "مسح لوحة الترخيص",
    scanPlateInstructions: "ضع لوحة الترخيص داخل الإطار. تأكد من أنها مرئية بوضوح ومضاءة جيداً.",
    cameraPreview: "معاينة الكاميرا",
    scanningInstructions: "ضع باركود VIN داخل الإطار. يوجد عادة على إطار باب السائق أو أسفل الزجاج الأمامي.",
    scanning: "جاري المسح...",

    // Trust Badges
    nmvtisVerified: "معتمد NMVTIS",
    bankLevelSecurity: "أمان بمستوى البنوك",
    privacyProtected: "لا إعادة بيع للبيانات",
    trustNote: "تتضمن التقارير بيانات من أكثر من 100 مصدر بما في ذلك NMVTIS وشركات التأمين ومزادات السيارات.",
    extensiveReport: "تقرير شامل",
    secureCheckout: "دفع آمن",
    refundEligible: "مؤهل للاسترداد",

    // How It Works - Updated step descriptions
    howItWorks: "كيف يعمل",
    enterVinStep: "أدخل VIN أو اللوحة",
    enterVinStepDesc: "أدخل أو امسح رقم VIN للمركبة المكون من 17 حرفاً، أو لوحة ترخيصها",
    instantAnalysis: "تحليل فوري",
    instantAnalysisDesc: "نبحث في ملايين السجلات في ثوانٍ",
    getReport: "احصل على التقرير",
    getReportDesc: "راجع التاريخ الشامل واتخذ قرارات مستنيرة",

    // Features
    comprehensiveData: "بيانات شاملة",
    comprehensiveDataDesc: "الوصول إلى سجلات من أكثر من 100 مصدر موثوق بما في ذلك NMVTIS وشركات التأمين وسجلات الخدمة.",
    accidentHistory: "تاريخ الحوادث",
    accidentHistoryDesc: "تقارير حوادث مفصلة مع شدة الضرر وانتشار الوسائد الهوائية وتقديرات الإصلاح.",
    ownershipRecords: "سجلات الملكية",
    ownershipRecordsDesc: "جدول زمني كامل للملكية بما في ذلك تاريخ التسجيل ونقل الملكية.",
    titleBrands: "علامات الملكية",
    titleBrandsDesc:
      "تحقق من الإنقاذ والإعادة والأضرار الناجمة عن الفيضانات وقانون الليمون وعلامات الملكية الحرجة الأخرى.",
    recallAlerts: "تنبيهات الاستدعاء",
    recallAlertsDesc: "استدعاءات الشركة المصنعة النشطة مع حالة الإكمال ومعلومات العلاج.",
    marketValue: "القيمة السوقية",
    marketValueDesc: "تقييم السوق في الوقت الفعلي بناءً على الحالة والمسافة المقطوعة والمبيعات المماثلة.",

    // Pricing
    choosePlan: "اختر خطتك",
    singleReport: "تقرير واحد",
    perReport: "لكل تقرير",
    bestValue: "أفضل قيمة",
    proPass: "تصريح برو",
    reports: "تقارير",
    perReportSavings: "لكل تقرير",
    monthly: "شهري",
    perMonth: "شهرياً",
    unlimitedReports: "تقارير غير محدودة",
    buyNow: "اشترِ الآن",
    subscribe: "اشترك",
    compareFeatures: "قارن الميزات",
    feature: "الميزة",
    included: "مشمول",
    notIncluded: "غير مشمول",

    // Footer
    footerTagline: "تقارير مركبات يثق بها الآلاف.",
    product: "المنتج",
    vinCheck: "فحص VIN",
    company: "الشركة",
    about: "حول",
    contact: "اتصل",
    careers: "الوظائف",
    legal: "قانوني",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    dataProtection: "حماية البيانات",
    encrypted: "مشفر",
    neverSellData: "نحن لا نبيع بياناتك أبداً",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Report
    aiSummary: "ملخص الذكاء الاصطناعي",
    overview: "نظرة عامة",
    ownership: "الملكية",
    history: "التاريخ والأحداث",
    accidents: "الحوادث والأضرار",
    recalls: "الاستدعاءات والسلامة",
    marketValueTab: "القيمة السوقية",
    share: "مشاركة",
    download: "تحميل",
    email: "البريد الإلكتروني",
    verifiedReport: "تقرير موثق",
    reportId: "معرف التقرير",
    generatedFor: "أُنشئ لـ",
  },
}
