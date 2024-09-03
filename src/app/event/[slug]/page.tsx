import { capitalize, getEvent } from "@/app/lib/utils";
import H1 from "@/components/h1";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: `${event.name}`,
  };
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;

  const event = await getEvent(slug);

  console.log(event);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center ">
        <Image
          src={event.imageUrl}
          className="object-cover blur-3xl "
          alt="event bg image"
          fill
          quality={50}
          sizes="(max-width:1280) 100vw, 1280px"
          priority
        />

        <div className="z-1 relative flex flex-col gap-6 lg:gap-16 lg:flex-row py-14 sm:py-20 ">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />
          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
              ,{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "long",
              })}{" "}
              {new Date(event.date).toLocaleDateString("en-US", {
                day: "2-digit",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl ">
              {event.name}{" "}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75 ">
              Organized by <span className="italic">{event.organizerName}</span>{" "}
            </p>
            <button className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-2 border-white/10 sm:w-full py-2 state-effects ">
              get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16 ">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children} </section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8 ">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75 ">
      {children}
    </p>
  );
}
