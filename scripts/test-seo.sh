#!/bin/bash

# SEO Testing Script for Piano Studio
# This script helps you test your SEO more rigorously than Lighthouse

echo "🎹 SEO Testing Script for Piano Studio"
echo "========================================"
echo ""

DOMAIN="https://sanjosepianolesson.com"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "1. Testing Core Pages Accessibility"
echo "-----------------------------------"
pages=(
  "/en"
  "/zh"
  "/en/trial"
  "/en/about"
  "/en/contact"
)

for page in "${pages[@]}"; do
  url="${DOMAIN}${page}"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
  if [ "$status" = "200" ]; then
    echo -e "${GREEN}✓${NC} $url - Status: $status"
  else
    echo -e "${RED}✗${NC} $url - Status: $status"
  fi
done

echo ""
echo "2. Testing Robots.txt"
echo "-------------------"
robots_url="${DOMAIN}/robots.txt"
if curl -s "$robots_url" | grep -q "User-agent"; then
  echo -e "${GREEN}✓${NC} robots.txt exists and is accessible"
else
  echo -e "${RED}✗${NC} robots.txt not found or invalid"
fi

echo ""
echo "3. Testing Sitemap"
echo "----------------"
sitemap_url="${DOMAIN}/sitemap.xml"
if curl -s "$sitemap_url" | grep -q "urlset"; then
  echo -e "${GREEN}✓${NC} sitemap.xml exists and is accessible"
  url_count=$(curl -s "$sitemap_url" | grep -c "<url>")
  echo "   Found $url_count URLs in sitemap"
else
  echo -e "${RED}✗${NC} sitemap.xml not found or invalid"
fi

echo ""
echo "4. Testing Meta Tags"
echo "------------------"
test_meta() {
  url="$1"
  title=$(curl -s "$url" | grep -oP '(?<=<title>).*?(?=</title>)' | head -1)
  description=$(curl -s "$url" | grep -oP '(?<=<meta name="description" content=").*?(?=")' | head -1)
  
  if [ -n "$title" ]; then
    title_len=${#title}
    if [ $title_len -ge 30 ] && [ $title_len -le 60 ]; then
      echo -e "${GREEN}✓${NC} Title: $title (${title_len} chars)"
    else
      echo -e "${YELLOW}⚠${NC} Title: $title (${title_len} chars - should be 30-60)"
    fi
  else
    echo -e "${RED}✗${NC} No title tag found"
  fi
  
  if [ -n "$description" ]; then
    desc_len=${#description}
    if [ $desc_len -ge 120 ] && [ $desc_len -le 160 ]; then
      echo -e "${GREEN}✓${NC} Description: $description (${desc_len} chars)"
    else
      echo -e "${YELLOW}⚠${NC} Description: $description (${desc_len} chars - should be 120-160)"
    fi
  else
    echo -e "${RED}✗${NC} No meta description found"
  fi
}

test_meta "${DOMAIN}/en"

echo ""
echo "5. Testing Structured Data"
echo "------------------------"
schema_check=$(curl -s "${DOMAIN}/en" | grep -o "application/ld\+json" | wc -l)
if [ $schema_check -gt 0 ]; then
  echo -e "${GREEN}✓${NC} Found $schema_check JSON-LD schema blocks"
else
  echo -e "${RED}✗${NC} No structured data found"
fi

echo ""
echo "6. Testing Mobile-Friendliness"
echo "----------------------------"
echo "   Visit: https://search.google.com/test/mobile-friendly?url=${DOMAIN}/en"
echo "   (Manual check required)"

echo ""
echo "7. Testing Page Speed"
echo "-------------------"
echo "   Visit: https://pagespeed.web.dev/analysis?url=${DOMAIN}/en"
echo "   (Manual check required)"

echo ""
echo "8. Testing Rich Results"
echo "--------------------"
echo "   Visit: https://search.google.com/test/rich-results?url=${DOMAIN}/en"
echo "   (Manual check required)"

echo ""
echo "9. Manual Search Tests (Do in Incognito Mode)"
echo "---------------------------------------------"
echo "   Search these queries and note your position:"
echo "   - 'piano lessons san jose'"
echo "   - 'piano teacher san jose'"
echo "   - 'piano lessons for adult beginner'"
echo "   - 'free trial piano lesson'"
echo "   - 'best piano teacher south bay'"
echo "   - 'piano lessons near me' (from San Jose location)"

echo ""
echo "10. Google Search Console Check"
echo "-------------------------------"
echo "   If you have GSC set up, check:"
echo "   - Top search queries"
echo "   - Average position"
echo "   - Click-through rate"
echo "   - Impressions vs. clicks"

echo ""
echo "========================================"
echo "✅ Basic technical checks complete!"
echo ""
echo "📊 For deeper analysis, use:"
echo "   - Google Search Console (free)"
echo "   - Google Analytics (free)"
echo "   - SEMrush/Ahrefs (paid, but powerful)"
echo "   - BrightLocal (local SEO focus)"
echo ""
echo "🎯 Remember: Lighthouse SEO = basic technical check"
echo "   Real SEO = rankings, traffic, conversions"
