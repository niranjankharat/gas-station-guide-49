import { Card } from "@/components/ui/card";
import { MapPin, Zap } from "lucide-react";

export const MapView = () => {
  // Sample station markers for the placeholder map
  const sampleMarkers = [
    { id: 1, x: 25, y: 30, type: 'petrol' },
    { id: 2, x: 65, y: 45, type: 'diesel' },
    { id: 3, x: 40, y: 60, type: 'cng' },
    { id: 4, x: 75, y: 25, type: 'electric' },
    { id: 5, x: 30, y: 75, type: 'petrol' },
  ];

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'petrol': return 'text-fuel-petrol';
      case 'diesel': return 'text-fuel-diesel';
      case 'cng': return 'text-fuel-cng';
      case 'electric': return 'text-fuel-electric';
      default: return 'text-primary';
    }
  };

  return (
    <Card className="w-full h-96 relative overflow-hidden shadow-medium bg-gradient-card">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Street lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-gray-300 opacity-60"></div>
        <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300 opacity-60"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-300 opacity-60"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-300 opacity-60"></div>
      </div>
      
      {/* Station Markers */}
      {sampleMarkers.map((marker) => (
        <div
          key={marker.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          <div className="relative">
            {marker.type === 'electric' ? (
              <Zap className={`h-8 w-8 ${getMarkerColor(marker.type)} drop-shadow-lg bg-white rounded-full p-1.5 border-2 border-current`} />
            ) : (
              <MapPin className={`h-8 w-8 ${getMarkerColor(marker.type)} drop-shadow-lg`} />
            )}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {marker.type.charAt(0).toUpperCase() + marker.type.slice(1)} Station
            </div>
          </div>
        </div>
      ))}
      
      {/* Map Placeholder Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center p-6 bg-white/80 rounded-lg shadow-soft">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Interactive Map</h3>
          <p className="text-sm text-muted-foreground">Fuel stations will appear here</p>
        </div>
      </div>
    </Card>
  );
};