import { useGSAP } from "@gsap/react";
import { Link } from "@remix-run/react";
import React, { useRef } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function HeroCoder(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const heroText = useRef<HTMLDivElement>(null);
  const heroImage = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      gsap
        .timeline({
          // yes, we can add it to an entire timeline!
          yoyo: false,
          scrollTrigger: {
            trigger: "fullView",
            pin: true, // pin the trigger element while active
            start: "top top", // when the top of the trigger hits the top of the viewport
            end: "+=250", // end after scrolling 500px beyond the start
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
          heroText.current,
          {
            //   delay: 0.6,
            opacity: 0,
            clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)"
            //   duration: 0.8
          },
          {
            opacity: 1
          }
        )
        .fromTo(
          heroImage.current,
          {
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
  return (
    <div
      ref={container}
      className="transition-colors duration-1000 relative bg-white dark:bg-black"
    >
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-18 lg:pt-18 xl:col-span-6">
          <div className="mx-auto max-w-2xl pt-1 lg:mx-0">
            <div className="hidden sm:mt-16 sm:flex lg:mt-8">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 dark:text-gray-100  ring-1 dark:ring-gray-100/30 ring-gray-900/10 hover:ring-gray-900/20">
                Find out more about how I can help you.{" "}
                <Link
                  to="/learn"
                  className="whitespace-nowrap font-semibold text-indigo-600"
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight dark:text-gray-100 text-gray-900 sm:mt-10 sm:text-6xl">
              Skills and experience to enrich your online business
            </h1>
            <div className="fullView"></div>
            <p className="mt-6 text-lg leading-8 dark:text-gray-400 text-gray-600">
              As a full stack developer, I have the expertise to enhance your
              online business. I can handle both the front-end and back-end
              development, ensuring a seamless user experience and efficient
              server-side operations.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/contact"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to="/learn"
                className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          ref={heroImage}
          className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2102&q=80"
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
}
