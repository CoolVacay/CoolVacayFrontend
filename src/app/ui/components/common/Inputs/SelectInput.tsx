import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { IconGenerator } from "../IconGenerator";

const guests = Array.from({ length: 8 }, (v, i) => i + 1).map((item) =>
  item.toString(),
);

export default function SelectInput({
  size,
  value,
  onChange,
  disabled = false,
}: {
  size: "small" | "medium" | "big";
  value?: string;
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  disabled?: boolean;
}) {
  const isBigSize = size === "big";
  const isMediumSize = size === "medium";
  return (
    <FormControl fullWidth variant="standard" sx={{ height: "100%" }}>
      <InputLabel
        shrink={true}
        htmlFor="component-simple"
        className={`block ${isBigSize ? "text-2xl" : isMediumSize ? "text-xl" : "text-base"} font-medium`}
      >
        Guests
      </InputLabel>
      <div>
        <div className="relative">
          <Select
            fullWidth
            value={value}
            IconComponent={() =>
              disabled ? null : (
                <IconGenerator
                  alt="avatar icon"
                  src={`/down-arrow.svg`}
                  width={isBigSize ? "33px" : isMediumSize ? "26px" : "18px"}
                  className={`pointer-events-none absolute ${isBigSize ? "right-1 top-7" : isMediumSize ? "right-1 top-[22px]" : "right-[2px]"}`}
                />
              )
            }
            onChange={onChange}
            sx={{
              padding: isBigSize ? "24px 0px 10px 0px" : "18px 0px 0px 0px",
              fontSize: isBigSize ? "20px" : isMediumSize ? "16px" : "12px",
              fontWeight: 500,
            }}
            labelId="customized-select-label"
            id="customized-select"
          >
            {guests.map((guest) => (
              <MenuItem
                key={guest}
                value={guest}
                dense
                sx={{
                  fontSize: size === "small" ? "12px" : "16px",
                }}
              >
                {`${guest} ${guest === "1" ? "guest" : "guests"}`}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </FormControl>
  );
}
