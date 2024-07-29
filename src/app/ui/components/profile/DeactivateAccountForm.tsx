import { deactivateAccount } from "~/app/(application)/actions";

export default function DeactivateAccountForm({
  setOpen,
  userId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}) {
  return (
    <div>
      <h1>Are you sure you want to deactivate your account?</h1>
      <div className="ml-32 mt-8 flex gap-6">
        <button onClick={() => setOpen(false)}>Cancel</button>
        <button
          onClick={() => deactivateAccount({ userId })}
          className="h-15 flex w-full items-center justify-center rounded-full border border-[#FF6565] bg-white p-4 text-[#FF6565] hover:bg-[#FF6565] hover:text-white disabled:opacity-50"
        >
          Deactivate
        </button>
      </div>
    </div>
  );
}
