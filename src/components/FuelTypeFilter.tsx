import { Button } from "@/components/ui/button";
import { Fuel, Zap, Truck, Car } from "lucide-react";

interface FuelTypeFilterProps {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const fuelTypes = [
  { id: 'petrol', label: 'Petrol', icon: Car, color: 'fuel-petrol' },
  { id: 'diesel', label: 'Diesel', icon: Truck, color: 'fuel-diesel' },
  { id: 'cng', label: 'CNG', icon: Fuel, color: 'fuel-cng' },
  { id: 'electric', label: 'Electric', icon: Zap, color: 'fuel-electric' },
];

export const FuelTypeFilter = ({ selectedTypes, onTypeToggle }: FuelTypeFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {fuelTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedTypes.includes(type.id);
        
        return (
          <Button
            key={type.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeToggle(type.id)}
            className={`flex items-center space-x-2 transition-all duration-300 ${
              isSelected 
                ? `bg-${type.color} hover:bg-${type.color}/90 text-white border-${type.color}` 
                : `hover:bg-${type.color}/10 hover:border-${type.color}`
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{type.label}</span>
          </Button>
        );
      })}
    </div>
  );
};