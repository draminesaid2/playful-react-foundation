import React from 'react';
import { motion } from 'framer-motion';

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
}

const ProductInfo = ({ name, description, price }: ProductInfoProps) => {
  return (
    <div className="space-y-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-['WomanFontBold'] text-gray-900 leading-tight"
      >
        {name}
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#700100]"
      >
        {price} TND
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600 leading-relaxed text-base"
      >
        {description}
      </motion.p>
    </div>
  );
};

export default ProductInfo;