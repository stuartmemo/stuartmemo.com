#!/usr/bin/env bash
set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
site_dir="${1:-$repository_root/_site}"

required_files=(
    ".well-known/brave-rewards-verification.txt"
    ".well-known/stuartmemo-release"
    "abbey-load/abbey-load.js"
    "images/mcp-mpc.png"
    "index.html"
    "mcp-mpc/index.html"
    "mcp-mpc/samples/kick.wav"
    "qwerty-hancock/index.html"
    "qwerty-hancock/qwerty-hancock.js"
    "qwerty-hancock/qwerty-hancock.png"
    "qwerty-hancock/style.css"
    "synth/index.html"
    "wavy-jones/index.html"
    "wavy-jones/wj.js"
)

for required_file in "${required_files[@]}"; do
    if [[ ! -f "$site_dir/$required_file" ]]; then
        echo "Missing required deployed file: $required_file" >&2
        exit 1
    fi
done

mcp_sample_count="$(find "$site_dir/mcp-mpc/samples" -maxdepth 1 -type f -name '*.wav' | wc -l | tr -d ' ')"
if [[ "$mcp_sample_count" != "16" ]]; then
    echo "Expected 16 MCP MPC samples, found $mcp_sample_count." >&2
    exit 1
fi

mcp_bundle_src="$(sed -n 's/.*src="\(\/mcp-mpc\/assets\/index-[^"]*\.js\)".*/\1/p' "$site_dir/mcp-mpc/index.html" | head -n 1)"
mcp_bundle="$site_dir$mcp_bundle_src"
if [[ -z "$mcp_bundle_src" || ! -f "$mcp_bundle" ]]; then
    echo "Could not resolve the MCP MPC JavaScript bundle." >&2
    exit 1
fi

for webmcp_tool in \
    mcpmpc_get_state mcpmpc_load_sample mcpmpc_assign_pad mcpmpc_configure_pad \
    mcpmpc_chop_sample mcpmpc_create_sequence mcpmpc_play_pad mcpmpc_set_transport
do
    if ! grep -q "$webmcp_tool" "$mcp_bundle"; then
        echo "MCP MPC bundle is missing WebMCP tool: $webmcp_tool" >&2
        exit 1
    fi
done

if ! grep -q 'href="/mcp-mpc/"' "$site_dir/index.html"; then
    echo "Portfolio index does not link to MCP MPC." >&2
    exit 1
fi

first_tile="$(awk '/<ul id="movies"/{tiles=1; next} tiles && /<li><img/{print; exit}' "$site_dir/index.html")"
first_link="$(awk '/<ul id="foreground"/{tiles=1; next} tiles && /<a href=/{print; exit}' "$site_dir/index.html")"
if [[ "$first_tile" != *'images/mcp-mpc.png'* || "$first_link" != *'href="/mcp-mpc/"'* ]]; then
    echo "MCP MPC is not the first portfolio item." >&2
    exit 1
fi

for forbidden_path in \
    .git .github components ops scripts README.md COMPONENTS.md DEPLOYMENT.md \
    synth/current synth/releases synth/repo synth/revisions.log synth/shared
do
    if [[ -e "$site_dir/$forbidden_path" ]]; then
        echo "Repository-only path leaked into the document root: $forbidden_path" >&2
        exit 1
    fi
done

cmp -s "$site_dir/abbey-load/abbey-load.js" \
    "$repository_root/components/abbey-load/abbey-load.js"
cmp -s "$site_dir/qwerty-hancock/qwerty-hancock.js" \
    "$repository_root/components/qwerty-hancock/dist/index.umd.js"
cmp -s "$site_dir/qwerty-hancock/qwerty-hancock.png" \
    "$repository_root/components/qwerty-hancock/demo/qwerty-hancock.png"
cmp -s "$site_dir/qwerty-hancock/style.css" \
    "$repository_root/components/qwerty-hancock/demo/style.css"
cmp -s "$site_dir/wavy-jones/wj.js" \
    "$repository_root/components/wavy-jones/wavy-jones.js"

while IFS= read -r -d '' symlink_path; do
    symlink_target="$(readlink "$symlink_path")"
    if [[ "$symlink_target" == /* ]]; then
        echo "Absolute symlink is not deployable: $symlink_path -> $symlink_target" >&2
        exit 1
    fi
    if ! (cd "$(dirname "$symlink_path")" && [[ -e "$symlink_target" ]]); then
        echo "Broken symlink: $symlink_path -> $symlink_target" >&2
        exit 1
    fi
done < <(find "$site_dir" -type l -print0)

if find "$site_dir" -type f -size +99M -print -quit | grep -q .; then
    echo "The deploy contains a file above GitHub's 100 MB file limit." >&2
    exit 1
fi

if find "$site_dir" -type f \( \
    -name '*.asp' -o -name '*.asp.txt' -o -name '*.mno' -o \
    -name '*.php' -o -name '*.php.txt' \
\) -print -quit | grep -q .; then
    echo "Legacy server-side source leaked into the static deployment." >&2
    exit 1
fi

echo "Verified $site_dir"
