export interface VehicleReport {
  vin: string
  maskedVin: string
  year: number
  make: string
  model: string
  trim: string
  bodyStyle: string
  engine: string
  transmission: string
  drivetrain: string
  fuelType: string
  exteriorColor: string
  interiorColor: string
  mileage: number
  owners: number
  titleStatus: "Clean" | "Salvage" | "Rebuilt" | "Flood" | "Lemon"
  overallStatus: "GOOD_BUY" | "CAUTION" | "HIGH_RISK"
  reportId: string
  generatedAt: string
  validUntil: string
  userEmail: string
  imageUrl: string
  madeIn: string

  nmvtisVerified: boolean
  blockchainVerified: boolean

  vehiclePhotos: {
    url: string
    caption: string
    date?: string
    source?: string
  }[]

  equipment: string[]

  // AI Summary
  aiSummary: {
    assessment: "GOOD" | "CAUTION" | "SKIP"
    keyPoints: string[]
    whatThisMeans: string[]
    questionsToAsk: string[]
    bottomLine: string
  }

  // Ownership history - Enhanced with more details
  ownership: {
    owner: number
    state: string
    country: string
    purchaseDate: string
    mileageAtPurchase: number
    lastOdometerReading: number
    ownershipType: "Personal" | "Fleet" | "Lease" | "Rental" | "Commercial"
    estimatedMilesPerYear: number
    ownershipDuration: string
  }[]

  mileageAnalysis: {
    currentMileage: number
    estimatedMileage: number
    averageMileageForYear: number
    status: "below_average" | "average" | "above_average"
  }

  odometerReadings: {
    date: string
    mileage: number
    status: "verified" | "unverified"
  }[]

  // History events - Enhanced with data source
  historyEvents: {
    date: string
    type:
      | "Service"
      | "Inspection"
      | "Registration"
      | "Sale"
      | "Accident"
      | "Recall"
      | "Odometer"
      | "TitleBrand"
      | "Auction"
      | "JunkSalvage"
    description: string
    mileage?: number
    location?: string
    source: "NMVTIS" | "State Records" | "Service Provider" | "Insurance" | "Auction"
    details?: string
  }[]

  // Accidents - Enhanced with damage diagram data
  accidents: {
    date: string
    severity: "Minor" | "Moderate" | "Severe"
    description: string
    airbagDeployed: boolean
    repairCost?: number
    location?: string
    collisionType?: string
    damageAreas: ("front" | "rear" | "left" | "right" | "top" | "undercarriage")[]
    source: string
    photos?: string[]
  }[]

  // Recalls
  recalls: {
    date: string
    component: string
    description: string
    status: "Open" | "Completed" | "N/A"
    nhtsa_id?: string
  }[]

  titleHistory: {
    date: string
    state: string
    mileage: number
    event: string
    isCurrent: boolean
  }[]

  majorTitleBrandChecks: {
    brand: string
    status: "clear" | "problem"
    date?: string
    description?: string
  }[]

  otherTitleBrandChecks: {
    brand: string
    status: "clear" | "problem"
  }[]

  junkSalvageRecords: {
    date: string
    reportingEntity: string
    location: string
    phone?: string
    email?: string
    recordType: "Junk and Salvage" | "Insurers"
    disposition?: string
    intendedForExport: boolean
  }[]

  odometerChecks: {
    check: string
    status: "clear" | "problem"
    date?: string
    description?: string
  }[]

  stolenVehicleCheck: {
    databasesChecked: number
    status: "clear" | "problem"
    records: any[]
  }

  inspections: {
    date: string
    mileage: number
    type: "Emissions" | "Safety" | "Both"
    result: "Passed" | "Failed"
    details: {
      obdTest?: "Passed" | "Failed"
      smokeTest?: "Passed" | "Failed"
      visualInspection?: "Passed" | "Failed"
      liquidLeakTest?: "Passed" | "Failed"
    }
    state: string
  }[]

  salesHistory: {
    date: string
    mileage: number
    saleType: "Dealer" | "Auction" | "Private" | "Retail"
    location: string
    price?: number
    photos?: string[]
    condition?: string
    highlights?: string[]
  }[]

