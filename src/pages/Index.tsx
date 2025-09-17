import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/SearchBox";
import { FuelTypeFilter } from "@/components/FuelTypeFilter";
import { StationCard } from "@/components/StationCard";
import { InteractiveMap } from "@/components/InteractiveMap";
import { StationDetails } from "@/components/StationDetails";
import { sampleStations, Station } from "@/data/sampleStations";
import { Fuel, MapPin, Filter, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-fuel-station.jpg";

const Index = () => {
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [searchLocation, setSearchLocation] = useState("Pune, Maharashtra");
  const [showMap, setShowMap] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const puneAreas = [
    "FC Road, Shivajinagar", "JM Road, Deccan", "Koregaon Park", "Baner Road",
    "Hadapsar", "Aundh", "Warje", "Kothrud", "Hinjewadi", "Viman Nagar",
    "Magarpatta", "Pimpri-Chinchwad"
  ];

  const handleFuelTypeToggle = (type: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSearch = (location: string) => {
    setSearchLocation(location);
    toast({
      title: "Searching stations...",
      description: `Finding fuel stations near ${location}`,
    });
  };

  const handleNearMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchLocation("Current Location");
          toast({
            title: "Location found!",
            description: "Searching for nearby fuel stations",
          });
        },
        (error) => {
          toast({
            title: "Location access denied",
            description: "Please allow location access or search manually",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (station: Station) => {
    setSelectedStation(station);
    setIsDetailsOpen(true);
  };

  const handleStationClick = (station: Station) => {
    handleViewDetails(station);
  };

  const filteredStations = selectedFuelTypes.length > 0 
    ? sampleStations.filter(station => 
        station.fuelTypes.some(type => selectedFuelTypes.includes(type))
      )
    : sampleStations;

  const sortedStations = filteredStations.sort((a, b) => {
    const distanceA = parseFloat(a.distance.replace(' km', ''));
    const distanceB = parseFloat(b.distance.replace(' km', ''));
    return distanceA - distanceB;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <Fuel className="h-16 w-16 text-white mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              FuelFinder
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-300 ml-4 animate-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-2 max-w-2xl mx-auto animate-fade-in">
            Find petrol, CNG, diesel & electric stations in Pune
          </p>
          <p className="text-lg text-white/75 mb-8 animate-fade-in">
            Real-time prices • Live locations • Instant directions
          </p>
          
          <div className="mb-8 animate-scale-in">
            <SearchBox onSearch={handleSearch} onNearMe={handleNearMe} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm animate-fade-in">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>12 stations in Pune</span>
            </div>
            <div className="flex items-center">
              <Fuel className="h-4 w-4 mr-2" />
              <span>Live fuel prices</span>
            </div>
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Smart filters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Areas Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-center mb-4">Quick Search in Popular Areas</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {puneAreas.map((area) => (
              <Button
                key={area}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(area)}
                className="text-xs hover:bg-primary hover:text-white transition-colors duration-300"
              >
                {area}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Fuel Stations in {searchLocation}
            </h2>
            <p className="text-muted-foreground">
              Updated prices • Live availability • Instant directions
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <FuelTypeFilter 
              selectedTypes={selectedFuelTypes}
              onTypeToggle={handleFuelTypeToggle}
            />
            
            <div className="flex gap-3">
              <Button
                variant={showMap ? "default" : "outline"}
                onClick={() => setShowMap(!showMap)}
                className="flex items-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        {showMap && (
          <section className="mb-8">
            <InteractiveMap 
              stations={sortedStations} 
              onStationClick={handleStationClick}
            />
          </section>
        )}

        {/* Stations List */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">
              {sortedStations.length} stations found
            </h3>
            <div className="text-sm text-muted-foreground">
              Sorted by distance
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedStations.map((station) => (
              <StationCard 
                key={station.id} 
                station={station} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Station Details Modal */}
      <StationDetails
        station={selectedStation}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Fuel className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-foreground">FuelFinder</span>
            </div>
            <p className="text-muted-foreground mb-2">
              Your trusted companion for finding fuel stations in Pune
            </p>
            <div className="text-sm text-muted-foreground space-x-4">
              <span>&copy; 2024 FuelFinder</span>
              <span>•</span>
              <span>Pune, Maharashtra</span>
              <span>•</span>
              <span>Real-time data</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;