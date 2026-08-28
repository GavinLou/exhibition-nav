#!/bin/bash
# 生成所有表的 CSV 模板

OUTPUT_DIR="../data"
mkdir -p "$OUTPUT_DIR"

echo "Generating CSV templates..."
echo "Output directory: $(cd "$OUTPUT_DIR" && pwd)"
echo ""

# 獲取所有表名
TABLES=$(docker-compose -f ../../docker-compose.yml exec -T db psql -U GavinLou -d bmc_navigation -t -c "
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE'
ORDER BY table_name;
" | tr -d ' ' | grep -v '^$')

COUNT=0
for TABLE in $TABLES; do
    # 獲取表的欄位
    COLUMNS=$(docker-compose -f ../../docker-compose.yml exec -T db psql -U GavinLou -d bmc_navigation -t -c "
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = '$TABLE'
    ORDER BY ordinal_position;
    " | tr -d ' ' | grep -v '^$' | paste -sd ',' -)

    # 創建 CSV 檔案
    CSV_FILE="$OUTPUT_DIR/${TABLE}.csv"
    echo "$COLUMNS" > "$CSV_FILE"

    echo "✓ Created: $CSV_FILE"
    COUNT=$((COUNT + 1))
done

echo ""
echo "✓ Generated $COUNT CSV templates in $(cd "$OUTPUT_DIR" && pwd)"
