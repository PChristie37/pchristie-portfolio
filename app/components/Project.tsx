import { createDataAttribute } from "@sanity/visual-editing/remix";

import { LikeDislike } from "~/components/LikeDislike";
import { RecordCover } from "~/components/RecordCover";
import { SanityContent } from "~/components/SanityContent";
import { Title } from "~/components/Title";
import { secondsToMinutes } from "~/lib/secondsToMinutes";
import { LandingSectionDocument } from "~/types/landingSection";
import type { RecordDocument } from "~/types/record";

type ProjectProps = {
  data: LandingSectionDocument;
};

export function Project({ data }: ProjectProps) {
  const { _id, title, image } = data;
  const imageDataAttribute = createDataAttribute({
    id: _id,
    path: ["image"],
    baseUrl: "/studio",
    type: "project"
  }).toString();

  return (
    <article className="flex flex-col items-start gap-4 lg:flex-row lg:gap-12">
      <div className="grid-gap-4 grid max-w-[70vw] grid-cols-1">
        <div className="max-w-sm" data-sanity={imageDataAttribute}>
          <RecordCover image={image} />
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4 lg:gap-6 lg:w-2/3">
        <header>{title ? <Title>{title}</Title> : null}</header>
        {/* {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null} */}
      </div>
    </article>
  );
}
