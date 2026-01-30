#!/bin/bash
# Script to reorganize SEO audit files into docs/seo-audit/

set -e

echo "Creating directory structure..."
mkdir -p docs/seo-audit/deliverables
mkdir -p docs/seo-audit/assessments

echo "Moving main audit files..."
git mv seo-audit-executive-summary.md docs/seo-audit/executive-summary.md
git mv seo-health-score.md docs/seo-audit/health-score.md
git mv seo-audit-report.md docs/seo-audit/full-report.md

echo "Moving deliverables..."
git mv keyword-strategy.md docs/seo-audit/deliverables/
git mv content-calendar.md docs/seo-audit/deliverables/
git mv link-building-strategy.md docs/seo-audit/deliverables/

echo "Moving assessment files..."
for i in {01..23}; do
    if [ -f "claudedocs/${i}-"*.md ]; then
        git mv claudedocs/${i}-*.md docs/seo-audit/assessments/
    fi
done

echo "Removing temporary .gitkeep files..."
rm -f docs/seo-audit/.gitkeep
rm -f docs/seo-audit/deliverables/.gitkeep
rm -f docs/seo-audit/assessments/.gitkeep

echo "Done! Files reorganized into docs/seo-audit/"
echo ""
echo "Next steps:"
echo "1. Review the changes with: git status"
echo "2. Commit: git commit -m 'docs: reorganize SEO audit files into docs/seo-audit/'"
echo "3. Run this script to clean up: rm reorganize-seo-audit.sh"
