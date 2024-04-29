"use client";
import Image from "next/image";
import React from "react";
import VerificationInput from "react-verification-input";
import "./styles.css";
import { Button } from "@mui/base";
import Link from "next/link";
function AccountCreationCode() {
  const handleComplete = (e: string) => {
    console.log(e);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <Image
        src="/coolVacayLogo.svg"
        alt="CoolVacay Logo"
        width={200}
        height={22}
      />
      <div>
        <h1 className="text-3xl">Enter the code</h1>
        <p className="text-[#9FA4AA]">
          {"To finish creating your account, enter the verification code ."}
        </p>
      </div>
      <VerificationInput
        classNames={{
          container: "container",
          character: "character",
          characterInactive: "character--inactive",
          characterSelected: "character--selected",
          characterFilled: "character",
        }}
        onComplete={(e) => handleComplete(e)}
      />
      <div className="flex w-full justify-center text-[#9FA4AA]">
        Didn’t receive code?
        <Link className="ml-2 text-primary" href={"/authentication/signin"}>
          Send Again
        </Link>
      </div>
    </div>
  );
}

export default AccountCreationCode;
