import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { GALLERY_ITEMS } from '../../data/data';

const ITEMS_PER_PAGE = 6; // Number of gallery items per page
function Gallery() {
     const [currentPage, setCurrentPage] = useState(1); // State for current pagination page
    const totalPages = Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentGalleryItems = GALLERY_ITEMS.slice(startIndex, endIndex);
    return (
        <section id="gallery-section" className="py-16 text-center mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white"><span className="text-4xl">See the Magic!</span> <br /> Choose from over 100 different styles!</h2>
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
                                onClick={() => setSelectedStyle(item.styleId)}
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