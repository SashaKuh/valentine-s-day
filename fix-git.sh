#!/bin/bash

# Script to fix Git repository by removing node_modules

echo "=== Fixing Git Repository ==="

# Step 1: Remove node_modules from Git cache
echo "Step 1: Removing node_modules from Git index..."
git rm -r --cached node_modules/ 2>&1 || echo "node_modules not in index or already removed"

# Step 2: Commit the change
echo "Step 2: Committing the removal..."
git add .gitignore
git commit -m "Remove node_modules from Git tracking"

# Step 3: Show status
echo "Step 3: Current status:"
git status

echo ""
echo "=== Done! Now you can try: git push ==="

