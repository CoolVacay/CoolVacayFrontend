import { auth } from "~/auth";
import { getReservationsDetails } from "../../actions";
import Reservations from "~/app/ui/components/profile/Reservations";

export default async function Page() {
  const session = (await auth())!;
  const reservationsDetails =
    session.user && (await getReservationsDetails(session.user.id!))!;
  return (
    <main className="w-full">
      <Reservations reservationsDetails={reservationsDetails!} />
    </main>
  );
}
