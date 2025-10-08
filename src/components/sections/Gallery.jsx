import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus } from "lucide-react";
import { GALLERY_ITEMS } from '../../data/data';

const ITEMS_PER_PAGE = 6; // Number of gallery items per page
function Gallery({ onStyleSelect, onSubmitStyle }) {
     const [currentPage, setCurrentPage] = useState(1); // State for current pagination page
    const totalPages = Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentGalleryItems = GALLERY_ITEMS.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleStyleSelect = (styleId) => {
        if (onStyleSelect) {
            onStyleSelect(styleId);
            // Scroll to the style selector for better UX
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="gallery-section" className="py-16 text-center mb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            <div className="flex flex-col items-center mb-8 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                    <span className="text-4xl sm:text-5xl block mb-2">AI Photo Editing Gallery</span>
                    <span className="text-xl sm:text-2xl font-normal opacity-90">100+ Creative Styles - See What's Possible with Simple Prompts!</span>
                </h2>
                {/* <Button
                    onClick={onSubmitStyle}
                    variant="outline"
                    className="bg-[#8b5e3c]/20 border-[#8b5e3c] text-[#8b5e3c] hover:bg-[#8b5e3c]/30 hover:text-[#6d4c30] transition-colors"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit New Style
                </Button> */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
                {currentGalleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                        <img
                            src={item.src}
                            alt={`Example ${item.id}`}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="p-4">
                            <Button
                                variant="secondary"
                                className="w-full bg-[#8b5e3c] hover:bg-[#6d4c30] text-[#FFF8E1] playful-shadow"
                                onClick={() => handleStyleSelect(item.styleId)}
                            >
                                Use This Style
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {/* <Pagination className="mt-8">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(index + 1); }}
                                isActive={currentPage === index + 1}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}
        </section>

    )
}

export default Gallery