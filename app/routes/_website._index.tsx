import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { defer, Await, useLoaderData } from "@remix-run/react";
import { useQuery } from "@sanity/react-loader";

import type { loader as layoutLoader } from "~/routes/_website";
import { loadQuery } from "~/sanity/loader.server";
import { loadQueryOptions } from "~/sanity/loadQueryOptions.server";
import { LANDING_SECTIONS_QUERY } from "~/sanity/queries";

import {
  landingSectionsStubsZ,
  type LandingSectionStub
} from "~/types/landingSection";
import { LandingSections } from "~/components/LandingSections";
import HeroCoder from "~/components/HeroCoder";
import { Loading } from "~/components/Loading";
import { Suspense } from "react";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await loadQueryOptions(request.headers);
  const params = {};

  const initial = await loadQuery<LandingSectionStub[]>(
    LANDING_SECTIONS_QUERY,
    {},
    options
  ).then((res) => ({
    ...res,
    data: res.data ? landingSectionsStubsZ.parse(res.data) : null
  }));

  if (!initial.data) {
    throw new Response("Not found", { status: 404 });
  }

  return defer({
    initial,
    params
  });
  // return { initial, initialLandingSections, query, params };
};

export default function Index() {
  const { initial, params } = useLoaderData<typeof loader>();
  const data = useQuery<typeof initial>(LANDING_SECTIONS_QUERY, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial
  });
  console.log(initial);
  console.log(data);
  return data ? (
    <div>
      <HeroCoder />
      <Suspense fallback={<Loading />}>
        <Await resolve={initial} errorElement={<h1>ERROR!</h1>}>
          {(projects) => <LandingSections landingSections={projects.data} />}
        </Await>
      </Suspense>
    </div>
  ) : null;
}
