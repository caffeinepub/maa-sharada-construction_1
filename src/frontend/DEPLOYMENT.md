# Deployment Guide - Maa Sharada Construction

This guide explains how to deploy the Maa Sharada Construction website to the Internet Computer.

## Prerequisites

1. **Install dfx (Internet Computer SDK)**
   ```bash
   sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
   ```
   
   Verify installation:
   ```bash
   dfx --version
   ```
   
   Recommended version: 0.15.0 or higher

2. **Install Node.js and pnpm**
   - Node.js 18+ is required
   - Install pnpm: `npm install -g pnpm`

3. **Clone the repository** (if starting fresh)
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

## Local Development

1. **Install dependencies**
   ```bash
   cd frontend
   pnpm install
   ```

2. **Start local Internet Computer replica**
   ```bash
   # From project root
   dfx start --clean --background
   ```

3. **Deploy locally**
   ```bash
   # Create canisters
   dfx canister create --all
   
   # Generate backend bindings
   dfx generate backend
   
   # Deploy backend
   dfx deploy backend
   
   # Build and deploy frontend
   cd frontend
   pnpm run build:skip-bindings
   cd ..
   dfx deploy frontend
   ```

4. **Access the local site**
   ```bash
   # Get the local canister URL
   echo "http://localhost:4943/?canisterId=$(dfx canister id frontend)"
   ```

## Production Deployment (IC Mainnet)

### Option 1: Using the deployment script

1. **Make the script executable**
   ```bash
   chmod +x frontend/scripts/publish-ic.sh
   ```

2. **Deploy to mainnet**
   ```bash
   ./frontend/scripts/publish-ic.sh mainnet
   ```

3. **The script will output the public URL** in the format:
   ```
   https://<canister-id>.ic0.app
   ```

### Option 2: Manual deployment

1. **Ensure you have cycles** (IC's compute units)
   - You need an Internet Identity and cycles to deploy to mainnet
   - Get cycles from: https://faucet.dfinity.org/ (for testing)
   - Or purchase cycles: https://internetcomputer.org/docs/current/developer-docs/setup/cycles/

2. **Deploy to mainnet**
   ```bash
   # Create canisters on mainnet
   dfx canister create --all --network ic
   
   # Generate backend bindings
   dfx generate backend
   
   # Deploy backend to mainnet
   dfx deploy backend --network ic
   
   # Build frontend
   cd frontend
   pnpm run build:skip-bindings
   cd ..
   
   # Deploy frontend to mainnet
   dfx deploy frontend --network ic
   ```

3. **Get your public URL**
   ```bash
   echo "https://$(dfx canister id frontend --network ic).ic0.app"
   ```

## Deployment Configuration

### Base Path
The Vite configuration (`frontend/vite.config.ts`) uses `base: './'` to ensure assets load correctly when deployed to IC canisters.

### Asset Paths
All static assets use relative paths (e.g., `./assets/...`) instead of absolute paths to work correctly in the IC environment.

### Environment Variables
The build process automatically injects canister IDs via the `vite-plugin-environment` plugin.

## Troubleshooting

### Assets not loading (404 errors)
- Ensure all asset paths use relative paths (`./assets/...`)
- Verify assets are in `frontend/public/assets/` directory
- Check that `base: './'` is set in `vite.config.ts`

### Canister out of cycles
- Top up your canister with cycles
- Check balance: `dfx canister status frontend --network ic`

### Build fails
- Clear cache: `rm -rf frontend/dist frontend/node_modules/.vite`
- Reinstall dependencies: `cd frontend && pnpm install`
- Ensure dfx is running: `dfx start --background`

### Navigation/scrolling issues
- Verify section IDs match navigation targets
- Check that `scroll-margin-top` is set in CSS for sections
- Ensure smooth scroll behavior is enabled

## Post-Deployment Verification

After deployment, verify:

1. ✅ Homepage loads without errors
2. ✅ All images display correctly (logo, hero, texture)
3. ✅ Navigation links scroll to correct sections
4. ✅ Contact information is clickable (phone, email, maps)
5. ✅ Footer attribution link works with UTM tracking
6. ✅ Mobile responsive design works
7. ✅ Both light and dark modes function

## Updating the Site

To update the deployed site:

