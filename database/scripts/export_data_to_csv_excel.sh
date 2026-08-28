#!/bin/bash
# 導出資料庫資料到 CSV（Excel 可正確開啟，含 UTF-8 BOM）

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

echo "Exporting data to CSV (Excel compatible with UTF-8 BOM)..."
echo "Output directory: $(cd "$OUTPUT_DIR" && pwd)"
echo ""

for TABLE in "${TABLES[@]}"; do
    echo "Exporting $TABLE..."

    # 使用 docker exec 執行 psql，直接輸出到本地檔案
    TEMP_FILE="${OUTPUT_DIR}/${TABLE}_temp.csv"
    FINAL_FILE="${OUTPUT_DIR}/${TABLE}.csv"

    docker-compose -f ../../docker-compose.yml exec -T db psql -U GavinLou -d bmc_navigation -c "\COPY \"$TABLE\" TO STDOUT WITH CSV HEADER" > "$TEMP_FILE"

    # 添加 UTF-8 BOM 到檔案開頭
    # UTF-8 BOM: EF BB BF
    printf '\xEF\xBB\xBF' > "$FINAL_FILE"
    cat "$TEMP_FILE" >> "$FINAL_FILE"
    rm "$TEMP_FILE"

    if [ -f "$FINAL_FILE" ]; then
        ROW_COUNT=$(wc -l < "$FINAL_FILE")
        DATA_ROWS=$((ROW_COUNT - 1))
        echo "✓ Exported: ${TABLE}.csv ($DATA_ROWS rows) [Excel compatible]"
    else
        echo "✗ Failed to export $TABLE"
    fi
done

echo ""
echo "✓ All data exported to $(cd "$OUTPUT_DIR" && pwd)/"
echo "✓ CSV files can now be opened directly in Excel with correct encoding!"
