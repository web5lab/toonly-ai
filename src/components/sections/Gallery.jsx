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
        <section id="gallery-section" className="py-16 text-center mb-16">
            <div className="flex flex-col items-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-white [text-shadow:1px_1px_2px_rgba(93,64,55,0.7)]">
                    <span className="text-4xl">AI Image Transformation Gallery</span> <br /> 
                    100+ Free Cartoon & Anime Styles - See the Magic!
                </h2>
                <Button
                    onClick={onSubmitStyle}
                    variant="outline"
                    className="bg-[#8b5e3c]/20 border-[#8b5e3c] text-[#8b5e3c] hover:bg-[#8b5e3c]/30 hover:text-[#6d4c30] transition-colors"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Submit New Style
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {currentGalleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-[#e9e2d6]/70 backdrop-blur-sm rounded-lg playful-shadow playful-border overflow-hidden flex flex-col"
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
            <Pagination className="mt-8">
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
            </Pagination>
        </section>

    )
}

export default Gallery