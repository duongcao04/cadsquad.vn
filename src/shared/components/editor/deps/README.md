# Tiptap offline snapshot

**English** | [Tiếng Việt](./README.vi.md)

This directory contains a Tiptap runtime snapshot that can restore the editor
when the packages can no longer be downloaded from the registry.

## Contents

- `tiptap-runtime-3.28.0.tar.gz`: current Tiptap `3.28.0` runtime snapshot.
- `tiptap-runtime-3.27.3.tar.gz`: legacy snapshot for lockfiles using Tiptap `3.27.3`.
- `SHA256SUMS`: checksum used to verify that the archive has not changed.
- `DEPENDENCIES.snapshot.md`: exact editor dependency versions when the snapshot was created.

The archive preserves the directory structure used inside `node_modules` and
includes:

- `@tiptap/*`
- `@floating-ui/*`
- `prosemirror-*`
- `orderedmap`, `rope-sequence`, and `w3c-keyname`
- `fast-equals`, `linkifyjs`, and `use-sync-external-store`
- Type packages required by `@tiptap/react`

## Restoring the snapshot

Run this command from the repository root:

```bash
mkdir -p node_modules && tar -xzf src/components/editor/deps/tiptap-runtime-3.28.0.tar.gz -C node_modules
```

Verify the archive before extracting it:

```bash
cd src/components/editor/deps && shasum -a 256 -c SHA256SUMS
```

After extracting it, return to the repository root and verify the project:

```bash
bunx tsc --noEmit
bunx vite build
```

## Notes

- Restore the snapshot after installing all other dependencies.
- Do not run `bun install` again after restoring the snapshot while Tiptap is
  still unavailable from the registry; the package manager may overwrite
  `node_modules`.
- The snapshot is only a fallback. Under normal conditions, use the dependencies
  declared in `package.json` and locked by `bun.lock`.
- When upgrading Tiptap, create a new snapshot and update its checksum.
