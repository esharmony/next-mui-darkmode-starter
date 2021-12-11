
### Next.js MUI 5 Dark Mode Theme Starter Repository

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can see a running version [here](https://next-mui-darkmode-starter.vercel.app/) 

The base of this project was written following [this post](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js) by Paulin Trognon

The application is set up the following features.

Next.js with Typescript 
Dark theme with Material UI 5
Storybook with dark theme available globally from the Storybook toolbar
Storys will have dark theme applied with no extra configuration needed.
Storyshots (snapshots automatically generated from storybook stories) configured
Jest configured

## Getting Started

First, run the development server:

```bash

yarn dev
#or
yarn storybook
#or
yarn test

```

To run storybook, you will need to set up your own Storybook on [Chromatic](https://www.chromatic.com/) and add a .env containing CHROMATIC_PROJECT_TOKEN="[yourprojecttoken]"

To run the github hook you will need to add this project token in github to your repository secrets info [here](https://www.chromatic.com/docs/ci)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

