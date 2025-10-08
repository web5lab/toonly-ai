import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Filter, Grid3x3, Grid2x2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/data';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

const GalleryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [gridSize, setGridSize] = useState('3'); // 3 or 4 columns
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique categories from gallery items
  const categories = ['all', ...new Set(GALLERY_ITEMS.map(item => item.styleId))];

  // Filter gallery items based on search and category
  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.styleId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.styleId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStyleSelect = (styleId) => {
    navigate('/', { state: { selectedStyle: styleId } });
  };

  return (
    <div className="bg-[url('https://i.ibb.co/DDcDBgws/Chat-GPT-Image-Apr-3-2025-07-56-00-PM.png')] bg-cover bg-center min-h-screen w-full backdrop-blur-sm md:bg-fixed">
      <Header
        isAuthenticated={false}
        userEmail=""
        credits={0}
        isLoadingCredits={false}
        isSessionLoading={false}
        triggerAuthModal={() => {}}
        handleSignOut={() => {}}
        setIsPricingModalOpen={() => {}}
        history={[]}
        onDeleteHistoryItem={() => {}}
        onClearAllHistory={() => {}}
        prevCreditsRef={{ current: 0 }}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="mb-4 text-[#5D4037] hover:text-[#3a2e23] hover:bg-[#e9e2d6]/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white [text-shadow:2px_2px_4px_rgba(93,64,55,0.8)] mb-4">
              AI Art Style Gallery
            </h1>
            <p className="text-lg text-white/90 [text-shadow:1px_1px_2px_rgba(93,64,55,0.6)] max-w-2xl mx-auto">
              Explore 100+ artistic styles powered by AI. Transform your photos into stunning artwork.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-[#e9e2d6]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Search */}
              <div className="relative md:col-span-1">
                <label className="text-sm font-semibold text-[#5D4037] mb-2 block">
                  Search Styles
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8b5e3c]" />
                  <Input
                    placeholder="Search by style name..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 bg-white/80 border-[#a87b5d]/60 text-[#3a2e23] placeholder:text-[#5D4037]/70"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-[#5D4037] mb-2 block">
                  Filter by Category
                </label>
                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="bg-white/80 border-[#a87b5d]/60 text-[#3a2e23]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    {categories.filter(c => c !== 'all').map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Grid Size Toggle */}
              <div className="md:col-span-1">
                <label className="text-sm font-semibold text-[#5D4037] mb-2 block">
                  Grid Layout
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={gridSize === '3' ? 'default' : 'outline'}
                    onClick={() => setGridSize('3')}
                    className={gridSize === '3' ? 'bg-[#8b5e3c] hover:bg-[#6d4c30] text-white' : 'border-[#8b5e3c] text-[#8b5e3c]'}
                  >
                    <Grid3x3 className="h-4 w-4 mr-2" />
                    3 Columns
                  </Button>
                  <Button
                    variant={gridSize === '4' ? 'default' : 'outline'}
                    onClick={() => setGridSize('4')}
                    className={gridSize === '4' ? 'bg-[#8b5e3c] hover:bg-[#6d4c30] text-white' : 'border-[#8b5e3c] text-[#8b5e3c]'}
                  >
                    <Grid2x2 className="h-4 w-4 mr-2" />
                    4 Columns
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-[#8b5e3c] font-medium">
              Showing {currentItems.length} of {filteredItems.length} styles
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridSize === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6 mb-12`}>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#e9e2d6]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={`${item.styleId} style example`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg mb-2">
                  {item.styleId.charAt(0).toUpperCase() + item.styleId.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <Button
                  onClick={() => handleStyleSelect(item.styleId)}
                  className="w-full bg-white text-[#5D4037] hover:bg-[#f4efe4]"
                >
                  Use This Style
                </Button>
              </div>

              {/* Style Badge */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-[#5D4037]">10 Credits</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-[#8b5e3c] text-[#8b5e3c] disabled:opacity-50"
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'default' : 'outline'}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1
                  ? 'bg-[#8b5e3c] hover:bg-[#6d4c30] text-white'
                  : 'border-[#8b5e3c] text-[#8b5e3c]'
                }
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-[#8b5e3c] text-[#8b5e3c] disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-[#e9e2d6]/80 backdrop-blur-sm rounded-xl playful-shadow playful-border p-12 max-w-md mx-auto">
              <Filter className="h-16 w-16 mx-auto mb-4 text-[#a87b5d]" />
              <h3 className="text-2xl font-bold text-[#5D4037] mb-2">No Styles Found</h3>
              <p className="text-[#8b5e3c] mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className="bg-[#8b5e3c] hover:bg-[#6d4c30] text-white"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GalleryPage;
