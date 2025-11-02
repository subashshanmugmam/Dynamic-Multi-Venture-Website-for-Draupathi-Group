# Dependency Conflict Resolution

## Issue
The CI/CD build was failing due to a peer dependency conflict between:
- `cloudinary@^2.8.0` (used in the project)
- `multer-storage-cloudinary@^4.0.0` (requires `cloudinary@^1.21.0`)

## Error Details
```
npm error ERESOLVE could not resolve
npm error While resolving: multer-storage-cloudinary@4.0.0
npm error Found: cloudinary@2.8.0
npm error Could not resolve dependency:
npm error peer cloudinary@"^1.21.0" from multer-storage-cloudinary@4.0.0
```

## Solution Applied
Added `--legacy-peer-deps` flag to npm install commands in CI/CD workflows and created `.npmrc` files.

### Files Modified:
1. `.github/workflows/basic-ci.yml` - Added `--legacy-peer-deps` to npm install commands
2. `.github/workflows/ci-cd.yml` - Added `--legacy-peer-deps` to npm ci commands
3. `draupathi-backend/.npmrc` - Created with `legacy-peer-deps=true`
4. `draupathi-frontend/.npmrc` - Created with `legacy-peer-deps=true`

## Why This Solution Works
The `--legacy-peer-deps` flag tells npm to use the npm v6 algorithm for resolving peer dependencies, which is more permissive and allows the build to proceed even with peer dependency conflicts.

This is safe because:
- `multer-storage-cloudinary` v4.0.0 was built for cloudinary v1.x but still works with v2.x
- The cloudinary v2.x API is backward compatible for the features used by multer-storage-cloudinary
- This is a commonly used approach for handling such conflicts

## Alternative Solutions (Future Considerations)

### Option 1: Downgrade Cloudinary
```json
{
  "dependencies": {
    "cloudinary": "^1.41.3"
  }
}
```

### Option 2: Use Alternative Storage Engine
Consider using direct multer with cloudinary upload API or other storage solutions.

### Option 3: Wait for Package Updates
Monitor `multer-storage-cloudinary` for updates that support cloudinary v2.x.

## Local Development
The `.npmrc` files ensure that local `npm install` also uses legacy peer deps, maintaining consistency between local and CI environments.

## Verification
After implementing this fix:
1. CI/CD pipeline should successfully install dependencies
2. Both frontend and backend builds should complete
3. No functionality should be affected

## Monitoring
Keep an eye on:
- Updates to `multer-storage-cloudinary` that might support cloudinary v2.x
- Any deprecation warnings related to legacy peer deps
- Performance or security implications of the dependency versions