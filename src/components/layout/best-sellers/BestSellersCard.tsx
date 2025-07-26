import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

import { toast } from 'sonner';
import { useState, ChangeEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ClientMenuItem } from '../../../../types/cart';
import { IExtraPrice } from '@/models/MenuItem';

const BestSellersCard = ({ product }: { product: ClientMenuItem }) => {
  const [selectedSize, setSelectedSize] = useState<IExtraPrice | null>(
    product.sizes?.[0] || null
  );
  const [selectedExtras, setSelectedExtras] = useState<IExtraPrice[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  const hasOptions = (product.sizes?.length || 0) > 0 || 
                    (product.extraIngredients?.length || 0) > 0;

  async function handleAddToCartButtonClick() {
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    
    addToCart(product, selectedSize || undefined, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Added to cart!');
    setShowPopup(false);
  }

  function handleExtraThingClick(
    ev: ChangeEvent<HTMLInputElement>,
    extraThing: IExtraPrice
  ) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => prev.filter(e => e._id !== extraThing._id));
    }
  }

  let selectedPrice = product.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    selectedPrice += selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  }

  return (
    <>
      {showPopup && (
        <div 
          onClick={() => setShowPopup(false)}
          className='z-50 fixed inset-0 bg-white/80 flex items-center justify-center'
        >
          <div 
            className="my-8 bg-white overflow-y-scroll p-2 rounded-lg max-w-md scrollbar-hide"
            style={{maxHeight:'calc(100vh - 100px)'}}
          >
            <Card
              onClick={e => e.stopPropagation()}
              className="max-w-md rounded-xl bg-white group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 text-gray-600">
                <h3 className="text-gray-900 font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm mb-4">{product.description}</p>
                <div>
                  {(product.sizes?.length || 0) > 0 && (
                    <div className='py-2'>
                      <h3 className='text-center text-base font-semibold'>Pick your size</h3>
                      {product.sizes?.map(size => (
                        <Label className='max-w-max flex items-center gap-1 rounded-md mb-1' key={size._id}>
                          <Input
                            onChange={() => setSelectedSize(size)}
                            checked={selectedSize?._id === size._id}
                            className='cursor-pointer' 
                            type="radio" 
                            name="size"
                          /> 
                          <span className='capitalize'>{size.name}</span>
                          <span>${(product.basePrice + size.price).toFixed(2)}</span>
                        </Label>
                      ))}
                    </div>
                  )}
                  {(product.extraIngredients?.length || 0) > 0 && (
                    <div className='py-2'>
                      <h3 className='text-center text-gray-700'>Pick your extra</h3>
                      {product.extraIngredients?.map(extraThing => (
                        <Label className='max-w-max flex items-center gap-1 rounded-md mb-1' key={extraThing._id}>
                          <input
                            type="checkbox"
                            onChange={ev => handleExtraThingClick(ev, extraThing)}
                            checked={selectedExtras.some(e => e._id === extraThing._id)}
                            name={extraThing.name}
                          />
                          <span className='capitalize'>{extraThing.name}</span>
                          <span>+${extraThing.price.toFixed(2)}</span>
                        </Label>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex sticky bottom-2 items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    ${selectedPrice.toFixed(2)}
                  </span>
                  <div className='flex gap-2 items-center'>
                    <Button
                      type='button'
                      onClick={handleAddToCartButtonClick}
                      size="sm"
                      className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to cart 
                    </Button>
                    <Button
                      type='button'
                      onClick={() => setShowPopup(false)}
                      size="sm"
                      className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      <Card
        className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
      >
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.popular && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
          )}            
        </div>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">
            {product.description.slice(0, 80)}{product.description.length > 80 ? '...' : ''}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">
              {hasOptions ? (
                <span>From ${product.basePrice.toFixed(2)}</span>
              ) : (
                <span>${product.basePrice.toFixed(2)}</span>
              )}
            </span>
            <Button
              type='button'
              onClick={handleAddToCartButtonClick}
              size="sm"
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BestSellersCard;