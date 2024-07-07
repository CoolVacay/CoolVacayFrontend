// import Link from "next/link";
// import { Divider } from "@mui/material";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useEffect, useState, useMemo, useCallback } from "react";

// export default function BookNowContent() {
//     const listingQuery = useSearchParams();
//     const router = useRouter();
//     const pathname = usePathname();
//   return (
//     <div className="flex w-full max-w-[420px] shrink-0 flex-col">
//       <h1 className="mb-4 text-2xl font-bold">Book it now</h1>
//       <div
//         className={`flex flex-col gap-6 rounded-[11px] border border-[#EAEAEF] px-6 py-5 ${isPriceCalculated && "pointer-events-none bg-[#fAfAfA]"}`}
//       >
//         {!isPriceCalculated ? (
//           <div className="flex justify-between">
//             <h6>Choose your preferred day</h6>
//             <h6 className="font-medium text-primary">View calendar</h6>
//           </div>
//         ) : null}
//         <div className="flex-col rounded-[11px] border border-[#EAEAEF]">
//           <div
//             className="relative px-6 py-5"
//             style={{ borderBottom: "1px solid #EAEAEF" }}
//           >
//             <RangeDatePicker size="small" dates={dates} setDates={setDates} />
//           </div>
//           <div className="px-6 py-5">
//             <SelectInput
//               size="small"
//               value={numberOfGuests ?? "1"}
//               onChange={(e: SelectChangeEvent<string>) =>
//                 setNumberOfGuests(e.target.value)
//               }
//             />
//           </div>
//         </div>
//         {!isPriceCalculated ? (
//           <Link
//             href={`/book/${params.source}/${params.id}/billing-address?${searchParams.toString()}`}
//             className="flex h-[58px] w-full justify-center rounded-full bg-primary py-4 text-white hover:border hover:border-primary hover:bg-white hover:text-primary"
//           >
//             Book now
//           </Link>
//         ) : null}
//         <Divider />
//         {!isPriceCalculated && (
//           <FormDialog
//             title="Inquire now"
//             subtitle="Have a question or feedback? Fill out the form
//               below, and we'll get back to you as soon as possible."
//             listing={listing!}
//           >
//             <button className="w-full rounded-full border border-primary bg-white py-4 text-primary hover:bg-primary hover:text-white">
//               Inquire now
//             </button>
//           </FormDialog>
//         )}
//         {isPriceCalculated ? (
//           <PricingDetails
//             listing={listing}
//             pricingDetails={pricingDetails}
//             nights={toDate.diff(fromDate, "day")}
//           />
//         ) : null}
//       </div>
//     </div>
//   );
// }
