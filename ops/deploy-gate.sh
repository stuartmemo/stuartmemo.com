#!/usr/bin/env bash
set -euo pipefail

deploy_root="/home/deploy-stuartmemo/stuartmemo.com"
original_command="${SSH_ORIGINAL_COMMAND:-}"

fail() {
    echo "Deployment rejected: $*" >&2
    exit 1
}

read -r action release_id extra <<< "$original_command"
[[ -z "${extra:-}" ]] || fail "unexpected arguments"
[[ "$release_id" =~ ^[0-9a-f]{40}-[0-9]+-[0-9]+$ ]] || fail "invalid release identifier"

release_sha="${release_id%%-*}"
release_dir="$deploy_root/releases/$release_id"

case "$action" in
    upload)
        [[ ! -e "$release_dir" ]] || fail "release already exists"

        archive_path="$(mktemp "$deploy_root/incoming/archive.XXXXXX.tar.gz")"
        staging_dir="$(mktemp -d "$deploy_root/incoming/release.XXXXXX")"

        cleanup_upload() {
            [[ ! -f "${archive_path:-}" ]] || rm -f "$archive_path"
            if [[ -n "${staging_dir:-}" && -d "$staging_dir" ]]; then
                find "$staging_dir" -depth -delete
            fi
        }
        trap cleanup_upload EXIT

        dd of="$archive_path" status=none

        if ! tar -tzf "$archive_path" | awk '
            /^\// || /(^|\/)\.\.($|\/)/ { unsafe = 1 }
            END { exit unsafe }
        '; then
            fail "archive contains an unsafe path"
        fi

        tar --no-same-owner --no-same-permissions -xzf "$archive_path" -C "$staging_dir"

        while IFS= read -r -d '' symlink_path; do
            symlink_target="$(readlink "$symlink_path")"
            [[ "$symlink_target" != /* ]] || fail "archive contains an absolute symlink"
            resolved_target="$(realpath -m "$(dirname "$symlink_path")/$symlink_target")"
            [[ "$resolved_target" == "$staging_dir"/* ]] || fail "archive symlink escapes the release"
            [[ -e "$symlink_path" ]] || fail "archive contains a broken symlink"
        done < <(find "$staging_dir" -type l -print0)

        [[ -f "$staging_dir/index.html" ]] || fail "index.html is missing"
        [[ -f "$staging_dir/.well-known/stuartmemo-release" ]] || fail "release marker is missing"
        marker="$(tr -d '\r\n' < "$staging_dir/.well-known/stuartmemo-release")"
        [[ "$marker" == "$release_sha" ]] || fail "release marker does not match"

        mv "$staging_dir" "$release_dir"
        staging_dir=""
        echo "Uploaded $release_id"
        ;;

    activate)
        [[ -f "$release_dir/index.html" ]] || fail "release is not uploaded"
        marker="$(tr -d '\r\n' < "$release_dir/.well-known/stuartmemo-release")"
        [[ "$marker" == "$release_sha" ]] || fail "release marker does not match"

        temporary_link="$deploy_root/.current.$release_id.$$"
        ln -s "releases/$release_id" "$temporary_link"
        mv -Tf "$temporary_link" "$deploy_root/current"

        mapfile -t expired_releases < <(
            find "$deploy_root/releases" -mindepth 1 -maxdepth 1 -type d \
                -printf '%T@ %p\n' | sort -nr | tail -n +6 | cut -d' ' -f2-
        )
        for expired_release in "${expired_releases[@]}"; do
            [[ "$expired_release" == "$release_dir" ]] && continue
            [[ "$expired_release" == "$deploy_root/releases/"* ]] || fail "unsafe cleanup path"
            find "$expired_release" -depth -delete
        done

        echo "Activated $release_id"
        ;;

    *)
        fail "unsupported command"
        ;;
esac
