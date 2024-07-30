import { z } from "zod";

export const landingSectionZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  image: z.any().nullable(),
  slug: z.string().nullable()
});

export type LandingSectionDocument = z.infer<typeof landingSectionZ>;

export type LogoProps = { landingSection?: LandingSectionDocument | null };

export const landingSectionsZ = z.array(landingSectionZ);

export const landingSectionStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  image: z.any().nullable(),
  slug: z.string().nullable()
});

export const landingSectionsStubsZ = z.array(landingSectionStubZ);

export type LandingSectionStub = z.infer<typeof landingSectionStubZ>;
