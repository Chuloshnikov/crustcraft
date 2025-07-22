import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { ClientMenuItem } from '../../../../types/cart';
import { toast } from 'sonner';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IExtraPrice } from '@/models/MenuItem';


const BestSellersCard = ({product}: {product: ClientMenuItem}) => {
  const [selectedSize, setSelectedSize] = useState<null | IExtraPrice>(product?.sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState<IExtraPrice[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();

  async function handleAddToCartButtonClick() {
    const hasOptions = product?.sizes?.length > 0 && product?.extraIngredients?.length > 0;
      if (hasOptions && !showPopup) {
        setShowPopup(true);
        return;
      }
      addToCart(product, selectedSize, selectedExtras);
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Added to cart!');
      setShowPopup(false);
    }

  // @ts-ignore
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice: number = product.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price
    }
  }

  return (
    <>
     {showPopup && (
              <div 
                onClick={() => setShowPopup(false)}
                className='z-50 fixed inset-0 bg-white/80 flex items-center justify-center'>
                  <div 
                  className="my-8 bg-white overflow-y-scroll p-2 rounded-lg max-w-md scrollbar-hide"
                  style={{maxHeight:'calc(100vh - 100px)'}}>
                    <Card
                    onClick={e => e.stopPropagation()}
                        key={product._id}
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
                              {product.sizes.length > 0 && (
                                <div className='py-2'>
                                    <h3 className='text-center text-base font-semibold'>Pick your size</h3>
                                    {product.sizes.map(size => (
                                    <Label className='max-w-max flex items-center gap-1 rounded-md mb-1' key={size.name}>
                                      <Input
                                      onChange={() => setSelectedSize(size)}
                                      checked={selectedSize?.name === size.name}
                                       className='cursor-pointer' 
                                       type="radio" 
                                       name="size"
                                       /> 
                                      <span className='capitalize'>{size.name}</span>
                                      <span>{product.basePrice + size.price}$</span>
                                    </Label>
                                    ))}
                                </div>
                              )}
                              {product.extraIngredients?.length > 0 && (
                                <div className='py-2'>
                                  <h3 className='text-center text-gray-700'>Pick your extra</h3>
                                  {product.extraIngredients.map(extraThing => (
                                    <Label className='max-w-max flex items-center gap-1 rounded-md mb-1' key={extraThing._id}>
                                       <input
                                        type="checkbox"
                                        onChange={ev => handleExtraThingClick(ev, extraThing)}
                                        checked={selectedExtras.map(e => e._id).includes(extraThing._id)}
                                        name={extraThing.name} />
                                      <span className='capitalize'>{extraThing.name}</span>
                                      <span>+{extraThing.price}$</span>
                                    </Label>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex sticky bottom-2 items-center justify-between">
                              <span className="text-2xl font-bold text-orange-600">{selectedPrice}$</span>
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
            key={product._id}
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
                {product?.popular && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Popular
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description.slice(0, 80)}...</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    {(product?.sizes?.length > 0 || product.extraIngredients?.length > 0) ? (
                      <span>From {product.basePrice}$</span>
                    ) : (
                      <span>
                          {product.basePrice}$
                      </span>
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
          
  )
}

export default BestSellersCard;