import { Home } from "lucide-react";
import { ComposeIcon, ThListIcon } from "@sanity/icons";

import { defineField, defineType } from "sanity";

export const landingSectionType = defineType({
  name: "landingSection",
  title: "Landing Section",
  type: "document",
  icon: Home,
  groups: [
    {
      name: "details",
      title: "Details",
      icon: ThListIcon
    },
    {
      name: "editorial",
      title: "Editorial",
      icon: ComposeIcon
    }
  ],
  fields: [
    defineField({
      name: "title",
      description: "Heading on the home page",
      type: "string"
    }),
    defineField({
      name: "subtitle",
      description: "Subtitle for the section on the home page",
      type: "string"
    }),
    defineField({
      name: "url",
      description: "url to the project",
      type: "string"
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      group: "editorial",
      fields: [defineField({ name: "alt", type: "string" })]
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      },
      group: "details"
    })
  ],
  preview: {
    select: {
      title: "title",
      artist: "siteTitle",
      media: "image"
    }
  }
});
