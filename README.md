# NestJS + React monorepo sample

This is an NestJS + React monorepo sample.
Based on [Turborepo](https://turbo.build/)

## Install modules

```bash
npm install
```

## husky

```bash
npx husky install
```

## Local Run

### Copy environment variables

```bash
cp .env.sample .env
```

### Setting database

```bash
docker compose up -d
npm run db:push
npm run db:seed
```

### Run

```bash
npm run dev
```

## JIRA API References

https://developer.atlassian.com/cloud/jira/software/rest/intro/#introduction