  marketValue: {
    estimated: number
    range: { low: number; high: number }
    condition: "Excellent" | "Good" | "Fair" | "Poor"
    factors: { factor: string; impact: "positive" | "negative" | "neutral"; description: string }[]
    classifiedPrice: {
      average: number
      belowMarket: number
      aboveMarket: number
    }
    auctionPrice: {
      average: number
      belowMarket: number
      aboveMarket: number
    }
    priceByYear: { year: number; price: number }[]
    priceByMileage: { mileage: number; price: number }[]
  }
}

export const mockReport: VehicleReport = {
  vin: "1HGBH41JXMN109186",
  maskedVin: "XXXXXXXXXXXXX9186",
  year: 2021,
  make: "Honda",
  model: "Accord",
  trim: "EX-L",
  bodyStyle: "Sedan",
  engine: "1.5L Turbo I4",
  transmission: "CVT Automatic",
  drivetrain: "FWD",
  fuelType: "Gasoline",
  exteriorColor: "Crystal Black Pearl",
  interiorColor: "Black Leather",
  mileage: 42850,
  owners: 2,
  titleStatus: "Clean",
  overallStatus: "GOOD_BUY",
  reportId: "CARMR-3847-2025-001",
  generatedAt: new Date().toISOString(),
  validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  userEmail: "user@email.com",
  imageUrl: "/2021-honda-accord-ex-l-black-sedan-front-view.jpg",
  madeIn: "United States (Ohio)",
  nmvtisVerified: true,
  blockchainVerified: true,

  vehiclePhotos: [
    {
      url: "/2021-honda-accord-black-sedan-front-3-4-view.jpg",
      caption: "Front 3/4 View",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
    {
      url: "/2021-honda-accord-black-sedan-rear-view.jpg",
      caption: "Rear View",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
    {
      url: "/2021-honda-accord-black-sedan-side-view.jpg",
      caption: "Side View",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
    {
      url: "/honda-accord-interior-dashboard-black-leather.jpg",
      caption: "Interior Dashboard",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
    {
      url: "/honda-accord-black-leather-seats-interior.jpg",
      caption: "Interior Seats",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
    {
      url: "/honda-accord-engine-bay-1-5l-turbo.jpg",
      caption: "Engine Bay",
      date: "2023-06-20",
      source: "Dealer Listing",
    },
  ],

  equipment: [
    "4-Wheel Disc Brakes",
    "ABS Brakes",
    "Adaptive Cruise Control",
    "Air Conditioning",
    "Alloy Wheels",
    "Android Auto",
    "Anti-theft System",
    "Apple CarPlay",
    "Auto-dimming Mirror",
    "Backup Camera",
    "Blind Spot Monitor",
    "Bluetooth",
    "Cruise Control",
    "Daytime Running Lights",
    "Driver Adjustable Lumbar",
    "Dual Zone Climate Control",
    "Electronic Stability Control",
    "Forward Collision Warning",
    "Front Airbags (Driver)",
    "Front Airbags (Passenger)",
    "Front Side Airbags",
    "Heated Front Seats",
    "Heated Mirrors",
    "Honda Sensing Suite",
    "Keyless Entry",
    "Keyless Start",
    "Lane Departure Warning",
    "Lane Keeping Assist",
    "Leather Seats",
    "LED Headlights",
    "Navigation System",
    "Power Door Locks",
    "Power Mirrors",
    "Power Seats",
    "Power Sunroof",
    "Power Windows",
    "Premium Audio System",
    "Push Button Start",
    "Rear Cross Traffic Alert",
    "Remote Engine Start",
    "Satellite Radio",
    "Smart Key System",
    "Steering Wheel Audio Controls",
    "Tire Pressure Monitor",
    "Traction Control",
    "Trip Computer",
    "USB Ports",
  ],

  aiSummary: {
    assessment: "GOOD",
    keyPoints: [
      "Clean title with no reported issues",
      "Regular maintenance at Honda dealership",
      "Two careful owners, no commercial use",
      "One minor fender bender in 2023 (fully repaired)",
      "All recalls completed",
      "Below average mileage for year",
    ],
    whatThisMeans: [
      "This vehicle has been well-maintained throughout its life. The single minor accident was cosmetic damage that was professionally repaired.",
      "The consistent service history at authorized dealerships suggests the previous owners took good care of this car.",
      "At 42,850 miles, this is below the average for a 2021 model, which typically sees around 52,000 miles by now.",
    ],
    questionsToAsk: [
      "Can you show me the repair records from the 2023 fender repair?",
      "Why is the second owner selling after only 18 months?",
      "Has the CVT transmission fluid been changed per Honda's schedule?",
      "Are there any aftermarket modifications I should know about?",
    ],
    bottomLine:
      "This is a solid buy. The minor accident is not a concern given the repair quality and clean title status.",
  },

  ownership: [
    {
      owner: 1,
      state: "CA",
      country: "United States",
      purchaseDate: "2021-03-15",
      mileageAtPurchase: 12,
      lastOdometerReading: 28450,
      ownershipType: "Personal",
      estimatedMilesPerYear: 12500,
      ownershipDuration: "2 yrs. 3 mo.",
    },
    {
      owner: 2,
      state: "CA",
      country: "United States",
      purchaseDate: "2023-06-20",
      mileageAtPurchase: 28450,
      lastOdometerReading: 42850,
      ownershipType: "Personal",
      estimatedMilesPerYear: 9600,
      ownershipDuration: "1 yr. 6 mo.",
    },
  ],

  mileageAnalysis: {
    currentMileage: 42850,
    estimatedMileage: 44200,
    averageMileageForYear: 52000,
    status: "below_average",
  },

  odometerReadings: [
    { date: "2021-03-15", mileage: 12, status: "verified" },
    { date: "2021-09-10", mileage: 7500, status: "verified" },
    { date: "2022-03-22", mileage: 15200, status: "verified" },
    { date: "2022-06-15", mileage: 18500, status: "verified" },
    { date: "2022-09-15", mileage: 22100, status: "verified" },
    { date: "2023-01-18", mileage: 26800, status: "verified" },
    { date: "2023-06-20", mileage: 28450, status: "verified" },
    { date: "2023-12-10", mileage: 35200, status: "verified" },
    { date: "2024-06-08", mileage: 41000, status: "verified" },
    { date: "2024-09-20", mileage: 42100, status: "verified" },
    { date: "2024-12-01", mileage: 42850, status: "verified" },
  ],

  historyEvents: [
    {
      date: "2021-03-15",
      type: "Sale",
      description: "Sold by Honda of Santa Monica",
      mileage: 12,
      location: "Santa Monica, CA",
      source: "Service Provider",
    },
    {
      date: "2021-03-15",
      type: "Registration",
      description: "First registered in California",
      location: "CA",
      source: "NMVTIS",
      mileage: 12,
    },
    {
      date: "2021-09-10",
      type: "Service",
      description: "Oil change, tire rotation, multi-point inspection",
      mileage: 7500,
      location: "Santa Monica, CA",
      source: "Service Provider",
    },
    {
      date: "2022-03-22",
      type: "Service",
      description: "15,000 mile service, brake inspection",
      mileage: 15200,
      location: "Santa Monica, CA",
      source: "Service Provider",
    },
    {
      date: "2022-06-15",
      type: "Inspection",
      description: "Passed California smog check",
      mileage: 18500,
      location: "CA",
      source: "State Records",
      details: "Overall result of the OBD, Smoke and Liquid Leak tests: Passed",
    },
    {
      date: "2022-09-15",
      type: "Odometer",
      description: "Odometer reading recorded",
      mileage: 22100,
      location: "CA",
      source: "NMVTIS",
    },
    {
      date: "2023-01-18",
      type: "Accident",
      description: "Minor collision reported - front bumper damage",
      mileage: 26800,
      location: "Los Angeles, CA",
      source: "Insurance",
    },
    {
      date: "2023-02-05",
      type: "Service",
      description: "Collision repair completed - front bumper replaced",
      mileage: 26850,
      location: "Certified Collision Center, LA",
      source: "Service Provider",
    },
    {
      date: "2023-06-20",
      type: "Sale",
      description: "Vehicle offered for sale at dealer",
      mileage: 28450,
      location: "Los Angeles, CA",
      source: "Service Provider",
    },
    {
      date: "2023-06-20",
      type: "Registration",
      description: "Title and Registration",
      mileage: 28450,
      location: "CA",
      source: "NMVTIS",
    },
    {
      date: "2023-12-10",
      type: "Service",
      description: "Oil change, cabin air filter replaced",
      mileage: 35200,
      location: "Torrance, CA",
      source: "Service Provider",
    },
    {
      date: "2024-06-08",
      type: "Inspection",
      description: "Passed California smog check",
      mileage: 41000,
      location: "CA",
      source: "State Records",
      details: "Overall result of the OBD, Smoke and Liquid Leak tests: Passed",
    },
    {
      date: "2024-06-15",
      type: "Service",
      description: "45,000 mile major service completed",
      mileage: 41000,
      location: "Torrance, CA",
      source: "Service Provider",
    },
    {
      date: "2024-09-20",
      type: "Odometer",
      description: "Odometer reading recorded",
      mileage: 42100,
      location: "CA",
      source: "NMVTIS",
    },
  ],

  accidents: [
    {
      date: "2023-01-18",
      severity: "Minor",
      description: "Front-end collision at low speed. Damage limited to front bumper and minor hood damage.",
      airbagDeployed: false,
      repairCost: 2850,
      location: "Los Angeles, CA",
      collisionType: "Hit Object",
      damageAreas: ["front"],
      source: "Insurance Records",
      photos: ["/car-front-bumper-damage-minor.jpg", "/car-hood-minor-dent.jpg"],
    },
  ],

  recalls: [
    {
      date: "2021-08-15",
      component: "Fuel Pump",
      description: "Fuel pump may fail causing engine stall",
      status: "Completed",
      nhtsa_id: "21V-560",
    },
    {
      date: "2022-02-10",
      component: "Rearview Camera",
      description: "Rearview camera image may not display",
      status: "Completed",
      nhtsa_id: "22V-089",
    },
  ],

  titleHistory: [
    { date: "2024-09-20", state: "CA", mileage: 42100, event: "Title and Registration", isCurrent: true },
    { date: "2023-06-20", state: "CA", mileage: 28450, event: "Title and Registration", isCurrent: false },
    { date: "2021-03-15", state: "CA", mileage: 12, event: "Title and Registration (Original)", isCurrent: false },
  ],

  majorTitleBrandChecks: [
    { brand: "Salvage brand", status: "clear" },
    { brand: "Rebuilt or rebuildable brand", status: "clear" },
    { brand: "Fire brand", status: "clear" },
    { brand: "Hail brand", status: "clear" },
    { brand: "Flood brand", status: "clear" },
    { brand: "Manufacturer buyback", status: "clear" },
    { brand: "Junk or scrapped brand", status: "clear" },
    { brand: "Export Only Vehicle", status: "clear" },
  ],

  otherTitleBrandChecks: [
    { brand: "Vehicle Safety Defect Corrected", status: "clear" },
    { brand: "Prior Owner Retained", status: "clear" },
    { brand: "Vehicle Non-conformity Corrected", status: "clear" },
    { brand: "Memorandum Copy", status: "clear" },
    { brand: "Recovered Theft", status: "clear" },
    { brand: "Prior Non-Repairable / Repaired", status: "clear" },
    { brand: "Owner Retained", status: "clear" },
    { brand: "Prior Taxi", status: "clear" },
    { brand: "Prior Police", status: "clear" },
    { brand: "Refurbished", status: "clear" },
    { brand: "Collision", status: "clear" },
    { brand: "Test Vehicle", status: "clear" },
    { brand: "Dismantled", status: "clear" },
    { brand: "Kit", status: "clear" },
    { brand: "Gray Market: Non-compliant", status: "clear" },
    { brand: "Original Taxi", status: "clear" },
    { brand: "Former Rental", status: "clear" },
    { brand: "Original Police", status: "clear" },
    { brand: "Vandalism", status: "clear" },
    { brand: "Gray Market", status: "clear" },
    { brand: "Bond Posted", status: "clear" },
    { brand: "Antique", status: "clear" },
    { brand: "Parts Only", status: "clear" },
    { brand: "Classic", status: "clear" },
    { brand: "Undisclosed Lien", status: "clear" },
    { brand: "Agricultural Vehicle", status: "clear" },
    { brand: "Logging Vehicle", status: "clear" },
    { brand: "Street Rod", status: "clear" },
    { brand: "VIN Replaced", status: "clear" },
    { brand: "Vehicle Contains Reissued VIN", status: "clear" },
    { brand: "Replica", status: "clear" },
    { brand: "Disclosed Damage", status: "clear" },
    { brand: "Totaled", status: "clear" },
    { brand: "Crushed", status: "clear" },
    { brand: "Salt water damage", status: "clear" },
  ],

  junkSalvageRecords: [],

  odometerChecks: [
    { check: "Odometer: Not Actual", status: "clear" },
    { check: "Odometer: Tampering Verified", status: "clear" },
    { check: "Odometer: Exempt from Disclosure", status: "clear" },
    { check: "Odometer: Exceeds Mechanical Limits", status: "clear" },
    { check: "Odometer: May be Altered", status: "clear" },
    { check: "Odometer: Replaced", status: "clear" },
    { check: "Odometer: Reading at Time of Renewal", status: "clear" },
    { check: "Odometer: Discrepancy", status: "clear" },
    { check: "Odometer: Call Title Division", status: "clear" },
    { check: "Odometer: Exceeds Mechanical Limits Rectified", status: "clear" },
  ],

  stolenVehicleCheck: {
    databasesChecked: 70,
    status: "clear",
    records: [],
  },

  inspections: [
    {
      date: "2024-06-08",
      mileage: 41000,
      type: "Emissions",
      result: "Passed",
      details: { obdTest: "Passed", smokeTest: "Passed", visualInspection: "Passed", liquidLeakTest: "Passed" },
      state: "CA",
    },
    {
      date: "2022-06-15",
      mileage: 18500,
      type: "Emissions",
      result: "Passed",
      details: { obdTest: "Passed", smokeTest: "Passed", visualInspection: "Passed", liquidLeakTest: "Passed" },
      state: "CA",
    },
  ],

  salesHistory: [
    {
      date: "2021-03-15",
      mileage: 12,
      saleType: "Dealer",
      location: "Santa Monica, CA",
      price: 32500,
      condition: "New",
    },
    {
      date: "2023-06-20",
      mileage: 28450,
      saleType: "Dealer",
      location: "Los Angeles, CA",
      price: 26800,
      condition: "Excellent",
      photos: [
        "/honda-accord-black-for-sale-dealer-lot.jpg",
        "/honda-accord-interior-clean.jpg",
        "/honda-accord-side-profile-black.jpg",
      ],
      highlights: ["One Owner", "Clean Title", "Full Service History"],
    },
  ],

  marketValue: {
    estimated: 24500,
    range: { low: 22800, high: 26200 },
    condition: "Good",
    factors: [
      { factor: "Clean Title", impact: "positive", description: "No title brands increase value" },
      { factor: "Low Mileage", impact: "positive", description: "Below average miles for model year" },
      { factor: "Minor Accident", impact: "negative", description: "Reported accident slightly reduces value" },
      { factor: "Popular Model", impact: "positive", description: "Honda Accord holds value well" },
      { factor: "Full Service History", impact: "positive", description: "Complete records add buyer confidence" },
    ],
    classifiedPrice: {
      average: 25200,
      belowMarket: 22500,
      aboveMarket: 27900,
    },
    auctionPrice: {
      average: 21800,
      belowMarket: 19500,
      aboveMarket: 24100,
    },
    priceByYear: [
      { year: 2019, price: 18500 },
      { year: 2020, price: 21200 },
      { year: 2021, price: 24500 },
      { year: 2022, price: 27800 },
      { year: 2023, price: 30500 },
    ],
    priceByMileage: [
      { mileage: 20000, price: 27500 },
      { mileage: 30000, price: 26000 },
      { mileage: 40000, price: 24500 },
      { mileage: 50000, price: 23000 },
      { mileage: 60000, price: 21500 },
    ],
  },
}

export const mockCautionReport: VehicleReport = {
  ...mockReport,
  vin: "2T1BURHE5JC073215",
  maskedVin: "XXXXXXXXXXXXX3215",
  year: 2018,
  make: "Toyota",
  model: "Corolla",
  trim: "LE",
  mileage: 89500,
  owners: 4,
  overallStatus: "CAUTION",
  imageUrl: "/2018-toyota-corolla-le-silver-sedan.jpg",
  vehiclePhotos: [
    { url: "/2018-toyota-corolla-silver-front.jpg", caption: "Front View" },
    { url: "/2018-toyota-corolla-silver-rear.jpg", caption: "Rear View" },
  ],
  equipment: ["Air Conditioning", "Bluetooth", "Backup Camera", "Cruise Control", "Power Windows", "Power Locks"],
  odometerReadings: [
    { date: "2018-04-10", mileage: 15, status: "verified" },
    { date: "2019-06-15", mileage: 22500, status: "verified" },
    { date: "2020-08-20", mileage: 45800, status: "verified" },
    { date: "2021-11-05", mileage: 62300, status: "verified" },
    { date: "2023-03-18", mileage: 78900, status: "verified" },
    { date: "2024-09-01", mileage: 89500, status: "verified" },
  ],
  aiSummary: {
    assessment: "CAUTION",
    keyPoints: [
      "Multiple owners (4) in 6 years",
      "High mileage for age",
      "One moderate accident on record",
      "Service gaps between 2021-2023",
    ],
    whatThisMeans: [
      "Four owners in 6 years is above average turnover. While not necessarily bad, it warrants investigation.",
      "The service gap could indicate deferred maintenance or unreported issues.",
    ],
    questionsToAsk: [
      "Why has this car had 4 owners?",
      "What maintenance was done during the 2021-2023 gap?",
      "Can I get a pre-purchase inspection?",
    ],
    bottomLine: "Proceed with caution. Get a thorough inspection before buying.",
  },
  mileageAnalysis: {
    currentMileage: 89500,
    estimatedMileage: 91000,
    averageMileageForYear: 75000,
    status: "above_average",
  },
  accidents: [
    {
      date: "2021-05-20",
      severity: "Moderate",
      description: "Side collision. Door and fender damage. Professionally repaired.",
      airbagDeployed: false,
      repairCost: 5200,
      damageAreas: ["left"],
      source: "Insurance Records",
      collisionType: "Side Impact",
    },
  ],
  marketValue: {
    ...mockReport.marketValue,
    estimated: 12500,
    range: { low: 10800, high: 14200 },
    classifiedPrice: { average: 13200, belowMarket: 11500, aboveMarket: 14900 },
    auctionPrice: { average: 10800, belowMarket: 9200, aboveMarket: 12400 },
    priceByYear: [],
    priceByMileage: [],
  },
}

// High risk report example
export const mockHighRiskReport: VehicleReport = {
  ...mockReport,
  vin: "3FA6P0H77KR245892",
  maskedVin: "XXXXXXXXXXXXX5892",
  year: 2019,
  make: "Ford",
  model: "Fusion",
  trim: "SE",
  mileage: 67200,
  owners: 3,
  titleStatus: "Rebuilt",
  overallStatus: "HIGH_RISK",
  imageUrl: "/2019-ford-fusion-se-blue-sedan-damaged.jpg",
  vehiclePhotos: [
    { url: "/2019-ford-fusion-blue-front-damaged.jpg", caption: "Front View - Before Repair" },
    { url: "/placeholder.svg?height=400&width=600", caption: "Side View" },
  ],
  equipment: ["Air Conditioning", "Bluetooth", "Backup Camera", "SYNC 3", "Power Seats"],
  odometerReadings: [
    { date: "2019-02-15", mileage: 8, status: "verified" },
    { date: "2020-05-20", mileage: 28500, status: "verified" },
    { date: "2021-08-10", mileage: 45200, status: "verified" },
    { date: "2022-11-25", mileage: 58900, status: "verified" },
    { date: "2024-06-15", mileage: 67200, status: "verified" },
  ],
  aiSummary: {
    assessment: "SKIP",
    keyPoints: [
      "Rebuilt title - previously declared total loss",
      "Severe front-end collision in 2022",
      "Structural damage reported",
      "Airbags deployed",
    ],
    whatThisMeans: [
      "This vehicle was deemed a total loss by insurance due to the extent of damage.",
      "Rebuilt titles significantly reduce resale value and can affect insurance rates.",
      "Structural damage may compromise safety in future collisions.",
    ],
    questionsToAsk: [
      "Who performed the rebuild and are they certified?",
      "Can you provide a frame inspection report?",
      "What specific repairs were made?",
    ],
    bottomLine: "High risk purchase. Consider other options unless significantly discounted.",
  },
  mileageAnalysis: {
    currentMileage: 67200,
    estimatedMileage: 68500,
    averageMileageForYear: 62500,
    status: "average",
  },
  accidents: [
    {
      date: "2022-03-15",
      severity: "Severe",
      description: "Major front-end collision. Vehicle declared total loss. Airbags deployed. Structural damage.",
      airbagDeployed: true,
      repairCost: 18500,
      damageAreas: ["front", "left"],
      source: "Insurance Records",
      collisionType: "Frontal Collision",
      photos: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    },
  ],
  majorTitleBrandChecks: [
    { brand: "Salvage brand", status: "problem", date: "2022-04-01", description: "Vehicle declared total loss" },
    {
      brand: "Rebuilt or rebuildable brand",
      status: "problem",
      date: "2022-08-15",
      description: "Rebuilt title issued after repairs",
    },
    ...mockReport.majorTitleBrandChecks.slice(2),
  ],
  marketValue: {
    ...mockReport.marketValue,
    estimated: 8500,
    range: { low: 6800, high: 10200 },
    condition: "Fair",
    classifiedPrice: { average: 9200, belowMarket: 7500, aboveMarket: 10900 },
    auctionPrice: { average: 6800, belowMarket: 5200, aboveMarket: 8400 },
    factors: [
      { factor: "Rebuilt Title", impact: "negative", description: "Significantly reduces value (30-50%)" },
      { factor: "Structural Damage", impact: "negative", description: "May affect safety and insurance" },
      { factor: "Airbag Deployment", impact: "negative", description: "Indicates severe collision" },
    ],
    priceByYear: [],
    priceByMileage: [],
  },
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  pricePerReport?: number
  reports: number | "unlimited"
  duration?: string
  badge?: string
  features: string[]
  popular?: boolean
  bestValue?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "single",
    name: "1 Report",
    description: "Try it out",
    price: 19.99,
    pricePerReport: 19.99,
    reports: 1,
    features: ["Full vehicle history", "AI-powered summary", "Market value estimate", "PDF download"],
  },
  {
    id: "five-pack",
    name: "5 Reports",
    description: "Great for comparing options",
    price: 29.99,
    pricePerReport: 6.0,
    reports: 5,
    features: ["Full vehicle history", "AI-powered summary", "Market value estimate", "PDF download", "Save $70"],
  },
  {
    id: "twenty-pack",
    name: "20 Reports",
    description: "For serious car shoppers",
    price: 89.99,
    pricePerReport: 4.5,
    reports: 20,
    features: ["Full vehicle history", "AI-powered summary", "Market value estimate", "PDF downloads", "Save $310"],
  },
]

export const proPass: PricingPlan = {
  id: "pro-pass",
  name: "3-Day Pro Pass",
  description: "Unlimited reports for 72 hours",
  price: 0.99,
  reports: "unlimited",
  duration: "72 hours",
  badge: "BEST FOR SHOPPING",
  bestValue: true,
  features: [
    "Unlimited vehicle checks",
    "Full AI summaries",
    "Market value estimates",
    "PDF downloads",
    "Perfect for car shopping weekends",
  ],
}

export const monthlyPlan: PricingPlan = {
  id: "monthly",
  name: "Unlimited Monthly",
  description: "Unlimited reports, cancel anytime",
  price: 39.99,
  reports: "unlimited",
  duration: "month",
  badge: "MOST POPULAR",
  popular: true,
  features: [
    "Unlimited vehicle checks",
    "Full AI summaries",
    "Market value estimates",
    "PDF downloads",
    "Priority support",
    "Cancel anytime",
  ],
}

export type DemoState = "normal" | "out-of-reports" | "rate-limited" | "requires-captcha"

export interface UserPlan {
  type: "package" | "pro-pass" | "monthly" | "none"
  reportsRemaining?: number
  expiresAt?: string
}

export const mockUserPlan: UserPlan = {
  type: "package",
  reportsRemaining: 3,
  expiresAt: "2026-01-15",
}
