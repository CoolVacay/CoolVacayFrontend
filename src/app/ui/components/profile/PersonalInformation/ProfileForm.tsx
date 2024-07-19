"use client";

import { useState } from "react";
import { SimpleInput } from "../../common";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useFormState } from "react-dom";
import { updateProfile } from "~/app/(application)/actions";
import { ActionButton } from "../../authentication";
import type { UserData } from "~/app/(application)/definitions";

export default function ProfileForm({
  profileInfo,
}: {
  profileInfo: UserData["profile"] | null;
}) {
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, dispatch] = useFormState(updateProfile, undefined);

  const ValidationSchema = Yup.object({
    email: Yup.string().required("Email field is required"),
    firstName: Yup.string().required("First Name field is required"),
    lastName: Yup.string().required("Last Name field is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: profileInfo?.email ?? "",
      firstName: profileInfo?.firstName ?? "",
      lastName: profileInfo?.lastName ?? "",
      phone: profileInfo?.phone ?? "",
      nationality: profileInfo?.nationality ?? "",
      dateOfBirth: profileInfo?.phone ?? "",
      gender: profileInfo?.gender ?? "",
    },
    validationSchema: ValidationSchema,
    onSubmit: () => console.log("Updating Profile"),
  });
  return (
    <form
      action={() => {
        dispatch(formik.values);
        setEditMode(false);
      }}
    >
      <div className="mb-8 flex flex-col">
        <div className="my-10 flex flex-col gap-5">
          <div className="flex w-full gap-5">
            <div className="relative w-[300px]">
              <label htmlFor="name" className="mb-1 block font-medium">
                First Name
              </label>
              <SimpleInput
                placeholder="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                variant="rectangle"
                disabled={!editMode && true}
                styles="h-[40px] border border-[#EAEAEF]"
              />
            </div>
            <div className="relative w-[300px]">
              <label htmlFor="lastName" className="mb-1 block font-medium">
                Last Name
              </label>
              <SimpleInput
                name="lastName"
                placeholder="Last Name"
                value={formik.values.lastName}
                variant="rectangle"
                disabled={!editMode && true}
                styles="h-[40px] border border-[#EAEAEF]"
              />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="relative w-[300px]">
              <label htmlFor="email" className="mb-1 block font-medium">
                Email
              </label>
              <SimpleInput
                name="email"
                value={formik.values.email}
                placeholder="Email"
                variant="rectangle"
                disabled={!editMode && true}
                styles="h-[40px] border border-[#EAEAEF]"
              />
            </div>
            <div className="relative w-[300px]">
              <label htmlFor="phone" className="mb-1 block font-medium">
                Phone number
              </label>
              <SimpleInput
                name="phone"
                value={formik.values.phone}
                placeholder="Phone Number"
                variant="rectangle"
                disabled={!editMode && true}
                styles="h-[40px] border border-[#EAEAEF]"
              />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="relative w-[300px]">
              <label htmlFor="nationality" className="mb-1 block font-medium">
                Nationality
              </label>
              <SimpleInput
                name="nationality"
                value={formik.values.nationality}
                variant="rectangle"
                placeholder="Nationality"
                styles="h-[40px] border border-[#EAEAEF]"
                disabled={!editMode && true}
              />
            </div>
            <div className="relative w-[300px]">
              <label htmlFor="dateOfBirth" className="mb-1 block font-medium">
                Birthdate
              </label>
              <SimpleInput
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                variant="rectangle"
                placeholder="Birthdate"
                disabled={!editMode && true}
                styles="h-[40px] border border-[#EAEAEF]"
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </div>
        {editMode ? (
          <div className="flex gap-5">
            <button
              className="w-[200px] rounded-full border border-[#676D73] px-12 py-2 text-[#676D73]"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <ActionButton
              text="Save"
              disabled={!formik.isValid || !formik.dirty}
              borderRadius="rounded"
              className="w-[200px] rounded-full bg-primary px-12 py-2 text-white"
            />
          </div>
        ) : (
          <button
            className="w-[200px] rounded-full border border-[#676D73] px-12 py-2 text-[#676D73]"
            onClick={() => setEditMode(true)}
          >
            Edit profile
          </button>
        )}
      </div>
    </form>
  );
}
