import { InputLabel, Input, FormControl } from "@mui/material";
import { IconGenerator, RangeDatePicker, SelectInput } from "../common";

//TODO: re-style/refactor when you add functionality
export function SearchCard() {
  return (
    <search>
      <form>
        <div className="grid h-[410px] w-[420px] shrink-0 grid-rows-4 divide-y rounded-xl border-[#EAEAEF] bg-white">
          <div className="border-b-4-grey flex w-full items-center px-4 pb-4 pt-5">
            <div className="flex h-full grow flex-col">
              <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
                <InputLabel
                  shrink={true}
                  htmlFor="component-simple"
                  className="block text-2xl font-medium"
                >
                  Location
                </InputLabel>
                <Input
                  id="component-simple"
                  defaultValue=""
                  placeholder="Select Location"
                  sx={{
                    padding: "14px 26px 10px 0px",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                  fullWidth
                  endAdornment={
                    <IconGenerator
                      alt="Location Icon"
                      src="/location-pin.svg"
                      width="28px"
                      className="pointer-events-none"
                    />
                  }
                />
              </FormControl>
            </div>
          </div>
          <div className="relative px-4 pb-4 pt-5">
            <RangeDatePicker size="big" />
          </div>
          <div className="flex h-full grow flex-col px-4 pb-4 pt-5">
            <SelectInput size="big" />
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
