import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface ProductOptionsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  personalization: string;
  setPersonalization: (text: string) => void;
  onAddToCart: () => void;
  stock?: number;
}

const ProductOptions = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  personalization,
  setPersonalization,
  onAddToCart,
  stock = 1
}: ProductOptionsProps) => {
  const colors = {
    "Orange": "#DC6B48",
    "White": "#FFFFFF",
    "Gray": "#E5E5E5",
    "Black": "#1A1A1A",
    "Brown": "#8B4513",
    "Sage": "#9CA88C"
  };

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="space-y-8">
      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium text-gray-900">Color</Label>
          <span className="text-sm text-gray-500">{selectedColor}</span>
        </div>
        <RadioGroup
          value={selectedColor}
          onValueChange={setSelectedColor}
          className="flex flex-wrap gap-3"
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
                className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-all
                  ${colorName === 'White' ? 'border-gray-300' : 'border-transparent'}
                  peer-checked:ring-2 peer-checked:ring-[#700100] peer-checked:ring-offset-2
                  hover:scale-110 transition-transform duration-200`}
                style={{ backgroundColor: colorCode }}
              >
                {selectedColor === colorName && (
                  <Check className={`w-4 h-4 ${colorName === 'White' ? 'text-black' : 'text-white'}`} />
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium text-gray-900">Size</Label>
          <a href="#size-chart" className="text-sm text-[#700100] hover:underline">Size Chart</a>
        </div>
        <RadioGroup
          value={selectedSize}
          onValueChange={setSelectedSize}
          className="grid grid-cols-4 md:grid-cols-7 gap-2"
        >
          {sizes.map((size) => (
            <div key={size}>
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className="flex h-10 cursor-pointer items-center justify-center rounded-md border-2 border-gray-200 bg-white text-sm font-medium transition-all peer-checked:border-[#700100] peer-checked:bg-[#700100] peer-checked:text-white hover:bg-gray-50"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Quantity Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-base font-medium text-gray-900">Quantity</Label>
          <span className="text-sm text-gray-500">{stock} left in stock</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100]"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-lg font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="h-10 w-10 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Personalization */}
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900">Add Personalization</Label>
        <Textarea
          placeholder="Enter your personalization text here..."
          value={personalization}
          onChange={(e) => setPersonalization(e.target.value)}
          className="min-h-[100px] resize-none border-gray-200 focus:border-[#700100] focus:ring-[#700100]"
        />
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={onAddToCart}
        className="w-full h-14 bg-black hover:bg-gray-900 text-white text-lg transition-all duration-300"
        disabled={stock === 0}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        {stock === 0 ? "Out of Stock" : "Add to Bag"}
      </Button>

      {/* Delivery Info */}
      <div className="space-y-3 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
          Free delivery in Tunisia
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
          30-day return policy
        </p>
      </div>
    </div>
  );
};

export default ProductOptions;