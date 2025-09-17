export interface Station {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  fuelTypes: Array<'petrol' | 'diesel' | 'cng' | 'electric'>;
  prices: {
    petrol?: number;
    diesel?: number;
    cng?: number;
  };
}

export const puneStations: Station[] = [
  {
    id: '1',
    name: 'Shell Select Fuel Station',
    address: 'FC Road, Shivajinagar, Pune, Maharashtra 411005',
    distance: '0.3 km',
    rating: 4.6,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel'],
    prices: {
      petrol: 106.31,
      diesel: 94.27
    }
  },
  {
    id: '2',
    name: 'HP Petrol Pump',
    address: 'JM Road, Deccan Gymkhana, Pune, Maharashtra 411004',
    distance: '0.8 km',
    rating: 4.4,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.25,
      diesel: 94.20,
      cng: 78.50
    }
  },
  {
    id: '3',
    name: 'IOCL Service Station',
    address: 'Baner Road, Baner, Pune, Maharashtra 411045',
    distance: '1.5 km',
    rating: 4.2,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.18,
      diesel: 94.15,
      cng: 78.75
    }
  },
  {
    id: '4',
    name: 'BPCL Energy Station',
    address: 'Koregaon Park, Pune, Maharashtra 411001',
    distance: '2.1 km',
    rating: 4.5,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'electric'],
    prices: {
      petrol: 106.35,
      diesel: 94.30
    }
  },
  {
    id: '5',
    name: 'Reliance Petrol Pump',
    address: 'Hadapsar, Pune, Maharashtra 411028',
    distance: '3.2 km',
    rating: 4.3,
    isOpen: false,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.22,
      diesel: 94.18,
      cng: 78.60
    }
  },
  {
    id: '6',
    name: 'Essar Oil Pump',
    address: 'Aundh, Pune, Maharashtra 411007',
    distance: '4.1 km',
    rating: 4.1,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel'],
    prices: {
      petrol: 106.40,
      diesel: 94.35
    }
  },
  {
    id: '7',
    name: 'HP CNG Station',
    address: 'Warje, Pune, Maharashtra 411058',
    distance: '5.3 km',
    rating: 4.0,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.28,
      diesel: 94.25,
      cng: 78.45
    }
  },
  {
    id: '8',
    name: 'IOCL Fastfill',
    address: 'Kothrud, Pune, Maharashtra 411038',
    distance: '5.8 km',
    rating: 4.2,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.20,
      diesel: 94.22,
      cng: 78.70
    }
  },
  {
    id: '9',
    name: 'Shell Electric Hub',
    address: 'Hinjewadi, Pune, Maharashtra 411057',
    distance: '12.5 km',
    rating: 4.7,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'electric'],
    prices: {
      petrol: 106.33,
      diesel: 94.28
    }
  },
  {
    id: '10',
    name: 'BPCL Smart Station',
    address: 'Viman Nagar, Pune, Maharashtra 411014',
    distance: '8.2 km',
    rating: 4.4,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng', 'electric'],
    prices: {
      petrol: 106.30,
      diesel: 94.26,
      cng: 78.55
    }
  },
  {
    id: '11',
    name: 'Reliance Smart Point',
    address: 'Magarpatta, Pune, Maharashtra 411013',
    distance: '6.7 km',
    rating: 4.3,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.24,
      diesel: 94.21,
      cng: 78.65
    }
  },
  {
    id: '12',
    name: 'HP Express',
    address: 'Pimpri-Chinchwad, Pune, Maharashtra 411018',
    distance: '15.2 km',
    rating: 4.1,
    isOpen: true,
    fuelTypes: ['petrol', 'diesel', 'cng'],
    prices: {
      petrol: 106.27,
      diesel: 94.23,
      cng: 78.40
    }
  }
];

export const sampleStations = puneStations;