FROM yny.ocir.io/axmpikvsv3z9/node AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /workspace
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS runner
WORKDIR /workspace
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/.next/standalone ./
COPY --from=builder /workspace/.next/static ./.next/static
CMD node server.js
EXPOSE 3000