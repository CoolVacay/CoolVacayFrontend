"use client";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
export type StateType = {
  location: string;
  startDate: string;
  endDate: string;
  guests: string;
};

function HeroSection() {
  return (
    <div
      className="flex h-[714px] w-full flex-shrink-0 items-center justify-around text-white"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(https://s3-alpha-sig.figma.com/img/4a09/63da/920c66ac1aea9edcbdae45bcc4d6f0e8?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pRD8MnTxbtdH0Jm8jhfploAlgpL0TEPwB31omqS9NXuQnvllbOryFsXAF-v14haCaJK0aQRNJUpPLH1rC-cmBayTpHdKfNMdtAmgBl0CQoXQJqcY7Q05Lpzx46ERjQxneEqgcxay4RTQNJNvu2fuqhTYl28yBdxGFGNPEK23eP3OTquedmAJSMcwrGfyV~xGPcAnUKqoMEqV-cC5RucrEsiaOgSs6jeIXczBLSz55uula4R-eeE3samO8y7dc0F~sZv9Xya7h3dO1Iy-UAcY0OkuamyDYPcjCE4icBJs59aU3s6fOYYoO3lAUL1yQ5Nm8pdIY1xMasLRQElYhckrcQ__) lightgray 50% / cover no-repeat",
      }}
    >
      <div className="flex w-[857px] items-end justify-end p-2.5 font-medium">
        <div className="flex flex-col items-start gap-5">
          <div>
            <div className="flex items-start justify-start rounded-[88px] bg-white px-5 py-2.5 leading-[40px] text-black">
              Number 1 Rental Management
            </div>
          </div>
          <h1 className="text-[80px] leading-[80px]">
            Find your perfect place now
          </h1>
          <div className="text-xl leading-[30px] tracking-[0.16px]">
            <p>Your personalized destination discovery platform.</p>
            <p>
              Explore, compare, and uncover your dream location effortlessly.
            </p>
          </div>
        </div>
      </div>
      <form
        // action={formAction}
        className="flex w-[420px] flex-shrink-0 flex-col items-center gap-5 rounded-2xl bg-white p-6"
      >
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-location">
            Location
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-location"
            className="rounded-2xl"
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src="/location-pin.svg"
                  width={20}
                  height={20}
                  alt="location pin"
                />
              </InputAdornment>
            }
            label="location"
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="w-full"
            label="startDate"
            slotProps={{
              inputAdornment: {
                position: "start",
              },
            }}
          />
          <DatePicker
            className="w-full"
            label="endDate"
            slotProps={{
              inputAdornment: {
                position: "start",
              },
            }}
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-location">Guests</InputLabel>
          <OutlinedInput
            id="outlined-adornment-location"
            className="rounded-2xl"
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src="/location-pin.svg"
                  width={20}
                  height={20}
                  alt="location pin"
                />
              </InputAdornment>
            }
            label="guests"
          />
        </FormControl>
        <Button
          variant="contained"
          className="flex w-full justify-start rounded-2xl bg-black py-4 pl-[20px] hover:bg-black hover:bg-opacity-70"
          startIcon={
            <Image src="/search.svg" width={20} height={20} alt="search" />
          }
        >
          Search
        </Button>
      </form>
    </div>
  );
}

export default HeroSection;
