import { Link } from "@remix-run/react";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";

import { RecordCover } from "~/components/RecordCover";
import type { LandingSectionStub } from "~/types/landingSection";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
type LandingSectionsProps = {
  landingSections: LandingSectionStub[] | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function LandingSections(props: LandingSectionsProps) {
  const { landingSections = [], encodeDataAttribute } = props;
  const container = useRef<HTMLDivElement>(null);
  const projects = useRef<HTMLUListElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap
        .timeline({
          // yes, we can add it to an entire timeline!
          yoyo: false,
          scrollTrigger: {
            trigger: ".projectView",
            pin: false, // pin the trigger element while active
            start: "top bottom", // when the top of the trigger hits the top of the viewport
            end: "+=750", // end after scrolling 500px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            snap: {
              snapTo: "labels", // snap to the closest label in the timeline
              duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
              delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
              ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            }
          }
        })
        .fromTo(
          "ul",
          {
            //   delay: 0.6,
            opacity: 0,
            clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)"
            //   duration: 0.8
          },
          {
            opacity: 1
          }
        );
    },
    { scope: container }
  );

  return landingSections && landingSections.length > 0 ? (
    <div className="pb-8" ref={container}>
      <h1 className="projectView pb-4 xl:col-span-6 mt-24 text-4xl font-bold tracking-tight sm:mt-10 sm:text-6xl bg-gradient-to-r dark:from-indigo-300  dark:to-indigo-900 from-indigo-500  to-indigo-900 inline-block text-transparent bg-clip-text">
        Projects
      </h1>
      <ul
        ref={projects}
        className="grid mt-8 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 lg:grid-cols-3"
      >
        {landingSections.map((lSection, lSectionI) => (
          <li
            key={lSection._id}
            className="lsection group relative flex flex-col"
          >
            <div
              className="relative overflow-hidden rounded-md transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90"
              data-sanity={encodeDataAttribute?.([lSectionI, "image"])}
            >
              {lSection?.slug ? (
                <Link prefetch="intent" to={`/projects/${lSection?.slug}`}>
                  <RecordCover image={lSection.image} />
                </Link>
              ) : (
                <RecordCover image={lSection.image} />
              )}
            </div>
            <div className="flex flex-col">
              <span className="pt-4 text-xl font-bold tracking-tighter">
                {lSection.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="prose prose-xl mx-auto bg-green-50 p-4">
      <p>No records found, yet!</p>
      <p>
        <a href="/studio">Log in to your Sanity Studio</a> and start creating
        content!
      </p>
      <p>Or, run </p>
      <pre>
        <code>
          npx sanity@latest exec ./scripts/createData.ts --with-user-token
        </code>
      </pre>
      <p>
        from the command line to delete existing documents populate the site
        with content.{" "}
      </p>
    </div>
  );
}
