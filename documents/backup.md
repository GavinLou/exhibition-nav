# 备份整个数据库
docker exec bmc_gis_db pg_dump -U GavinLou bmc_navigation > backup_full.sql
docker exec bmc_gis_db pg_dump -U GavinLou bmc_navigation > backup_$(date +%Y%m%d).sql
# 恢复时
docker exec -i bmc_gis_db psql -U GavinLou -d bmc_navigation < backup_full.sql