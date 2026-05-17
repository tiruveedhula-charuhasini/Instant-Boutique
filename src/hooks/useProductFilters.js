import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useProductFilters(initialProducts) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Read initial values from URL
  const [selectedSubcategories, setSelectedSubcategories] = useState(() => {
    const cats = searchParams.get('category');
    return cats ? cats.split(',') : [];
  });
  
  const [priceRange, setPriceRange] = useState(() => {
    const price = searchParams.get('maxPrice');
    return price ? Number(price) : 50000;
  });

  const [sortOption, setSortOption] = useState(() => {
    return searchParams.get('sort') || 'featured';
  });

  // Keep state in sync with URL changes
  useEffect(() => {
    const cats = searchParams.get('category');
    setSelectedSubcategories(cats ? cats.split(',') : []);
    
    const price = searchParams.get('maxPrice');
    setPriceRange(price ? Number(price) : 50000);
    
    setSortOption(searchParams.get('sort') || 'featured');
  }, [searchParams]);

  // Extract unique subcategories from initial products
  const availableSubcategories = useMemo(() => {
    return [...new Set(initialProducts.map(p => p.subcategory || p.category))].filter(Boolean);
  }, [initialProducts]);

  // Update URL when filters change
  const updateUrl = (cats, price, sort) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (cats && cats.length > 0) {
      params.set('category', cats.join(','));
    } else {
      params.delete('category');
    }

    if (price && price < 50000) {
      params.set('maxPrice', price.toString());
    } else {
      params.delete('maxPrice');
    }

    if (sort && sort !== 'featured') {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    // Use router.push with scroll: false to avoid jumping to top on filter
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleSubcategory = (sub) => {
    const newCats = selectedSubcategories.includes(sub)
      ? selectedSubcategories.filter(s => s !== sub)
      : [...selectedSubcategories, sub];
    
    setSelectedSubcategories(newCats);
    updateUrl(newCats, priceRange, sortOption);
  };

  const handlePriceChange = (price) => {
    setPriceRange(price);
    updateUrl(selectedSubcategories, price, sortOption);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    updateUrl(selectedSubcategories, priceRange, sort);
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setPriceRange(50000);
    setSortOption('featured');
    updateUrl([], 50000, 'featured');
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Filter by subcategory (or category if subcategory is missing)
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory) || selectedSubcategories.includes(p.category));
    }

    // 2. Filter by price
    result = result.filter(p => p.price <= priceRange);

    // 3. Sort
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter(p => p.tags?.includes("new arrival"));
        break;
      case "popularity":
      case "trending":
        result = result.filter(p => p.tags?.includes("trending") || p.tags?.includes("bestseller"));
        break;
      case "featured":
      default:
        // featured: top rated first
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [initialProducts, sortOption, selectedSubcategories, priceRange]);

  return {
    // State
    selectedSubcategories,
    priceRange,
    sortOption,
    availableSubcategories,
    filteredAndSortedProducts,
    
    // Actions
    toggleSubcategory,
    handlePriceChange,
    handleSortChange,
    clearAllFilters
  };
}
