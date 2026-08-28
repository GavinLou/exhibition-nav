#!/usr/bin/env python3
"""
CSV 轉 SQL INSERT 語句工具
選擇一個 CSV 檔案，自動生成 SQL INSERT 語句並儲存為 TXT
"""

import csv
import sys
import os
from pathlib import Path
import uuid
from datetime import datetime

def is_uuid(value):
    """檢查是否為 UUID"""
    try:
        uuid.UUID(value)
        return True
    except:
        return False

def is_number(value):
    """檢查是否為數字"""
    try:
        float(value)
        return True
    except:
        return False

def is_boolean(value):
    """檢查是否為布林值"""
    return value.lower() in ('true', 'false', 't', 'f', '1', '0')

def format_value(value, column_name=''):
    """格式化 SQL 值"""
    # 空值
    if value == '' or value.lower() == 'null':
        return 'NULL'

    # 布林值
    if is_boolean(value):
        return 'TRUE' if value.lower() in ('true', 't', '1') else 'FALSE'

    # UUID
    if is_uuid(value):
        return f"'{value}'"

    # 數字（整數或浮點數）
    if is_number(value):
        return value

    # POINT geometry
    if value.startswith('POINT('):
        return f"ST_GeomFromText('{value}', 4326)"

    # LINESTRING geometry
    if value.startswith('LINESTRING('):
        return f"ST_GeomFromText('{value}', 4326)"

    # 字串（需要轉義單引號）
    escaped_value = value.replace("'", "''")
    return f"'{escaped_value}'"

def generate_insert_sql(csv_path):
    """從 CSV 生成 INSERT SQL 語句"""
    # 取得表名（從檔案名）
    table_name = Path(csv_path).stem

    # 讀取 CSV（自動處理 UTF-8 BOM）
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)

        # 第一行是欄位名稱
        columns = next(reader)

        # 生成 SQL 語句
        sql_statements = []
        sql_statements.append(f'-- INSERT statements for table: {table_name}')
        sql_statements.append(f'-- Generated from: {os.path.basename(csv_path)}')
        sql_statements.append(f'-- Generated at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
        sql_statements.append('')

        row_count = 0
        for row in reader:
            # 跳過空行和範例行
            if not row or all(not cell.strip() for cell in row):
                continue

            # 跳過包含提示文字的範例行
            if any('e.g.' in str(cell) for cell in row):
                continue

            # 確保欄位數量匹配
            if len(row) != len(columns):
                print(f'Warning: Row has {len(row)} values but table has {len(columns)} columns. Skipping.')
                continue

            # 生成 VALUES
            values = [format_value(cell, col) for cell, col in zip(row, columns)]
            values_str = ', '.join(values)

            # 生成 INSERT 語句
            columns_str = ', '.join([f'"{col}"' for col in columns])
            insert_sql = f'INSERT INTO "{table_name}" ({columns_str}) VALUES ({values_str});'
            sql_statements.append(insert_sql)
            row_count += 1

        sql_statements.append('')
        sql_statements.append(f'-- Total: {row_count} rows')

    return '\n'.join(sql_statements), row_count

def main():
    print('=== CSV to SQL INSERT Generator ===\n')

    # 如果沒有提供檔案參數，列出可用的 CSV 檔案
    if len(sys.argv) < 2:
        data_dir = '../data'
        if os.path.exists(data_dir):
            csv_files = sorted([f for f in os.listdir(data_dir) if f.endswith('.csv')])
            if csv_files:
                print(f'Available CSV files in {data_dir}:')
                for i, file in enumerate(csv_files, 1):
                    print(f'  {i}. {file}')
                print(f'\nUsage: python {sys.argv[0]} <csv_file>')
                print(f'Example: python {sys.argv[0]} {data_dir}/Visiter.csv')
            else:
                print(f'No CSV files found in {data_dir}')
                print('Run generate_csv_templates.py first to create templates.')
        else:
            print(f'Data directory {data_dir} not found.')
            print('Run generate_csv_templates.py first to create templates.')
        return

    # 取得 CSV 檔案路徑
    csv_path = sys.argv[1]

    if not os.path.exists(csv_path):
        print(f'Error: File not found: {csv_path}')
        return

    # 生成 SQL
    try:
        print(f'Reading: {csv_path}')
        sql_content, row_count = generate_insert_sql(csv_path)

        # 儲存為 TXT
        output_path = csv_path.replace('.csv', '_insert.sql')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(sql_content)

        print(f'✓ Generated {row_count} INSERT statements')
        print(f'✓ Output: {output_path}')
        print(f'\nYou can now copy the SQL from {output_path} and paste it into your database.')

    except Exception as e:
        print(f'✗ Error: {e}')
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
