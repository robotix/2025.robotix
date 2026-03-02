import Image from "next/image";

export default function GalleryCard({ bot, galleryItemRef, hardwareAccel }) {
    return (
        <div
            ref={galleryItemRef}
            className="masonry-gallery-item relative overflow-hidden rounded-sm cursor-pointer border border-[#424453] group"
            style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                ...hardwareAccel,
            }}
        >
            <div className="relative bg-gradient-to-br from-[#171921] to-[#0b0b0e]">
                <Image
                    src={bot.image}
                    alt={bot.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0b0b0e]/90 via-[#0b0b0e]/40 to-transparent pb-6">
                    <div className="text-center">
                        <div className="font-family-grotesk text-lg md:text-xl text-[#e9ede5]">
                            {bot.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
