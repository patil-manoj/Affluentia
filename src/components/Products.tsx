import { motion } from 'framer-motion';
import { products } from '../constants';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full max-w-sm mx-auto"
    >
      <div className="relative w-full h-[280px] bg-pale-blue rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6"
        />
        <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
          <ShoppingCartIcon className="w-6 h-6" />
        </button>
      </div>      <div className="mt-4 flex flex-col gap-2.5">
        <h3 className="text-2xl font-semibold font-palanquin">{product.name}</h3>
        <p className="text-neutral-600 font-montserrat leading-normal">
          {product.description}
        </p>
        <p className="text-2xl font-semibold font-montserrat text-primary-600 mt-2">
          {product.price}
        </p>
      </div>
    </motion.div>
  );
};

const Products = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-palanquin font-bold"
        >
          Our <span className="text-primary">Popular</span> Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:max-w-lg mt-2 font-montserrat text-slate-gray"
        >
          Experience top-notch quality and style with our sought-after selections.
          Discover a world of comfort, design, and value.
        </motion.p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
