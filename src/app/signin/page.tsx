"use client";

import Image from "next/image";
import React, { useState } from "react";
import PasswordInput from "../components/common/PasswordInput/page";
import TextField from "@mui/material/TextField";

export type LoginValue = {
  email: string;
  password: string;
};

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    console.log("Handle Submit: ", { email, password });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white md:items-start">
      <div className="flex h-full w-full items-center justify-center px-10 md:w-1/2 md:px-28">
        <div className="flex w-full flex-col gap-5">
          <Image
            src="/coolVacayLogo.svg"
            alt="CoolVacay Logo"
            width={200}
            height={22}
          />

          <div>
            <h1 className="text-3xl">Sign in or Create an account</h1>
            <p className="text-[#9FA4AA]">
              {"Be ready to unlock exclusive features only with Coolvacay"}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <TextField
              label="Email"
              value={email}
              InputProps={{
                style: {
                  borderRadius: "50px",
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-start-adornment"
            />
            <PasswordInput password={password} setPassword={setPassword} />
            <button
              className="h-15 flex w-full items-center justify-center rounded-[100px] bg-primary p-4 text-white"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-full w-1/2">
        {
          <Image
            alt="Cool Vacay Sign In Background Image"
            src="/signInImage.png"
            className="invisible md:visible"
            fill
            quality={100}
          />
        }
      </div>
    </div>
  );
}

export default SignIn;
