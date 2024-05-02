"use client";

import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import CustomInput from "./components/common/CustomInput";
import IconGenerator from "./components/common/IconGenerator";

const guests = Array.from({ length: 8 }, (v, i) => i + 1);

export default function SearchCard() {
    return (
        <>
            <form>
                <div className="flex h-[410px] w-[420px] shrink-0 flex-col divide-y rounded-xl border-[#EAEAEF] bg-white">
                    <div className="border-b-4-grey h-[104px] p-4">
                        <label
                            htmlFor="location"
                            className="text-primary-grey300 block text-lg font-medium"
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
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <DemoItem
                                    label="Check-In"
                                    sx={{ color: "#858C93", fontSize: "18px" }}
                                >
                                    <DatePicker
                                        sx={{ width: "90%" }}
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
                                                    endAdornment: null,
                                                },
                                            },
                                        }}
                                    />
                                </DemoItem>
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                <DemoItem label="Check-out" sx={{ color: "#858C93" }}>
                                    <DatePicker
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
                                                    endAdornment: null,
                                                },
                                            },
                                        }}
                                        sx={{ width: "90%" }}
                                    />
                                </DemoItem>
                            </Box>
                        </LocalizationProvider>
                    </Box>
                    <div className="h-[104px] p-4">
                        <label
                            htmlFor="guests"
                            className="text-primary-grey300 block text-lg font-medium"
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
        </>
    );
}
