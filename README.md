# hereswhy.io
hereswhy.io is a web app that displays twitter threads. The thread data available to the app is dependent on what hereswhy-ingestor picks up
(run every hour). The index page is statically generated with ISR every 30 minutes. The individual author and thread pages are not generated at build time,
but get statically generated on demand and are invalidated every 30 minutes.

Stack: NextJS, TRPC, Typescript, Tailwind, NextAuth, Prisma, Vercel
The backend stack which ingests the data behind the app: Python, Postgres

URL:
https://hereswhy.io


# Prisma Notes
- The tweet table contains a column "search" which is type tsvector. This field should not be queried or accessed using Prisma ORM.
- When the prisma schema is changed (either manually or by running prisma generate) on VSCode, reload window 
