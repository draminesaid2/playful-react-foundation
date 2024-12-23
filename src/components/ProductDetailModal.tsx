import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, ShoppingCart, X, Star, Store, ArrowRight, Info } from 'lucide-react';
import { useCart } from '../components/cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { playTickSound } from '../utils/audio';
import { motion } from 'framer-motion';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    material: string;
    color: string;
    price: number;
    image: string;
    description: string;
    status: string;
  };
}

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [personalization, setPersonalization] = useState('');

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = {
    "Orange": "#DC6B48",
    "White": "#FFFFFF",
    "Gray": "#E5E5E5",
    "Black": "#1A1A1A",
    "Brown": "#8B4513",
    "Sage": "#9CA88C"
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant d'ajouter au panier",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });

    playTickSound();

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} (${selectedSize}) ajouté avec succès`,
      duration: 5000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1200px] p-0 bg-white rounded-lg shadow-xl overflow-hidden mx-auto">
        <div className="flex flex-col lg:flex-row h-[90vh] lg:h-auto">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 relative bg-gray-50 p-6">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute right-4 top-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <Heart 
                className={`h-5 w-5 ${isWishlisted ? 'fill-[#700100] text-[#700100]' : 'text-gray-400'}`}
              />
            </button>
            <div className="relative h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <div className="space-y-6">
              {/* Product Title and Price */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-['WomanFontBold']">{product.name}</h2>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#700100]">{product.price} TND</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(118 avis)</span>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Couleur: {product.color}</span>
                  <span className="text-sm text-gray-500">6 couleurs disponibles</span>
                </div>
                <div className="flex gap-2">
                  {Object.entries(colors).map(([colorName, colorCode]) => (
                    <button
                      key={colorName}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110
                        ${colorName === product.color ? 'border-[#700100] ring-2 ring-[#700100] ring-offset-2' : 'border-gray-300'}`}
                      style={{ backgroundColor: colorCode }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Taille</span>
                  <button className="text-sm text-[#700100] hover:underline">Guide des tailles</button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-sm font-medium rounded-md transition-all duration-200
                        ${selectedSize === size 
                          ? 'bg-[#700100] text-white' 
                          : 'bg-white border border-gray-300 text-gray-900 hover:border-[#700100]'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Quantité</span>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button
                      onClick={decrementQuantity}
                      className="p-1 hover:text-[#700100] transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-1 hover:text-[#700100] transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Personalization */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Personnalisation (optionnel)
                  </label>
                  <textarea
                    value={personalization}
                    onChange={(e) => setPersonalization(e.target.value)}
                    placeholder="Ajoutez votre texte personnalisé ici..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#700100] focus:border-[#700100] text-sm"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-[#700100] hover:bg-[#590000] text-white py-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                  disabled={product.status !== 'En stock'}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="font-medium">
                    {product.status === 'En stock' ? 'Ajouter au panier' : 'Produit épuisé'}
                  </span>
                </Button>

                <button className="w-full py-3 border border-[#700100] text-[#700100] rounded-lg flex items-center justify-center gap-2 hover:bg-[#700100] hover:text-white transition-all duration-300">
                  <Store className="h-5 w-5" />
                  Vérifier la disponibilité en magasin
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-medium text-gray-900">Description du produit</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-[#700100] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Matière</h4>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Informations de livraison</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#700100]" />
                    Livraison gratuite en Tunisie
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#700100]" />
                    Retours gratuits sous 14 jours
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-[#700100]" />
                    Service client disponible 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;