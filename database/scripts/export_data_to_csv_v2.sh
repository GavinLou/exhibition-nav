#!/bin/bash
# 導出資料庫中有資料的表到 CSV（使用 psql）

cd "$(dirname "$0")"
OUTPUT_DIR="../data"

# 需要導出的表
TABLES=(
    "Base_Location"
    "Attractions"
    "Attractions_Translations"
    "Visiter"
    "Recommended_Itinerary_Group"
    "Recommended_Itinerary_Item"
    "Recommended_Itinerary_Translations"
)

echo "Exporting data to CSV..."
echo "Output directory: $(cd "$OUTPUT_DIR" && pwd)"
echo ""

for TABLE in "${TABLES[@]}"; do
    echo "Exporting $TABLE..."

    # 使用 docker exec 執行 psql，直接輸出到本地檔案
    docker-compose -f ../../docker-compose.yml exec -T db psql -U GavinLou -d bmc_navigation -c "\COPY \"$TABLE\" TO STDOUT WITH CSV HEADER" > "$OUTPUT_DIR/${TABLE}.csv"

    if [ -f "$OUTPUT_DIR/${TABLE}.csv" ]; then
        ROW_COUNT=$(wc -l < "$OUTPUT_DIR/${TABLE}.csv")
        DATA_ROWS=$((ROW_COUNT - 1))
        echo "✓ Exported: ${TABLE}.csv ($DATA_ROWS rows)"
    else
        echo "✗ Failed to export $TABLE"
    fi
done

echo ""
echo "✓ All data exported to $(cd "$OUTPUT_DIR" && pwd)/"
