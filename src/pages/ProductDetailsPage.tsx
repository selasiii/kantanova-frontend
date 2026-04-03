import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Container, 
  Stack, 
  Badge, 
  Button, 
  Card,
  toast
} from '../components/ui';
import { useProduct } from '../hooks/product-hooks';
import { useCartStore } from '../store/cartStore';
import { Star, ChevronLeft, ShoppingBag, Heart, ShieldCheck } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { addItem } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);


  if (isLoading) {
    return (
      <Container size="lg" className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-noir-blue"></div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container size="lg" className="py-20 text-center space-y-4">
        <h2 className="text-3xl font-display font-black uppercase">Product not found</h2>
        <Button variant="outline" asChild><Link to="/catalog">Back to Catalog</Link></Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (product.variants.length > 0 && !selectedVariant) {
      toast({
        title: "Selection required",
        description: "Please select a size/variant before adding to cart",
        variant: "destructive"
      });
      return;
    }

    addItem(product, selectedVariant || undefined);

    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your cart`,
      variant: "success"
    });
  };


  return (
    <Container size="lg" className="py-12">
      <Link to="/catalog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-noir-black/40 hover:text-noir-black mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to exploration
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-noir-gray border border-noir-border overflow-hidden">
            {product.images?.[0] ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-noir-black/10 font-black text-6xl">NO IMAGE</div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(1, 5).map((img, i) => (
              <div key={i} className="aspect-square bg-noir-gray border border-noir-border">
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <Stack spacing="xl">
          <div className="space-y-4">
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter leading-none">
              {product.name}
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-display font-black">GH₵ {product.basePrice.toLocaleString()}</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-noir-blue/10 text-noir-blue rounded-full">
                <Star className="w-4 h-4 fill-noir-blue" />
                <span className="text-sm font-bold">{product.averageRating}</span>
                <span className="text-xs opacity-60">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-noir-border py-6">
            <p className="text-noir-black/60 font-sans leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <Stack spacing="sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-noir-black/50">Select Size / Variant</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`h-11 px-6 border font-display font-bold uppercase tracking-widest text-xs transition-all ${
                      selectedVariant === v.id 
                        ? 'bg-noir-black text-noir-white border-noir-black' 
                        : 'border-noir-border hover:border-noir-black'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </Stack>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="flex-grow h-14 text-base" onClick={handleAddToCart}>
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Bag
            </Button>
            <Button variant="outline" className="h-14 w-14 p-0">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Delivery Note */}
          <Card className="bg-noir-gray/50 border-none p-6">
            <div className="flex gap-4">
              <div className="h-10 w-10 shrink-0 bg-white border border-noir-border flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-noir-blue" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-display font-black uppercase tracking-tight">Kantanova Escrow Included</h4>
                <p className="text-xs text-noir-black/60 leading-tight">Funds are only released to vendor once you confirm quality receipt. 100% Secure.</p>
              </div>
            </div>
          </Card>
        </Stack>
      </div>
    </Container>
  );
};

export default ProductDetailsPage;
