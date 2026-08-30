# Component ownership

The production snapshot is kept faithful, but reusable code should have one
source of truth. The following files are copied from pinned repositories by
`scripts/build-site.sh`:

| Site path | Upstream source | Pinned commit |
| --- | --- | --- |
| `qwerty-hancock/qwerty-hancock.js` | `qwerty-hancock/dist/index.umd.js` | `395a7653ef9ba2e8bd97458aa572e8ca93fbbd43` |
| `qwerty-hancock/qwerty-hancock.png` | `qwerty-hancock/demo/qwerty-hancock.png` | `395a7653ef9ba2e8bd97458aa572e8ca93fbbd43` |
| `qwerty-hancock/style.css` | `qwerty-hancock/demo/style.css` | `395a7653ef9ba2e8bd97458aa572e8ca93fbbd43` |
| `wavy-jones/wj.js` | `wavy-jones/wavy-jones.js` | `add3ab66d2a366a98799f356a6cd337dd33ed3e9` |
| `abbey-load/abbey-load.js` | `abbey-load/abbey-load.js` | `fe313f8aaa21774dc629e2b3765b1579a94c04c4` |

The qwerty-hancock and Wavy Jones pins are their current upstream heads at the
time of recovery. Abbey Load is intentionally pinned to its initial commit,
because that is the exact runtime deployed by the demo.

Update a component deliberately: check out the desired commit inside
`components/<name>`, rebuild, verify the affected demo in a browser, and commit
the updated gitlink.

## Preserved snapshots

`i-dont-know-what-to-do`, `surfs-up`, and `synth` have related repositories in
the `stuartmemo` GitHub account, but the live output differs from their current
source trees and depends on retired build tooling. They remain recovered static
snapshots until each can be migrated and verified independently. This avoids a
nominal rebuild silently changing working historical demos.
