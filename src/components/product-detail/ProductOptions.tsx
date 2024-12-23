import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductOptionsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductOptions = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity
}: ProductOptionsProps) => {
  const colors = {
    Black: '#000000',
    White: '#FFFFFF',
    Red: '#DC2626',
    Blue: '#2563EB',
  };

  return (
    <div className="space-y-8">
      {/* Size Selection */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Select Size</Label>
        <RadioGroup
          value={selectedSize}
          onValueChange={setSelectedSize}
          className="grid grid-cols-3 md:grid-cols-6 gap-3"
        >
          {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
            <div key={size} className="relative">
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-2 border-gray-200 bg-white text-sm font-medium transition-all peer-checked:border-[#700100] peer-checked:bg-[#700100] peer-checked:text-white hover:bg-gray-50 hover:border-gray-300"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-sm text-gray-500 mt-2">
          Size guide: S (36-38), M (38-40), L (40-42), XL (42-44), 2XL (44-46), 3XL (46-48)
        </p>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Select Color</Label>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex flex-wrap gap-4"
        >
          {Object.entries(colors).map(([colorName, colorCode]) => (
            <div key={colorName} className="relative">
              <RadioGroupItem
                value={colorName}
                id={`color-${colorName}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`color-${colorName}`}
                className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 transition-all
                  ${colorName === 'White' ? 'border-gray-300' : 'border-transparent'}
                  peer-checked:ring-2 peer-checked:ring-[#700100] peer-checked:ring-offset-2
                  hover:scale-110 transition-transform duration-200`}
                style={{ backgroundColor: colorCode }}
              >
                {selectedColor === colorName && (
                  <Check className={`w-6 h-6 ${colorName === 'White' ? 'text-black' : 'text-white'}`} />
                )}
              </Label>
              <span className="mt-1 block text-center text-sm text-gray-700">{colorName}</span>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Quantity</Label>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-colors"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <motion.span 
            key={quantity}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-12 text-center text-lg font-medium"
          >
            {quantity}
          </motion.span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500 ml-2">
            (Max 10 items per order)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;