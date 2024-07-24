import type { IReservationsDetails } from "~/app/(application)/actions";
import Image from "next/image";
import { CustomChip, IconGenerator } from "../common";

export default function Reservations({
  reservationsDetails,
}: {
  reservationsDetails: IReservationsDetails[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-[28px] font-medium">
        {reservationsDetails.length + reservationsDetails.length === 1
          ? "Booking"
          : "Bookings"}
      </h4>
      {reservationsDetails?.length > 0 ? (
        reservationsDetails?.map((reservation) => {
          const details = reservation.details;
          return (
            <div className="flex gap-8" key={reservation.id}>
              <div className="flex h-[180px] w-[220px]">
                <Image
                  src={details.imageSrc ?? "/cardImage.png"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt="Property image"
                  style={{
                    height: 180,
                    width: "auto",
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>{details.listingName}</p>
                <div className="flex gap-8 font-medium text-[#858C93]">
                  <CustomChip width={50} label={details.listingType} />
                  <p>Sleeps {reservation.adults}</p>
                  <p>{details.squareFeets}</p>
                </div>
                <div className="flex gap-8">
                  <div className="flex gap-2">
                    <IconGenerator src="" alt="Property Icon" width="20px" />
                    {details.bedrooms + details.bedrooms === 1
                      ? "Bedroom"
                      : "Bedrooms"}
                  </div>
                  <div className="flex gap-2">
                    <IconGenerator src="" alt="Property Icon" width="20px" />
                    {details.bathrooms + details.bathrooms === 1
                      ? "Bathroom"
                      : "Bathrooms"}
                  </div>
                  <div className="mx-5 h-full w-[1px] bg-[#EAEAEF]" />
                  <div>which one</div>
                  <div className="flex flex-col">
                    <p className="font-medium">{"$" + details.pricePerNight}</p>
                    <p className="text-[#676D73]">Total with fees</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>{`You haven't made any reservations.`}</p>
      )}
    </div>
  );
}
