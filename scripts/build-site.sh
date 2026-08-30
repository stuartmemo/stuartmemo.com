#!/usr/bin/env bash
set -euo pipefail

repository_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="${1:-$repository_root/_site}"

if [[ "$output_dir" == "$repository_root" || "$output_dir" == "$repository_root/" ]]; then
    echo "Refusing to build over the repository root." >&2
    exit 1
fi

required_component_files=(
    "components/abbey-load/abbey-load.js"
    "components/qwerty-hancock/demo/qwerty-hancock.png"
    "components/qwerty-hancock/demo/style.css"
    "components/qwerty-hancock/dist/index.umd.js"
    "components/wavy-jones/wavy-jones.js"
)

for required_file in "${required_component_files[@]}"; do
    if [[ ! -f "$repository_root/$required_file" ]]; then
        echo "Missing $required_file. Run: git submodule update --init --recursive" >&2
        exit 1
    fi
done

mkdir -p "$output_dir"
rsync -a --delete --delete-excluded \
    --exclude-from="$repository_root/.deployignore" \
    "$repository_root/" "$output_dir/"

install -m 0644 "$repository_root/components/abbey-load/abbey-load.js" \
    "$output_dir/abbey-load/abbey-load.js"
install -m 0644 "$repository_root/components/qwerty-hancock/dist/index.umd.js" \
    "$output_dir/qwerty-hancock/qwerty-hancock.js"
install -m 0644 "$repository_root/components/qwerty-hancock/demo/qwerty-hancock.png" \
    "$output_dir/qwerty-hancock/qwerty-hancock.png"
install -m 0644 "$repository_root/components/qwerty-hancock/demo/style.css" \
    "$output_dir/qwerty-hancock/style.css"
install -m 0644 "$repository_root/components/wavy-jones/wavy-jones.js" \
    "$output_dir/wavy-jones/wj.js"

release_sha="${GITHUB_SHA:-$(git -C "$repository_root" rev-parse HEAD)}"
mkdir -p "$output_dir/.well-known"
printf '%s\n' "$release_sha" > "$output_dir/.well-known/stuartmemo-release"

echo "Built $output_dir at $release_sha"
