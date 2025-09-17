import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, Plus, Minus, RotateCcw } from "lucide-react";
import { Station } from "@/data/sampleStations";

interface InteractiveMapProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
}

export const InteractiveMap = ({ stations, onStationClick }: InteractiveMapProps) => {
  const [zoom, setZoom] = useState(1);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const getMarkerColor = (types: string[]) => {
    if (types.includes('electric')) return 'text-fuel-electric';
    if (types.includes('cng')) return 'text-fuel-cng';
    if (types.includes('diesel')) return 'text-fuel-diesel';
    return 'text-fuel-petrol';
  };

  const getMarkerPosition = (index: number, total: number) => {
    // Distribute stations across the map in a realistic pattern
    const positions = [
      { x: 25, y: 30 }, { x: 65, y: 45 }, { x: 40, y: 60 }, { x: 75, y: 25 },
      { x: 30, y: 75 }, { x: 55, y: 35 }, { x: 20, y: 55 }, { x: 70, y: 65 },
      { x: 45, y: 20 }, { x: 85, y: 50 }, { x: 15, y: 40 }, { x: 60, y: 80 }
    ];
    return positions[index] || { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 };
  };

  return (
    <Card className="w-full h-96 relative overflow-hidden shadow-medium bg-gradient-card">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.8))}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom(1)}
          className="bg-white/90 backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Map Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-60 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Pune Areas Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-16 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">
            FC Road
          </div>
          <div className="absolute top-1/3 right-1/4 w-16 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">
            Koregaon Park
          </div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">
            Kothrud
          </div>
          <div className="absolute top-1/2 right-1/3 w-16 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-xs font-medium">
            Baner
          </div>
        </div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `scale(${zoom})`
        }}></div>
      </div>
      
      {/* Station Markers */}
      <div 
        className="absolute inset-0 transition-transform duration-300" 
        style={{ transform: `scale(${zoom})` }}
      >
        {stations.slice(0, 8).map((station, index) => {
          const position = getMarkerPosition(index, stations.length);
          const isSelected = selectedStation === station.id;
          
          return (
            <div
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              onClick={() => {
                setSelectedStation(station.id);
                onStationClick(station);
              }}
            >
              <div className={`relative ${isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'}`}>
                {station.fuelTypes.includes('electric') ? (
                  <Zap className={`h-8 w-8 ${getMarkerColor(station.fuelTypes)} drop-shadow-lg bg-white rounded-full p-1.5 border-2 border-current ${isSelected ? 'animate-pulse' : ''}`} />
                ) : (
                  <MapPin className={`h-8 w-8 ${getMarkerColor(station.fuelTypes)} drop-shadow-lg ${isSelected ? 'animate-pulse' : ''}`} />
                )}
                
                {/* Station Info Popup */}
                <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap transition-opacity duration-200 ${
                  isSelected ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                }`}>
                  <div className="font-medium">{station.name}</div>
                  <div className="text-green-400">{station.distance} • {station.isOpen ? 'Open' : 'Closed'}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-1">
        <div className="font-medium mb-2">Fuel Types</div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4 text-fuel-petrol" />
          <span>Petrol</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4 text-fuel-diesel" />
          <span>Diesel</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4 text-fuel-cng" />
          <span>CNG</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="h-4 w-4 text-fuel-electric" />
          <span>Electric</span>
        </div>
      </div>
    </Card>
  );
};