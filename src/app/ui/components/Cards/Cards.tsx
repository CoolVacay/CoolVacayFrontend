import Image from "next/image";
import IconGenerator from "../common/IconGenerator";
import type { ListingData } from "~/app/(application)/definitions";

interface MainCardPorps extends ListingData {
    isBlogCard?: boolean;
    subtitle: string;
}

export const MainCard = ({
    isBlogCard,
    name,
    subtitle,
    imageUrl,
    propertyType,
    squareFeets,
}: MainCardPorps) => {
    return (
        <div
            className={`${!isBlogCard && "shadow-cardShadow"} h-82 flex w-[280px] grow-0 flex-col overflow-hidden rounded-xl`}
            style={{
                border: !isBlogCard ? "1px solid rgba(173, 181, 189, 0.70)" : "",
            }}
        >
            <div className="flex">
                <Image
                    src={imageUrl ?? "/cardImage.png"}
                    width={280}
                    height={210}
                    alt="CoolVacay listing image"
                    style={{
                        height: 210,
                        objectFit: "fill",
                        borderRadius: isBlogCard ? 10 : 0,
                    }}
                />
            </div>
            <div
                className={`${!isBlogCard && "px-2"} flex grow flex-col justify-between`}
            >
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

export const ListingCard = ({
    name,
    subtitle,
    imageUrl,
}: MainCardPorps) => {
    return (
        <div className="flex h-[405px] w-[360px] grow-0 flex-col gap-4 overflow-hidden rounded-md">
            <div className="flex">
                <Image
                    src={imageUrl ?? "/cardImage.png"}
                    width={360}
                    height={240}
                    alt="CoolVacay listing image"
                    style={{
                        height: 210,
                        objectFit: "fill",
                        borderRadius: 6,
                    }}
                />
            </div>
            <div className="flex grow flex-col justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between font-medium">
                        <h6 className="text-lg">
                            $500<span className="text-sm text-primary-grey400"> night</span>
                        </h6>
                        <h6 className="text-sm text-primary-grey400">Feb 19 - 26</h6>
                    </div>
                    <div>
                        <div className="mb-1 text-base font-medium">{name}</div>
                        <p className="text-sm text-[#676D73]">{subtitle}</p>
                    </div>
                    <div className="flex gap-1">
                        <IconGenerator
                            src="/rating_start.svg"
                            alt="Rating start"
                            width="16px"
                        />
                        <h6 className="text-sm">
                            4.5<span className="text-sm text-primary-grey400 font-medium"> (293 review)</span>
                        </h6>
                    </div>
                </div>
                <button className=" rounded-full border border-primary py-3 font-bold text-primary">
                    Book
                </button>
            </div>
        </div>
    );
};