import toast from "react-hot-toast";

export const truncateText = (text: string, includedLetters: number) => {
  return (
    text.substring(0, includedLetters) +
    (text.length > includedLetters ? "..." : "")
  );
};

export const capitalize = (word: string) => {
  return `${word.at(0)?.toUpperCase()}${word.substring(1).toLowerCase()}`;
};

export function toastNotifier(errorMessage: string | undefined) {
  if (!errorMessage) {
    toast.success("Success", {
      duration: 8000,
      position: "top-center",
    });
  } else {
    toast.error(errorMessage ?? "Something went wrong", {
      duration: 8000,
      position: "top-right",
    });
  }
}
