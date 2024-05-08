import Image from "next/image";
import IconGenerator from "../common/IconGenerator";
import type { ListingData } from "~/app/(application)/definitions";

interface MainCardPorps extends ListingData {
    isBlogCard?: boolean;
    subtitle: string;
}

const MainCard = ({
    isBlogCard,
    name,
    subtitle,
    imageUrl,
    propertyType,
    squareFeets,
}: MainCardPorps) => {
    return (
        <div
            className={`${!isBlogCard && "shadow-cardShadow"} flex h-82 w-64 grow-0 flex-col overflow-hidden rounded-xl`}
            style={{
                border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
            }}
        >
            <div className="flex">
                <Image
                    src={imageUrl ?? '/cardImage.png'}
                    width={263}
                    height={210}
                    alt="CoolVacay listing image"
                    style={{
                        height: 210,
                        objectFit: "fill",
                        borderRadius: isBlogCard ? 10 : 0,
                    }}
                />
            </div>
            <div className={`${!isBlogCard && "px-2"} flex flex-col justify-between grow`}>
                <div className="pb-3 pt-2">
                    <div className="mb-1 text-base font-medium">{name}</div>
                    <p className="text-sm text-[#676D73]">{subtitle}</p>
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
                            <h6 className="text-sm">{`${Math.floor(squareFeets ?? 0)} sqft`}</h6>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainCard;
