## 匯入備份檔案
cat database/backup/data_backup_20260905_185412.sql | docker exec -i bmc_gis_db psql -U GavinLou -d bmc_navigation -v ON_ERROR_STOP=0