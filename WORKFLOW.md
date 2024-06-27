Notes on how I set up this project

`pnpm init`

`pnpm i -E -D unbuild typescript @types/node dotenv`

Before committing make sure to run `pnpm build`

`git tag -d 0.0.1`

`git push origin :refs/tags/0.0.1`

`git tag -a -m "0.0.1" 0.0.1`

`git push --follow-tags`
