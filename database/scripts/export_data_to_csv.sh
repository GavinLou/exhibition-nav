#!/bin/bash
# 導出資料庫中有資料的表到 CSV

OUTPUT_DIR="../data"
TEMP_DIR="/tmp/db_export"

# 需要導出的表（有資料的表）
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

# 在容器內創建臨時目錄
docker-compose -f ../../docker-compose.yml exec -T db mkdir -p "$TEMP_DIR"

for TABLE in "${TABLES[@]}"; do
    echo "Exporting $TABLE..."

    # 使用 COPY 命令導出 CSV（包含欄位名稱）
    docker-compose -f ../../docker-compose.yml exec -T db psql -U GavinLou -d bmc_navigation -c "
    COPY (SELECT * FROM \"$TABLE\") TO '$TEMP_DIR/${TABLE}.csv' WITH CSV HEADER;
    "

    # 從容器複製到本地
    docker cp exhibition-nav-db-1:$TEMP_DIR/${TABLE}.csv $OUTPUT_DIR/${TABLE}.csv

    if [ -f "$OUTPUT_DIR/${TABLE}.csv" ]; then
        ROW_COUNT=$(wc -l < "$OUTPUT_DIR/${TABLE}.csv")
        echo "✓ Exported: $OUTPUT_DIR/${TABLE}.csv ($((ROW_COUNT - 1)) rows)"
    else
        echo "✗ Failed to export $TABLE"
    fi
    echo ""
done

echo "✓ All data exported!"
