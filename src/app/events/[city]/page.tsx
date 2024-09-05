import EventList from "@/components/event-list";
import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { capitalize } from "@/app/lib/utils";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";

type Props = {
  params: {
    city: string;
  };
};
type EventPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = params.city;

  return {
    title:
      city === "all" ? "All Events" : `Events in ${capitalize(city)} - Evento`,
  };
}

export default async function EventsPage({
  params,
  searchParams,
}: EventPageProps) {
  const city = params.city;
  const page = searchParams.page ?? "1";

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${capitalize(city)}`}
      </H1>

      <Suspense fallback={<Loading />}>
        <EventList city={city} page={+page} />
      </Suspense>
    </main>
  );
}
