import type { SanityImageObjectStub } from "@sanity/asset-utils";
import urlBuilder from "@sanity/image-url";

import { dataset, projectId } from "~/sanity/projectDetails";

type RecordCoverProps = {
  image?: SanityImageObjectStub & { alt: string };
};

export function RecordCover(props: RecordCoverProps) {
  const { image } = props;

  return (
    <div className="aspect-auto dark:bg-indigo-800 bg-indigo-400">
      {image ? (
        <img
          className="h-auto scale-95 rounded-md w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
          src={urlBuilder({ projectId, dataset })
            .image(image)
            // .height(400)
            // .width(300)
            .fit("fillmax")
            .auto("format")
            .url()}
          alt={image?.alt ?? ``}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          Missing Record art
        </div>
      )}
    </div>
  );
}
