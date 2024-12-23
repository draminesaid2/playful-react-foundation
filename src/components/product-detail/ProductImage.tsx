import React from 'react';
import { motion } from 'framer-motion';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-8"
    >
      <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain mix-blend-normal p-4"
        />
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Click to zoom
      </div>
    </motion.div>
  );
};

export default ProductImage;