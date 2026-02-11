#!/bin/bash

# Automatic fix script for removing node_modules from Git history

cd /Users/user/work/valentine-s-day

echo "========================================="
echo "Fixing Git Repository"
echo "========================================="
echo ""

# Step 1: Reset to origin/main (soft reset keeps changes)
echo "Step 1: Resetting to origin/main..."
git reset --soft origin/main
if [ $? -eq 0 ]; then
    echo "✓ Reset successful"
else
    echo "✗ Reset failed or already at origin/main"
fi
echo ""

# Step 2: Remove node_modules from Git cache
echo "Step 2: Removing node_modules from Git index..."
git rm -r --cached node_modules/ 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✓ node_modules removed from index"
else
    echo "✓ node_modules not in index (already clean)"
fi
echo ""

# Step 3: Add all files (node_modules will be ignored by .gitignore)
echo "Step 3: Adding files..."
git add .
echo "✓ Files staged"
echo ""

# Step 4: Check what's staged
echo "Step 4: Checking staged files..."
echo "Total files staged:"
git diff --cached --name-only | wc -l
echo ""
echo "Checking for node_modules (should be 0):"
git diff --cached --name-only | grep "node_modules/" | wc -l
echo ""

# Step 5: Commit
echo "Step 5: Creating commit..."
git commit -m "Initial commit - Valentine's Day project"
if [ $? -eq 0 ]; then
    echo "✓ Commit created"
else
    echo "✗ Commit failed (maybe nothing to commit?)"
fi
echo ""

# Step 6: Show status
echo "Step 6: Current status..."
git status
echo ""

echo "========================================="
echo "Done! Now run: git push"
echo "========================================="

