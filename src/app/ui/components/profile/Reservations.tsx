import type { IReservationsDetails } from "~/app/(application)/actions";
import Image from "next/image";
import { IconGenerator } from "../common";
import { Divider } from "@mui/material";
import dayjs from "dayjs";

export default function Reservations({
  reservationsDetails,
}: {
  reservationsDetails: IReservationsDetails[];
}) {
  return (
    <div className="mb-8 flex flex-col gap-8">
      <h4 className="text-[28px] font-medium">
        {`${reservationsDetails.length} ${
          reservationsDetails.length === 1 ? "Booking" : "Bookings"
        }`}
      </h4>
      {reservationsDetails?.length > 0 ? (
        reservationsDetails?.map((reservation, index) => {
          const details = reservation.details;
          return (
            <div key={reservation.id} className="flex flex-col gap-8">
              <div className="flex gap-8">
                <div className="flex h-[130px] w-[180px]">
                  <Image
                    src={details.imageSrc ?? "/cardImage.png"}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="Property image"
                    style={{
                      height: 130,
                      width: "auto",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-2xl font-medium">{details.listingName}</p>
                  <div className="flex h-[22px] items-center gap-8 font-medium text-[#858C93]">
                    <div className="flex h-[22px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#29ABE2]/[.10] text-xs text-primary">
                      {details.listingType}
                    </div>
                    <p>Sleeps {reservation.adults}</p>
                    <p>{details.squareFeets} ft2</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconGenerator
                        src="/home-icon.svg"
                        alt="Property Icon"
                        width="20px"
                        height={20}
                      />
                      {`${details.bedrooms} ${
                        details.bedrooms === 1 ? "Bedroom" : "Bedrooms"
                      }`}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconGenerator
                        src="/home-icon.svg"
                        alt="Property Icon"
                        width="20px"
                        height={20}
                      />
                      {`${details.bathrooms} ${
                        details.bathrooms === 1 ? "Bathroom" : "Bathrooms"
                      }`}
                    </div>
                    <div className="mx-5 h-8 h-full w-[1px] bg-[#EAEAEF]" />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">
                        {`${dayjs(details.fromDate).format("MMM DD, YYYY")} -
                        ${dayjs(details.toDate).format("MMM DD, YYYY")}`}
                      </p>
                      <p className="text-[#676D73]">Booked on</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">
                        {"$" + details.pricePerNight}
                      </p>
                      <p className="text-[#676D73]">Total with fees</p>
                    </div>
                  </div>
                </div>
              </div>
              {index < reservationsDetails.length - 1 ? <Divider /> : null}
            </div>
          );
        })
      ) : (
        <p>{`You haven't made any reservations.`}</p>
      )}
    </div>
  );
}
