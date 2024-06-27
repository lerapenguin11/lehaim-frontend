
FROM node:20-alpine as base

WORKDIR /app

COPY . .

FROM base as dev

RUN yarn install

EXPOSE 3000
CMD ["yarn", "dev"]

FROM base as build

ENV NODE_ENV=production

COPY environments/.env.local.prod .env.local
RUN yarn install --production=true
RUN yarn build

FROM base as prod

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

