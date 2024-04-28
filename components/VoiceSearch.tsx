// VoiceSearch.tsx
import { useState } from 'react';
import ProductCard from '@/components/ProductCard'
import { getSearchedProducts } from '@/lib/actions/actions'

const VoiceSearch: React.FC = () => {
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<any[]>([]);

  const startVoiceSearch = () => {
    setVoiceSearchActive(true);
    const recognition = new (window as any).webkitSpeechRecognition();

    recognition.lang = 'en-US';
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechResult = event.results[0][0].transcript;
      setVoiceSearchActive(false);
      searchProducts(speechResult);
    };
    recognition.start();
  };

  const searchProducts = async (query: string) => {
    const decodedQuery = decodeURIComponent(query);
    const products = await getSearchedProducts(decodedQuery);
    setSearchedProducts(products);
  };

  return (
     <div className='px-10 py-5'>
      <p className='text-heading3-bold my-10'></p>
      <button onClick={startVoiceSearch}>Start Voice Search</button>
      {voiceSearchActive && (
        <p className='text-body-bold my-5'></p>
      )}
      {searchedProducts.length === 0 ? (
        <p className='text-body-bold my-5'></p>
      ) : (
        <div className='flex flex-wrap justify-between gap-16'>
          {searchedProducts.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
