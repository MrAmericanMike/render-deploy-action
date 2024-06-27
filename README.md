# Trigger Render Deploy

Action that triggers a Render deploy.

## Inputs

## `render-service-id`

**Required** The Service ID of the Render service to trigger the deploy on. When viewing a service in the Render dashboard grab this value from the URL - it will start with `srv-`

## `render-api-key`

**Required** Render API Key - Generated in the Render dashboard: https://dashboard.render.com/u/settings#api-keys

## `wait-for-success`

**Optional** (default `false`) When true job will be pending until the deployment gets to the status `live`

## Example usage

Use [GitHub Action Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) to set the values of `render-service-id` and `render-api-key` and then add to your workflow with:

`.github/workflows/render-deploy-action.yml`

```yaml
name: Deploy to Render

on:
    push:
        branches: [master]

jobs:
    deploy_to_render:
        runs-on: ubuntu-latest
        name: Deploy to Render
        steps:
            - name: Deploying to Render
              id: render_deploy
              uses: MrAmericanMike/trigger-render-deploy@0.0.1
              with:
                  render-service-id: ${{ secrets.RENDER_SERVICE_ID }}
                  render-api-key: ${{ secrets.RENDER_API_KEY }}
                  wait-for-success: true
```

If you want to use the latest version and not an specific version, use:

`uses: MrAmericanMike/trigger-render-deploy@master`:

### Why this action exists?

Based on [Render Deploy Action](https://github.com/johnbeynon/render-deploy-action) by [John Beynon](https://github.com/johnbeynon)

I made this new version as the one mentioned above was using an old version of Node and having some issues.

Hopefully if more people use and test the one I made we can see if those problems are fixed and if not we can work on it.

## License

MIT
