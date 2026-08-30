# stuartmemo.com

This is the source of [stuartmemo.com](https://stuartmemo.com), recovered from
the production document root on 30 August 2026 and reconciled with this
repository's original history.

The site is deliberately static. Its legacy demos stay as deployed snapshots,
while reusable libraries with an authoritative upstream repository are pinned
as Git submodules and assembled into the deployable site at build time.

## Work locally

```sh
git clone --recurse-submodules https://github.com/stuartmemo/stuartmemo.com.git
cd stuartmemo.com
./scripts/build-site.sh
./scripts/verify-site.sh
python3 -m http.server --directory _site 8000
```

The generated document root is `_site/`. Never deploy the repository root
directly: it contains documentation, CI configuration, and component source.

See [COMPONENTS.md](COMPONENTS.md) for upstream ownership and
[DEPLOYMENT.md](DEPLOYMENT.md) for the release process and recovery procedure.
