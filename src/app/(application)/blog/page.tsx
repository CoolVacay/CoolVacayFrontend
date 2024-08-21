import { Suspense } from "react";
import AllBlogs from "./AllBlogs";
import { AllBlogsSkeleton } from "~/app/ui/components/common";


async function Page() {

  return (
    <main className="flex w-full flex-col">
      <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<AllBlogsSkeleton/>}>
          <AllBlogs/>
        </Suspense>
      </div>
    </main>
  );
}

export default Page;
