# Deployment

Every pull request and push to `master` builds and verifies the static document
root. A push to `master` then uploads an immutable release to `newmemobox`,
atomically switches the `current` symlink, and verifies the deployed commit over
HTTPS.

Production serves:

```text
/home/deploy-stuartmemo/stuartmemo.com/current
  -> releases/<commit>-<run>-<attempt>
```

The Caddy container mounts the parent directory read-only and serves
`/srv/stuartmemo.com/current`. Five releases are retained for quick rollback.
The previous production tree remains at
`/home/stuart/memobox/sites/stuartmemo.com` as a recovery snapshot.

The build excludes legacy ASP/PHP source, Apache metadata, debug/editor debris,
unreferenced backup/database files, and obsolete Synth release machinery. Caddy
would otherwise publish the server-side source and nested bare repository
verbatim because this site is intentionally static. The recovered server-side
source remains in Git for historical reference.

## GitHub configuration

The workflow expects these repository variables:

- `DEPLOY_HOST`
- `DEPLOY_USER`

It expects these encrypted repository secrets:

- `DEPLOY_SSH_KEY`
- `DEPLOY_KNOWN_HOSTS`

The key belongs only to the dedicated `deploy-stuartmemo` Linux account. Its
`authorized_keys` entry forces `ops/deploy-gate.sh` and disables forwarding and
interactive sessions. The gate accepts only an archive upload or activation of
a validated release identifier.

## Roll back

On the server, inspect the release names beneath
`/home/deploy-stuartmemo/stuartmemo.com/releases`, then atomically repoint
`current` to the chosen release. A normal deployment will supersede the manual
rollback on the next push.

## Server configuration

`ops/stuartmemo.caddy` is the source-controlled site block. Changes to it are a
privileged infrastructure operation: validate with `caddy validate`, update the
host's Caddyfile, and recreate or reload only the Caddy service. Normal content
deployments never need elevated privileges.
