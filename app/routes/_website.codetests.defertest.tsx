import type { MetaFunction } from "@remix-run/node";
import {
  defer,
  Await,
  useLoaderData,
  ClientLoaderFunctionArgs
} from "@remix-run/react";
import { Suspense } from "react";
import { Loading } from "~/components/Loading";
import type { loader as layoutLoader } from "~/routes/_website";
import { loadQuery } from "~/sanity/loader.server";
import { LANDING_SECTIONS_QUERY } from "~/sanity/queries";
import { type LandingSectionStub } from "~/types/landingSection";

type CachedQuery = {
  data: LandingSectionStub[];
};
export const meta: MetaFunction<
  typeof loader,
  {
    "routes/_website": typeof layoutLoader;
  }
> = ({ matches }) => {
  const layoutData = matches.find(
    (match) => match.id === `routes/_website`
  )?.data;
  const home = layoutData ? layoutData.initial.data : null;
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(" | ");

  return [{ title }];
};

export const loader = () => {
  return defer({
    data: loadQuery<LandingSectionStub[]>(LANDING_SECTIONS_QUERY, {}, {}).then(
      async (res) => {
        await new Promise((resolve) => setTimeout(() => resolve(res), 1000));
        return res;
      }
    )
  });
};

// keep the defertest page data in memory so back clicks are instant and the data
// doesn't change
let cache: CachedQuery;
export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  if (cache) return cache;
  let loaderData = await serverLoader<CachedQuery>();
  let query = loaderData;
  cache = query;
  return query;
}

// So that the client loader is called on initial load
clientLoader.hydrate = true;

export default function Index() {
  const query = useLoaderData<typeof loader>();
  console.log({ query });
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={query.data} errorElement={<h1>ERROR!</h1>}>
        {(projects) => (
          <ul>
            {projects.data.map((project) => (
              <li key={project._id}>
                <h1>{project.title}</h1>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  );
}
