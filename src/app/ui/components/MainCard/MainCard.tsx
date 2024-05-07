import Image from "next/image";
import IconGenerator from "../common/IconGenerator";
import type { ListingData } from "~/app/(application)/definitions";
interface MainCardPorps extends ListingData {
    isBlogCard?: boolean;
    imgHeight: number;
    location: string;
}

const MainCard = ({
    isBlogCard,
    imgHeight,
    name,
    location,
    imageUrl,
    propertyType,
    squareFeets,
}: MainCardPorps) => {
    return (
        <div
            className={`${!isBlogCard && "shadow-cardShadow"} flex max-h-96 max-w-lg grow-0 flex-col overflow-hidden rounded-xl`}
            style={{
                border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
            }}
        >
            <div className="flex">
                <Image
                    src={imageUrl ?? '/cardImage.png'}
                    width={512}
                    height={250}
                    alt="CoolVacay listing image"
                    style={{
                        maxWidth: 520,
                        maxHeight: imgHeight,
                        objectFit: "cover",
                        borderRadius: isBlogCard ? 10 : 0,
                    }}
                />
            </div>
            <div className={`${!isBlogCard && "px-5"}`}>
                <div className="pb-3 pt-4">
                    {/* TODO:Apply truncate */}
                    <div className="mb-1 text-xl font-medium">{name}</div>
                    <p className="text-md text-[#676D73]">{location}</p>
                </div>
                {!isBlogCard && (
                    <div className="flex gap-4 pb-4">
                        <div className="flex gap-2">
                            <IconGenerator
                                src="/cabin_icon.svg"
                                alt="Cabin icon"
                                width="16px"
                            />
                            <h6 className="text-sm">{propertyType}</h6>
                        </div>
                        <div className="flex gap-2">
                            <IconGenerator
                                src="/square_foot_icon.svg"
                                alt="Square foot"
                                width="16px"
                            />
                            <h6 className="text-sm">{`${Math.floor(squareFeets)} sqft`}</h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainCard;
