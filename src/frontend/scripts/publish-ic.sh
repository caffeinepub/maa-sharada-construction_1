#!/bin/bash

# Maa Sharada Construction - IC Deployment Script
# This script builds and deploys the application to the Internet Computer

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to local network
NETWORK="${1:-local}"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Maa Sharada Construction - IC Deployment${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Validate network parameter
if [ "$NETWORK" != "local" ] && [ "$NETWORK" != "ic" ] && [ "$NETWORK" != "mainnet" ]; then
    echo -e "${RED}Error: Invalid network '${NETWORK}'${NC}"
    echo "Usage: $0 [local|ic|mainnet]"
    echo "  local   - Deploy to local dfx replica (default)"
    echo "  ic      - Deploy to IC mainnet"
    echo "  mainnet - Deploy to IC mainnet (alias for 'ic')"
    exit 1
fi

# Normalize 'mainnet' to 'ic'
if [ "$NETWORK" = "mainnet" ]; then
    NETWORK="ic"
fi

echo -e "${YELLOW}Target network: ${NETWORK}${NC}"
echo ""

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    echo -e "${RED}Error: dfx is not installed${NC}"
    echo "Install it from: https://internetcomputer.org/docs/current/developer-docs/setup/install/"
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is not installed${NC}"
    echo "Install it with: npm install -g pnpm"
    exit 1
fi

# For local network, ensure dfx is running
if [ "$NETWORK" = "local" ]; then
    if ! dfx ping &> /dev/null; then
        echo -e "${YELLOW}Starting local dfx replica...${NC}"
        dfx start --clean --background
        sleep 3
    else
        echo -e "${GREEN}✓ Local dfx replica is running${NC}"
    fi
fi

# Step 1: Create canisters if they don't exist
echo -e "${YELLOW}Step 1: Creating canisters...${NC}"
if [ "$NETWORK" = "local" ]; then
    dfx canister create --all || true
else
    dfx canister create --all --network "$NETWORK" || true
fi
echo -e "${GREEN}✓ Canisters ready${NC}"
echo ""

# Step 2: Generate backend bindings
echo -e "${YELLOW}Step 2: Generating backend bindings...${NC}"
dfx generate backend
echo -e "${GREEN}✓ Bindings generated${NC}"
echo ""

# Step 3: Deploy backend
echo -e "${YELLOW}Step 3: Deploying backend canister...${NC}"
if [ "$NETWORK" = "local" ]; then
    dfx deploy backend
else
    dfx deploy backend --network "$NETWORK"
fi
echo -e "${GREEN}✓ Backend deployed${NC}"
echo ""

# Step 4: Install frontend dependencies
echo -e "${YELLOW}Step 4: Installing frontend dependencies...${NC}"
cd frontend
pnpm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 5: Build frontend
echo -e "${YELLOW}Step 5: Building frontend...${NC}"
pnpm run build:skip-bindings
echo -e "${GREEN}✓ Frontend built${NC}"
echo ""

# Step 6: Deploy frontend
cd ..
echo -e "${YELLOW}Step 6: Deploying frontend canister...${NC}"
if [ "$NETWORK" = "local" ]; then
    dfx deploy frontend
else
    dfx deploy frontend --network "$NETWORK"
fi
echo -e "${GREEN}✓ Frontend deployed${NC}"
echo ""

# Step 7: Display URLs
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

if [ "$NETWORK" = "local" ]; then
    FRONTEND_ID=$(dfx canister id frontend)
    echo -e "${GREEN}Local Development URL:${NC}"
    echo -e "  http://localhost:4943/?canisterId=${FRONTEND_ID}"
    echo ""
    echo -e "${YELLOW}Note: This is a local deployment. To deploy to mainnet, run:${NC}"
    echo -e "  $0 mainnet"
else
    FRONTEND_ID=$(dfx canister id frontend --network "$NETWORK")
    echo -e "${GREEN}Production URL:${NC}"
    echo -e "  https://${FRONTEND_ID}.ic0.app"
    echo ""
    echo -e "${GREEN}Alternative URL:${NC}"
    echo -e "  https://${FRONTEND_ID}.raw.ic0.app"
    echo ""
    echo -e "${YELLOW}Canister IDs:${NC}"
    echo -e "  Frontend: ${FRONTEND_ID}"
    BACKEND_ID=$(dfx canister id backend --network "$NETWORK")
    echo -e "  Backend:  ${BACKEND_ID}"
    echo ""
    echo -e "${YELLOW}To check canister status:${NC}"
    echo -e "  dfx canister status frontend --network ${NETWORK}"
fi

echo ""
echo -e "${GREEN}✓ Deployment successful!${NC}"
