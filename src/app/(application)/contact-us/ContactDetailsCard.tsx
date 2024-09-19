"use client";

import { Divider } from "@mui/material";
import { useSiteConfigurations } from "~/context/SiteConfigurationsContext";

export default function ContactDetailsCard() {
  const contactDetailsSiteConfigs = useSiteConfigurations().contact;
  return (
    <div className="absolute mx-4 mb-auto ms-auto mt-auto flex max-w-full flex-col gap-6 bg-white px-6 py-8 font-medium sm:left-16 sm:max-w-[480px] sm:px-8 sm:py-8 md:bottom-0 md:top-0 md:h-min">
      <div className="flex flex-col gap-3">
        <p className="mb-1 text-lg sm:text-xl">Contact details</p>
        <p className="text-primary">
          Address:{" "}
          <span className="text-[#676D73]">
            {contactDetailsSiteConfigs.address}
          </span>
        </p>
        <p className="text-primary">
          Phone:{" "}
          <span className=" text-[#676D73]">
            <a href="tel:302-581-9342">{contactDetailsSiteConfigs.phone}</a>
          </span>
        </p>
        <p className="text-primary">
          Email:{" "}
          <span className=" text-[#676D73]">
            {contactDetailsSiteConfigs.email}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="mb-1 text-lg sm:text-xl">Opening hours</p>
        {contactDetailsSiteConfigs.hours.map((item, index) => {
          return (
            <>
              <p className="flex text-primary">
                {item.day}{" "}
                <span className="ml-auto text-[#676D73]">
                  {item.openTime} - {item.closeTime}
                </span>
              </p>
              {index < contactDetailsSiteConfigs.hours.length - 1 ? (
                <Divider />
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}
