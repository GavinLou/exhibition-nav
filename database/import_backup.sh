#!/bin/bash
# 导入备份 SQL 文件（处理外键约束问题）

set -e

if [ -z "$1" ]; then
    echo "使用方法: $0 <backup.sql>"
    echo "例如: $0 database/backup/data_backup_20260905_185412.sql"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ 错误：文件不存在: $BACKUP_FILE"
    exit 1
fi

echo "📥 准备导入备份: $BACKUP_FILE"
echo ""

# 方案 A: 使用 psql 导入（推荐）
echo "🔧 方法 1: 使用 psql 导入（自动处理约束）"
echo ""
docker exec -i bmc_gis_db psql -U GavinLou -d bmc_navigation << EOF
-- 临时禁用所有触发器（包括外键约束）
SET session_replication_role = 'replica';

-- 导入数据
\i /docker-entrypoint-initdb.d/backup/$(basename $BACKUP_FILE)

-- 重新启用触发器
SET session_replication_role = 'origin';

-- 验证数据
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 10;
EOF

echo ""
echo "✅ 导入完成！"
