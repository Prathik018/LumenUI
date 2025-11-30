"use client";


import React from "react";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExperienceItem {
    id: string;
    title: string;
    image: string;
    location: string;
    price: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    date?: string;
}

interface ExperienceGridProps {
    title: string;
    items: ExperienceItem[];
    viewAllHref?: string;
}

const sampleExperiences: ExperienceItem[] = [
    {
        id: "1",
        title: "Become an Otaku Hottie with Megan Thee Stallion",
        image: "https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d",
        location: "Los Angeles, United States",
        price: 120,
        currency: "€",
        rating: 4.97,
        reviewCount: 128,
        badge: "Original",
        date: "Closes May 21",
    },
    {
        id: "2",
        title: "Spend a Sunday Funday with Patrick Mahomes",
        image: "https://images.unsplash.com/photo-1622127922040-13cab637ee78",
        location: "Kansas City, United States",
        price: 150,
        currency: "€",
        rating: 4.92,
        reviewCount: 86,
        badge: "Original",
        date: "Closes Today",
    },
    {
        id: "3",
        title: "Celebrate with SEVENTEEN on their 10th anniversary",
        image: "https://images.unsplash.com/photo-1534430480872-3498386e7856",
        location: "Seoul, South Korea",
        price: 200,
        currency: "€",
        rating: 4.98,
        reviewCount: 254,
        badge: "Original",
        date: "Closed May 17",
    },
    {
        id: "4",
        title: "Learn the secrets of French pastry with nonnas",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315",
        location: "Paris, France",
        price: 70,
        currency: "€",
        rating: 4.97,
        reviewCount: 112,
        badge: "Original",
    },
    {
        id: "5",
        title: "Uncover the world of cabaret with a burlesque show",
        image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b",
        location: "Paris, France",
        price: 92,
        currency: "€",
        rating: 4.9,
        reviewCount: 78,
        badge: "Original",
    },
    {
        id: "6",
        title: "The Super Powers of Art-family Game at the Louvre",
        image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0",
        location: "Paris, France",
        price: 90,
        currency: "€",
        rating: 4.98,
        reviewCount: 146,
        badge: "Original",
    },
    {
        id: "7",
        title: "Savor tasty vegan pastries with a plant-based pro",
        image: "https://images.unsplash.com/photo-1608830597604-619220679440",
        location: "Paris, France",
        price: 75,
        currency: "€",
        rating: 4.95,
        reviewCount: 92,
        badge: "Original",
    },
];

const popularExperiences: ExperienceItem[] = [
    {
        id: "p1",
        title: "Learn to bake the French Croissant",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
        location: "Paris, France",
        price: 95,
        currency: "€",
        rating: 4.95,
        reviewCount: 218,
        badge: "Popular",
    },
    {
        id: "p2",
        title: "Seek out hidden speakeasy bars in the city",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
        location: "Paris, France",
        price: 74,
        currency: "€",
        rating: 4.9,
        reviewCount: 165,
        badge: "Popular",
    },
    {
        id: "p3",
        title: "Versailles Food and Palace Bike Tour",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
        location: "Versailles, France",
        price: 122,
        currency: "€",
        rating: 4.97,
        reviewCount: 89,
        badge: "Popular",
    },
    {
        id: "p4",
        title: "Haunted Paris Tour - Ghosts, Legends, True Crime",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147",
        location: "Paris, France",
        price: 25,
        currency: "€",
        rating: 4.98,
        reviewCount: 345,
        badge: "Popular",
    },
    {
        id: "p5",
        title: "Learn to make the French macarons with a chef",
        image: "https://images.unsplash.com/photo-1558326567-98ae2405596b",
        location: "Paris, France",
        price: 110,
        currency: "€",
        rating: 4.95,
        reviewCount: 203,
        badge: "Popular",
    },
    {
        id: "p6",
        title: "No Diet Club - Best food tour in Le Marais",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
        location: "Paris, France",
        price: 65,
        currency: "€",
        rating: 4.92,
        reviewCount: 178,
        badge: "5 spots left",
    },
    {
        id: "p7",
        title: "Soak up the nightlife of Paris",
        image: "https://images.unsplash.com/photo-1546636889-ba9fdd63583e",
        location: "Paris, France",
        price: 20,
        currency: "€",
        rating: 4.94,
        reviewCount: 112,
        badge: "Popular",
    },
];

const ExperienceCard = ({ experience }: { experience: ExperienceItem }) => {
    return (
        <Card className="group relative w-full h-[320px] rounded-xl border-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl">
                <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10 text-neutral-700 hover:text-black"
                >
                    <Heart className="w-4 h-4 stroke-[2px]" />
                    <span className="sr-only">Add to favorites</span>
                </Button>
                {experience.badge && (
                    <Badge className="absolute top-2 left-2 bg-white/90 text-black text-xs font-medium px-1.5 py-0.5 rounded-md">
                        {experience.badge}
                    </Badge>
                )}
            </div>

            <div className="flex flex-col flex-1 justify-between">
                <CardContent className="p-2 pt-3 pb-0">
                    <h3 className="font-medium text-sm tracking-tight ">
                        {experience.title}
                    </h3>
                    <p className="text-xs text-muted-foreground tracking-tight">
                        {experience.location}
                    </p>
                    {experience.date && (
                        <p className="text-xs text-muted-foreground tracking-tight">
                            {experience.date}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="p-2 pt-0 flex items-center gap-0.5 text-xs mt-auto">
                    {experience.rating && (
                        <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-current" />
                            {experience.rating}
                        </span>
                    )}
                    {experience.reviewCount && (
                        <span className="text-muted-foreground text-xs tracking-tight">
                            {experience.rating && "·"}
                            {experience.reviewCount > 0
                                ? ` (${experience.reviewCount})`
                                : ""}
                        </span>
                    )}
                    <span className="ml-auto text-xs tracking-tight">
                        {experience.currency || "€"} {experience.price} / guest
                    </span>
                </CardFooter>
            </div>
        </Card>
    );
};

const ExperienceSection = ({
    title,
    items,
    viewAllHref = "#",
}: ExperienceGridProps) => {
    const scrollContainer = React.useRef<HTMLDivElement>(null);

    const handleScrollLeft = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({
                left: -320,
                behavior: "smooth",
            });
        }
    };

    const handleScrollRight = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full py-4">
            <div className="max-w-[1760px] mx-auto px-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="font-medium text-lg md:text-xl tracking-tight">
                        {title}
                    </h2>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-7 h-7 border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                            onClick={handleScrollLeft}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span className="sr-only">Scroll left</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full w-7 h-7 border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
                            onClick={handleScrollRight}
                        >
                            <ChevronRight className="w-4 h-4" />
                            <span className="sr-only">Scroll right</span>
                        </Button>
                        <Link
                            href="#"
                            className="hidden md:block text-xs font-medium ml-1 hover:underline"
                        >
                            Show all
                        </Link>
                    </div>
                </div>

                <div
                    ref={scrollContainer}
                    className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-1 px-1"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex-none w-[240px] md:w-[260px] snap-start"
                        >
                            <Link
                                href="#"
                                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-xl"
                            >
                                <ExperienceCard experience={item} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function CarouselCards() {
    return (
        <div className="w-full space-y-4 mt-4">
            <ExperienceSection
                title="Airbnb Originals ›"
                items={sampleExperiences}
                viewAllHref="#"
            />
            <ExperienceSection
                title="Popular experiences in Paris"
                items={popularExperiences}
                viewAllHref="#"
            />
        </div>
    );
}
