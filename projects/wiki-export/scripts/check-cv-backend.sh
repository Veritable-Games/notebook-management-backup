#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Checking CV-Backend on port 3004...${NC}"

# Check if the service is running
response=$(curl -s http://localhost:3004/api)

if [[ $response == *"CV-Backend API is working"* ]]; then
  echo -e "${GREEN}✅ CV-Backend is running successfully!${NC}"
  echo "Response: $response"
else
  echo -e "${RED}❌ CV-Backend is not responding properly.${NC}"
  echo "Response: $response"
fi