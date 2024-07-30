import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@remix-run/react";
import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import { useEffect, useRef } from "react";

import { RecordCover } from "~/components/RecordCover";
import type { RecordStub } from "~/types/record";

type RecordsProps = {
  records: RecordStub[];
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

export function Records(props: RecordsProps) {
  const { records = [], encodeDataAttribute } = props;
  const container = useRef(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".lsection") as HTMLElement[];
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, "<")
        // .to(boxes[2], { y: -166 })
        .reverse();
    },
    { scope: container }
  );
  // useGSAP(
  //   () => {
  //     gsap.from(container.current, {
  //       autoAlpha: 0,
  //       duration: 0.5,
  //       ease: "slow",
  //       // delay: 1,
  //       width: 150,
  //       x: -360
  //     });
  //     gsap.from("span, a", {
  //       autoAlpha: 0,
  //       duration: 0.5,
  //       ease: "slow",
  //       delay: 1
  //     });
  //   },
  //   { scope: container }
  // );
  useEffect(() => {
    if (tl.current) {
      tl.current.reversed(!tl.current.reversed());
    }
  }, [tl]);

  return records.length > 0 ? (
    <ul
      ref={container}
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-12 lg:grid-cols-4"
    >
      {records.map((record, recordI) => (
        <li key={record._id} className="lsection group relative flex flex-col">
          <div
            className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90"
            data-sanity={encodeDataAttribute?.([recordI, "image"])}
          >
            {record?.slug ? (
              <Link prefetch="intent" to={`/records/${record?.slug}`}>
                <RecordCover image={record.image} />
              </Link>
            ) : (
              <RecordCover image={record.image} />
            )}
          </div>
          <div className="flex flex-col">
            {record?.slug ? (
              <Link
                prefetch="intent"
                to={`/records/${record?.slug}`}
                className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white lg:text-3xl"
              >
                {record.title}
              </Link>
            ) : (
              <span className="pt-4 text-xl font-bold tracking-tighter">
                {record.title}
              </span>
            )}
            {record?.artist ? (
              <span className="bg-black font-bold leading-none tracking-tighter text-white dark:bg-white dark:text-black">
                {record.artist}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
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
