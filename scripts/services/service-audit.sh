#!/bin/bash

# Service Audit Script
# This script analyzes the Knowledge Constellation system to verify
# it adheres to the constraints defined in project-constraints.md

echo "==================================================="
echo "KNOWLEDGE CONSTELLATION SERVICE AUDIT"
echo "==================================================="
echo "Running comprehensive audit of services and components..."
echo

# Check for running services
echo "ACTIVE SERVICES CHECK"
echo "---------------------------------------------------"
echo "Checking for running services on known ports..."

check_port() {
    local port=$1
    local name=$2
    local expected=$3
    
    # Check if port is in use
    nc -z localhost $port > /dev/null 2>&1
    local status=$?
    
    if [ $status -eq 0 ]; then
        if [ "$expected" == "yes" ]; then
            echo "✓ $name (Port $port): RUNNING (EXPECTED)"
        else
            echo "✗ $name (Port $port): RUNNING (UNEXPECTED) - CONSTRAINT VIOLATION"
        fi
    else
        if [ "$expected" == "yes" ]; then
            echo "✗ $name (Port $port): NOT RUNNING (EXPECTED TO BE RUNNING)"
        else
            echo "✓ $name (Port $port): NOT RUNNING (EXPECTED)"
        fi
    fi
}

# Check known ports
check_port 3001 "Content Management Backend" "no"
check_port 3002 "Content Management Frontend" "no"
check_port 3003 "Constellation Viewer" "yes"
check_port 4000 "Relationship API" "no"
check_port 8081 "3D Visualization" "no"
check_port 9001 "Unified Interface" "no"
check_port 9003 "Constellation Frontend" "no"

echo

# Check for expected endpoints
echo "ENDPOINT AVAILABILITY CHECK"
echo "---------------------------------------------------"
echo "Checking if required endpoints are accessible..."

check_endpoint() {
    local url=$1
    local name=$2
    local expected=$3
    
    # Check if endpoint returns a 200 OK
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" $url)
    
    if [ "$status_code" == "200" ]; then
        if [ "$expected" == "yes" ]; then
            echo "✓ $name ($url): ACCESSIBLE (EXPECTED)"
        else
            echo "✗ $name ($url): ACCESSIBLE (UNEXPECTED) - CONSTRAINT VIOLATION"
        fi
    else
        if [ "$expected" == "yes" ]; then
            echo "✗ $name ($url): NOT ACCESSIBLE (EXPECTED TO BE ACCESSIBLE) - Status: $status_code"
        else
            echo "✓ $name ($url): NOT ACCESSIBLE (EXPECTED)"
        fi
    fi
}

# Check expected endpoints
check_endpoint "http://localhost:3003/" "Constellation Viewer Root" "yes"
check_endpoint "http://localhost:3003/enhanced" "Enhanced Wiki" "yes"
check_endpoint "http://localhost:3003/simple" "Notebook Browser" "yes"
check_endpoint "http://localhost:3003/pages/Unified%20Interface" "Unified Interface" "yes"

# Check unexpected endpoints
check_endpoint "http://localhost:3003/relationships" "Relationship Visualization" "no"
check_endpoint "http://localhost:3003/unified" "Direct Unified Interface" "no"
check_endpoint "http://localhost:3003/visualizations" "Visualizations" "no"

echo

# Check data files
echo "DATA FILES CHECK"
echo "---------------------------------------------------"
echo "Checking if data files exist and are properly structured..."

check_file() {
    local path=$1
    local name=$2
    local required=$3
    
    if [ -f "$path" ]; then
        if [ "$required" == "yes" ]; then
            echo "✓ $name: EXISTS (EXPECTED)"
            
            # Check file size
            local size=$(du -h "$path" | cut -f1)
            echo "  - Size: $size"
            
            # Check if JSON is valid
            if [[ "$path" == *.json ]]; then
                jq empty "$path" > /dev/null 2>&1
                if [ $? -eq 0 ]; then
                    echo "  - Valid JSON: YES"
                    
                    # Check number of entries
                    if [[ "$path" == *"wikiEntries.json" ]]; then
                        local entries=$(jq '.entries | length' "$path")
                        echo "  - Wiki Entries: $entries"
                    elif [[ "$path" == *"relationships.json" ]]; then
                        local nodes=$(jq '.nodes | length' "$path")
                        local links=$(jq '.links | length' "$path")
                        echo "  - Nodes: $nodes"
                        echo "  - Links: $links"
                    fi
                else
                    echo "  - Valid JSON: NO"
                fi
            fi
        else
            echo "✗ $name: EXISTS (UNEXPECTED) - CONSTRAINT VIOLATION"
        fi
    else
        if [ "$required" == "yes" ]; then
            echo "✗ $name: MISSING (REQUIRED)"
        else
            echo "✓ $name: MISSING (EXPECTED)"
        fi
    fi
}

# Check required and unexpected files
check_file "/home/user/Repository/WebProjects/Constellation-Viewer/backend/wikiEntries.json" "Wiki Entries" "yes"
check_file "/home/user/Repository/WebProjects/Constellation-Viewer/backend/relationships.json" "Relationships" "yes"
check_file "/home/user/Repository/WebProjects/Constellation-Viewer/backend/config.js" "Config" "yes"

echo

# Check notebooks directory
echo "NOTEBOOKS CHECK"
echo "---------------------------------------------------"
echo "Checking notebooks directory..."

if [ -d "/home/user/Notebooks" ]; then
    echo "✓ Notebooks directory exists"
    
    # Count notebooks
    notebook_dirs=$(find /home/user/Notebooks -maxdepth 1 -type d | wc -l)
    # Subtract 1 for the directory itself
    notebook_dirs=$((notebook_dirs - 1))
    
    echo "  - Notebook directories: $notebook_dirs"
    
    notebook_files=$(find /home/user/Notebooks -type f -name "*.txt" | wc -l)
    echo "  - Notebook files: $notebook_files"
else
    echo "✗ Notebooks directory missing"
fi

echo

# Summary
echo "CONSTRAINT ANALYSIS"
echo "---------------------------------------------------"
echo "Checking for constraint violations..."

# Count active ports to check for single-service constraint
active_ports=$(netstat -tuln 2>/dev/null | grep -E ':(3001|3002|3003|4000|8081|9001|9003)' | wc -l)

if [ $active_ports -eq 1 ]; then
    echo "✓ Single service constraint: MAINTAINED"
else
    echo "✗ Single service constraint: VIOLATED ($active_ports services running)"
fi

# Check for interface proliferation
echo

# Final summary
echo "==================================================="
echo "AUDIT COMPLETE"
echo "==================================================="
echo "This audit helps ensure the Knowledge Constellation"
echo "project adheres to its defined constraints."
echo
echo "To maintain project boundaries:"
echo "1. Review the project-constraints.md document"
echo "2. Run this audit script before accepting new features"
echo "3. Follow the one-in-one-out rule for new components"
echo "==================================================="