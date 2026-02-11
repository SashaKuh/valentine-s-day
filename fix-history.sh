#!/bin/bash

echo "=== Fixing Git History - Removing node_modules ==="

# Check how many commits ahead
echo "Current status:"
git status | head -5

echo ""
echo "Checking what's being tracked..."
git ls-files | grep "node_modules/" | head -10

echo ""
echo "=== Solution: Reset to remote and recommit without node_modules ==="
echo ""
echo "Steps to execute manually:"
echo "1. git reset --soft origin/main"
echo "2. git rm -r --cached node_modules/ (if present)"
echo "3. git add ."
echo "4. git commit -m 'Initial commit without node_modules'"
echo "5. git push"
echo ""
read -p "Do you want to execute this now? (yes/no): " answer

if [ "$answer" = "yes" ]; then
    echo "Resetting to origin/main (keeping changes)..."
    git reset --soft origin/main

    echo "Removing node_modules from git cache..."
    git rm -r --cached node_modules/ 2>/dev/null || echo "node_modules not tracked"

    echo "Adding all files (node_modules will be ignored)..."
    git add .

    echo "Creating new commit..."
    git commit -m "Initial commit - Valentine's Day project"

    echo ""
    echo "=== Done! Now try: git push ==="
    git status
else
    echo "Cancelled. Run the commands manually when ready."
fi

