import Image from "next/image";
import Link from "next/link";
import SignInForm from "~/app/ui/components/authentication/signIn-form";
import { auth } from "~/auth";
import { redirect } from "next/navigation";
import IconGenerator from "~/app/ui/components/common/IconGenerator";
import { signIn } from "~/auth";
export default async function SignIn() {
  const session = await auth();

  if (session) redirect("/");

  return (
    <div className="flex w-full flex-col gap-20">
      <div className="w-full">
        <Link href="/" className="text-left">
          <Image
            src="/cool_vacay_logo_blue.svg"
            alt="CoolVacay Logo"
            width={200}
            height={22}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="mb-4 text-3xl">Sign in</h1>
          <p className="text-[#9FA4AA]">
            Be ready to unlock exclusive features only with Coolvacay
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <SignInForm />
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 items-center justify-center gap-5">
              <div className="h-[1px] w-full bg-[#EAEAEF]" />
              <h1 className="size-md text-center text-[#9FA4AA]">
                Or connect with
              </h1>
              <div className="h-[1px] w-full bg-[#EAEAEF]" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={async () => {
                  "use server";
                  await signIn("google");
                }}
                className="flex w-1/2 items-center justify-center rounded-[100px] border border-[#ADB5BD] px-5 py-4 text-[15px]"
              >
                <span className="mr-2">
                  <IconGenerator
                    alt="google icon"
                    src={`/logo_google.svg`}
                    width="32px"
                  />
                </span>
                Sign in with Google
              </button>
              <button className="flex w-1/2 items-center justify-center rounded-[100px] border border-[#ADB5BD] px-5 py-4 text-[15px]">
                <span className="mr-2">
                  <IconGenerator
                    alt="facebook icon"
                    src={`/logo_facebook.svg`}
                    width="32px"
                  />
                </span>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center text-[#9FA4AA]">
          Don’t have an account?
          <Link className="ml-2 text-primary" href="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
