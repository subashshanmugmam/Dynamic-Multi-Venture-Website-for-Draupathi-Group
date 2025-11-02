# CI/CD Pipeline Setup

This repository now includes GitHub Actions workflows for continuous integration and deployment.

## Workflows

### 1. Simple CI (`simple-ci.yml`) ⭐ **Recommended for most cases**
A reliable workflow that runs on push to main/develop branches:
- **Frontend Job**: Runs lint, build, and build size check
- **Backend Job**: Comprehensive syntax validation for all JS files
- **Security Job**: Dependency vulnerability scanning
- **No external dependencies** (no MongoDB required)
- Fast execution and high reliability

### 2. Basic CI (`basic-ci.yml`)
A simple workflow that runs on push to main branch:
- **Frontend Job**: Runs `npm install` and `npm test` in `./draupathi-frontend`
- **Backend Job**: Runs `npm install` and enhanced syntax checking
- Uses `actions/cache` to cache `node_modules` for faster builds
- Improved error handling and validation

### 3. Advanced CI/CD (`ci-cd.yml`)
A comprehensive workflow with additional features:
- Matrix builds (Node.js 18.x and 20.x)
- MongoDB service for backend testing (with improved connection handling)
- Security audits
- Build artifact uploads
- Deployment job (template)
- Notifications

## Features

### Caching Strategy
- **Node.js Cache**: Uses `actions/setup-node` with built-in npm cache
- **node_modules Cache**: Uses `actions/cache` to cache installed packages
- **Cache Keys**: Based on package-lock.json hash for accurate cache invalidation

### Test Strategy
- **Frontend**: Runs linting and build process (since no test framework is configured yet)
- **Backend**: Runs syntax check using Node.js (since no test framework is configured yet)
- **Fallback**: If no test script exists, runs alternative checks

## Current Test Scripts

### Frontend (`draupathi-frontend`)
```bash
npm test          # Runs lint + build + validation
npm run test:unit # Placeholder for unit tests
npm run test:e2e  # Placeholder for e2e tests
```

### Backend (`draupathi-backend`)
```bash
npm test             # Runs syntax validation
npm run test:unit    # Placeholder for unit tests  
npm run test:integration # Placeholder for integration tests
```

## Adding Real Tests

### For Frontend (Recommended: Vitest)
```bash
cd draupathi-frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Update `package.json`:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### For Backend (Recommended: Jest + Supertest)
```bash
cd draupathi-backend  
npm install --save-dev jest supertest mongodb-memory-server
```

Update `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "collectCoverageFrom": [
      "src/**/*.js",
      "!src/server.js"
    ]
  }
}
```

## Environment Variables for CI

The workflow automatically creates a `.env` file for backend testing with these variables:
- `NODE_ENV=test`
- `MONGODB_URI` (points to CI MongoDB service)
- `JWT_SECRET` and `JWT_REFRESH_SECRET` (test values)
- Other required environment variables

## Triggering the Pipeline

The workflows trigger on:
- **Push to main branch**
- **Pull requests to main branch**

## Monitoring

- Check the **Actions** tab in your GitHub repository
- View job logs for debugging
- Monitor build times and cache hit rates
- Review security audit results

## Next Steps

1. **Add Real Tests**: Implement unit and integration tests
2. **Add Deployment**: Configure deployment to your hosting platform
3. **Add Notifications**: Set up Slack/Discord notifications
4. **Add Code Quality**: Integrate SonarCloud or CodeClimate
5. **Add Performance**: Add Lighthouse CI for frontend performance

## Deployment Configuration

The advanced workflow includes a deployment job template. To enable deployment:

1. Add your deployment secrets to GitHub repository secrets
2. Uncomment and modify the deployment steps in `ci-cd.yml`
3. Configure your target environment (AWS, Vercel, Netlify, etc.)

Example deployment secrets:
- `DEPLOY_HOST`
- `DEPLOY_USERNAME` 
- `DEPLOY_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Troubleshooting

### Cache Issues
If you encounter cache-related problems:
1. Clear cache in GitHub Actions settings
2. Update cache keys in workflow files
3. Verify package-lock.json is committed

### Test Failures
1. Check job logs for specific error messages
2. Verify all required environment variables are set
3. Ensure MongoDB service is healthy (for backend tests)

### Node.js Version Issues
The workflows use Node.js 20.x by default. To change:
1. Update `node-version` in workflow files
2. Ensure compatibility with your dependencies