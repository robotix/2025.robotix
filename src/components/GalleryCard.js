import Image from "next/image";

export default function GalleryCard({ bot, index, galleryItemRef, hardwareAccel }) {
    const textSize =
        bot.colSpan >= 5
            ? "text-2xl"
            : bot.colSpan >= 4
              ? "text-xl"
              : "text-lg";
    
    const paddingBottom =
        bot.height === "600px"
            ? "pb-8"
            : bot.height === "380px"
              ? "pb-8"
              : "pb-6";
    
    const sizes =
        bot.colSpan >= 7
            ? "(max-width: 768px) 100vw, 60vw"
            : bot.colSpan >= 5
              ? "(max-width: 768px) 100vw, 40vw"
              : bot.colSpan >= 4
                ? "(max-width: 768px) 100vw, 35vw"
                : "(max-width: 768px) 100vw, 25vw";

    return (
        <div
            ref={galleryItemRef}
            className={`col-span-${bot.colSpan} ${bot.rowSpan > 1 ? `row-span-${bot.rowSpan}` : ""} relative overflow-hidden rounded-sm cursor-pointer border border-[#424453]`}
            style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                ...hardwareAccel,
            }}
        >
            <div
                className="relative bg-gradient-to-br from-[#171921] to-[#0b0b0e]"
                style={{ height: bot.height }}
            >
                <Image
                    src={bot.image}
                    alt={bot.name}
                    fill
                    sizes={sizes}
                    quality={85}
                    className="object-cover"
                />

                <div
                    className={`absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0b0b0e]/90 via-[#0b0b0e]/40 to-transparent ${paddingBottom}`}
                >
                    <div className="text-center">
                        <div className={`font-family-grotesk ${textSize} text-[#e9ede5]`}>
                            {bot.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
