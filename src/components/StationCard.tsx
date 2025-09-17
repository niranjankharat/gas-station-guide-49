import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Navigation } from "lucide-react";

interface Station {
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

interface StationCardProps {
  station: Station;
  onViewDetails: (station: Station) => void;
}

const fuelTypeColors = {
  petrol: 'bg-fuel-petrol',
  diesel: 'bg-fuel-diesel', 
  cng: 'bg-fuel-cng',
  electric: 'bg-fuel-electric'
};

const fuelTypeLabels = {
  petrol: 'Petrol',
  diesel: 'Diesel',
  cng: 'CNG',
  electric: 'Electric'
};

export const StationCard = ({ station, onViewDetails }: StationCardProps) => {
  const handleGetDirections = () => {
    const query = encodeURIComponent(station.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };
  return (
    <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{station.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{station.address}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium ml-1">{station.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">{station.distance}</span>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <Clock className={`h-4 w-4 mr-2 ${station.isOpen ? 'text-green-500' : 'text-red-500'}`} />
        <span className={`text-sm font-medium ${station.isOpen ? 'text-green-600' : 'text-red-600'}`}>
          {station.isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {station.fuelTypes.map((fuelType) => (
          <Badge key={fuelType} className={`${fuelTypeColors[fuelType]} text-white text-xs px-2 py-1`}>
            {fuelTypeLabels[fuelType]}
          </Badge>
        ))}
      </div>

      {Object.keys(station.prices).length > 0 && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Current Prices</h4>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {station.prices.petrol && (
              <div>
                <span className="text-muted-foreground">Petrol:</span>
                <span className="ml-1 font-medium">₹{station.prices.petrol}</span>
              </div>
            )}
            {station.prices.diesel && (
              <div>
                <span className="text-muted-foreground">Diesel:</span>
                <span className="ml-1 font-medium">₹{station.prices.diesel}</span>
              </div>
            )}
            {station.prices.cng && (
              <div>
                <span className="text-muted-foreground">CNG:</span>
                <span className="ml-1 font-medium">₹{station.prices.cng}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={handleGetDirections}>
          <Navigation className="h-4 w-4 mr-2" />
          Directions
        </Button>
        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" onClick={() => onViewDetails(station)}>
          View Details
        </Button>
      </div>
    </Card>
  );
};