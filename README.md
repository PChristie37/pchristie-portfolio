# Full-featured Sanity Studio + Remix Vite Template

Batteries-included [Remix](https://remix.run/) website using Vite with [Vercel's deployment preset](https://vercel.com/docs/frameworks/remix) with [Visual Editing](https://www.sanity.io/docs/visual-editing) for interactive live-preview inside [Presentation](https://www.sanity.io/docs/presentation) powered by an embedded [Sanity Studio](https://www.sanity.io/studio).

## Installation

From the command line, install this project as a Remix template:

```sh
npx create-remix@latest --template SimeonGriggs/sanity-remix-template
```

This template comes with an init script, if you choose not to run it, you can run it later with:

```sh
npx remix init
```

This script should populate your `.env` file with the details of a new or existing Sanity project's ID and dataset name, as well as create a session secret and an API Token with Viewer permissions. If the init script has already been deleted, you can easily reset your `.env` file by running the following command:

```sh
npx sanity@latest init --env
```

Then, start the development server:

```sh
npm run dev
```

## Deployment

This Remix template is specifically configured for hosting on Vercel.

1. Check this repository into your own source control (like GitHub) and deploy to Vercel.
2. You will need to update `PRODUCTION_URL` in `./app/sanity/projectDetails.ts` to match your production URL. This value is used to enable "stega" encoding on all URLs other than in production. And when using the production URL to view the Studio will load the production build at one of the other automatically generated URLs.

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
