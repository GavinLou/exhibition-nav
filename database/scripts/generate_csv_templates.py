#!/usr/bin/env python3
"""
生成資料庫所有表的 CSV 模板檔案
每個 CSV 的第一行是欄位名稱
"""

import psycopg2
import csv
import os

# 資料庫連接參數
DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'database': 'bmc_navigation',
    'user': 'GavinLou',
    'password': 'GavinLou'
}

# CSV 輸出目錄
OUTPUT_DIR = '../data'

def get_table_columns(cursor, table_name):
    """獲取表的所有欄位名稱"""
    query = """
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = %s
        ORDER BY ordinal_position;
    """
    cursor.execute(query, (table_name,))
    return cursor.fetchall()

def get_all_tables(cursor):
    """獲取所有表名"""
    query = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
    """
    cursor.execute(query)
    return [row[0] for row in cursor.fetchall()]

def generate_csv_template(table_name, columns, output_dir):
    """為單個表生成 CSV 模板"""
    csv_path = os.path.join(output_dir, f'{table_name}.csv')

    # 只取欄位名稱
    column_names = [col[0] for col in columns]

    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # 寫入欄位名稱作為第一行
        writer.writerow(column_names)
        # 寫入一行範例（空值或提示）
        example_row = []
        for col_name, data_type, is_nullable in columns:
            if 'uuid' in data_type.lower() or col_name == 'id':
                example_row.append('UUID (e.g., a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11)')
            elif 'timestamp' in data_type.lower() or 'date' in data_type.lower():
                example_row.append('YYYY-MM-DD HH:MM:SS or YYYY-MM-DD')
            elif 'boolean' in data_type.lower():
                example_row.append('true/false')
            elif 'integer' in data_type.lower():
                example_row.append('0')
            elif 'geometry' in data_type.lower():
                example_row.append('POINT(120.4407 22.7543) or LINESTRING(...)')
            else:
                example_row.append('')
        writer.writerow(example_row)

    print(f'✓ Created: {csv_path}')
    return csv_path

def main():
    # 確保輸出目錄存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    try:
        # 連接資料庫
        conn = psycopg2.connect(**DB_CONFIG)
        cursor = conn.cursor()

        print('Connecting to database...')
        print(f'Output directory: {os.path.abspath(OUTPUT_DIR)}\n')

        # 獲取所有表
        tables = get_all_tables(cursor)
        print(f'Found {len(tables)} tables\n')

        # 為每個表生成 CSV 模板
        for table in tables:
            columns = get_table_columns(cursor, table)
            if columns:
                generate_csv_template(table, columns, OUTPUT_DIR)

        print(f'\n✓ All CSV templates generated in {os.path.abspath(OUTPUT_DIR)}')

    except Exception as e:
        print(f'✗ Error: {e}')
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == '__main__':
    main()
