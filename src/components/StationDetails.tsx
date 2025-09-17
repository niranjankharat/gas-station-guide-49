import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Navigation, Phone, Share2, Heart } from "lucide-react";
import { Station } from "@/data/sampleStations";

interface StationDetailsProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StationDetails = ({ station, isOpen, onClose }: StationDetailsProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!station) return null;

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

  const handleGetDirections = () => {
    const query = encodeURIComponent(station.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: station.name,
          text: `Check out ${station.name} - ${station.address}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${station.name} - ${station.address}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">{station.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-red-500 hover:text-red-600"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{station.address}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium">{station.rating}</span>
                </div>
                <span className="text-muted-foreground">{station.distance}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className={`h-4 w-4 mr-2 ${station.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${station.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {station.isOpen ? 'Open 24/7' : 'Closed'}
                </span>
              </div>
            </div>
          </div>

          {/* Fuel Types */}
          <div>
            <h4 className="font-semibold mb-3">Available Fuel Types</h4>
            <div className="flex flex-wrap gap-2">
              {station.fuelTypes.map((fuelType) => (
                <Badge key={fuelType} className={`${fuelTypeColors[fuelType]} text-white`}>
                  {fuelTypeLabels[fuelType]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Prices */}
          {Object.keys(station.prices).length > 0 && (
            <div>
              <h4 className="font-semibold mb-3">Current Prices (₹/Litre)</h4>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                {station.prices.petrol && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Petrol:</span>
                    <span className="font-medium">₹{station.prices.petrol}</span>
                  </div>
                )}
                {station.prices.diesel && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Diesel:</span>
                    <span className="font-medium">₹{station.prices.diesel}</span>
                  </div>
                )}
                {station.prices.cng && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CNG:</span>
                    <span className="font-medium">₹{station.prices.cng}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact & Actions */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button onClick={handleGetDirections} className="flex-1">
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Call Station
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
            <p className="mb-1">• Prices updated 2 hours ago</p>
            <p className="mb-1">• Accepts cash and digital payments</p>
            <p>• Restroom and refreshment facilities available</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};