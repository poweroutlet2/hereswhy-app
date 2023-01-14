# Threads
Threads is a web app that displays twitter threads. The thread data available to the app is dependent on what threads-injestor (which runs every hour)
picks up. The index page is statically generated with ISR every ten minutes. The individual author and thread pages are not generated at build time,
but get statically generated on demand and are invalidated every 10 minutes.

This app was made using the T3 stack (including NextJS, TRPC, Typescript, Tailwind, Prisma, Zod) and is hosted on Vercel.
The backend stack which ingests the data behind the app: Python, sqlAclchemy, Postgres, CircleCI workflows/Github Actions.

URLs:
https://threads-app.vercel.app/
https://hereswhy.io


# Prisma
- The tweet table contains a column "search" which is type tsvector. This field should not be queried or accessed using the Prisma ORM.
- When the prisma schema is changed (either manually or by running prisma generate) on VSCode, reload the window for the type checker to view changes
