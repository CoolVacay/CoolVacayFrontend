import { ListingCard } from "~/app/ui/components/Cards/Cards";

export default async function Page() {
    return (
        <main className="w-7/12 pl-[70px]">
            <h1 className="text-3xl pb-6">North Carolina available properties</h1>
            <div className="grid grid-cols-2 gap-5">
                <ListingCard
                    name="Swiss Mountain"
                    subtitle="Blowing Rock, North Calolina"
                    imageUrl="/cardImage.png"
                />
                <ListingCard
                    name="Swiss Mountain"
                    subtitle="Blowing Rock, North Calolina"
                    imageUrl="/cardImage.png"
                />
                <ListingCard
                    name="Swiss Mountain"
                    subtitle="Blowing Rock, North Calolina"
                    imageUrl="/cardImage.png"
                />
                <ListingCard
                    name="Swiss Mountain"
                    subtitle="Blowing Rock, North Calolina"
                    imageUrl="/cardImage.png"
                />
            </div>
        </main>
    );
}
