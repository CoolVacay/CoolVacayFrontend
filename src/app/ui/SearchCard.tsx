"use client";

import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import CustomInput from "./components/common/CustomInput";
import IconGenerator from "./components/common/IconGenerator";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

const guests = Array.from({ length: 8 }, (v, i) => i + 1);

export default function SearchCard() {
    return (
        <search>
            <form>
                <div className="flex h-[410px] w-[420px] shrink-0 flex-col divide-y rounded-xl border-[#EAEAEF] bg-white">
                    <div className="border-b-4-grey h-[104px] p-4">
                        <label
                            htmlFor="location"
                            className="block text-lg font-medium text-primary-grey300"
                        >
                            Location
                        </label>
                        <div>
                            <div className="relative">
                                <CustomInput
                                    name="location"
                                    placeholder="Select Location"
                                    defaultValue=""
                                    endAdornment={
                                        <IconGenerator
                                            alt="Location Icon"
                                            src="/location-pin.svg"
                                            width="28px"
                                            className="pointer-events-none"
                                        />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <Box sx={{ display: "flex", padding: "16px", height: "104px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DateRangePicker"]}>
                                <DateRangePicker
                                    slotProps={{
                                        textField: {
                                            InputProps: {
                                                startAdornment: (
                                                    <IconGenerator
                                                        alt="Calendar icon"
                                                        src={`/calendar_icon.svg`}
                                                        width="32px"
                                                        className="mr-3"
                                                    />
                                                ),
                                            },
                                        },
                                    }}
                                    defaultValue={[dayjs(), dayjs().add(3, "day")]}
                                    localeText={{ start: "Check-in", end: "Check-out" }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <div className="h-[104px] p-4">
                        <label
                            htmlFor="guests"
                            className="block text-lg font-medium text-primary-grey300"
                        >
                            Guests
                        </label>
                        <div>
                            <div className="relative">
                                <Select
                                    sx={{ width: "100%" }}
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    defaultValue={guests[0]}
                                    //   onChange={handleChange}
                                    input={<CustomInput />}
                                >
                                    {guests.map((guest) => (
                                        <MenuItem key={guest} value={guest}>
                                            {`${guest} ${guest === 1 ? "guest" : "guests"}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <button className="flex grow items-center rounded-b-xl bg-primary p-5 text-2xl">
                        Search
                        <span className="ml-auto">
                            <IconGenerator
                                alt="avatar icon"
                                src={`/search_icon.svg`}
                                width="33px"
                            />
                        </span>
                    </button>
                </div>
            </form>
        </search>
    );
}
