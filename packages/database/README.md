# modos-website-geodb

## INSTALL
The following suppose you have PostgreSQL (min version: 10) installed and 
configured.

Create a PostgreSQL DB user "YOUR_DB_USER" and grant him the following:
"Superuser, Create role, Create DB"

Download the latest dump file of the database named "dump.backup".
This can be found in folder "{SWITCH_ROOT}/WP4/SPATIAL_DB/DUMPS/".

Place this file in a "DUMPS/" subfolder.

Set the following (development) environment variables in a ".env" file:

ENV=DEV
DB_USER_DEV=YOUR_DB_USER
DB_NAME_NEW_DEV=YOUR_DB_USER
DB_SERVICE_RESTORE_DEV=YOUR_DB_SERVICE (defined in file ~/.pg_service.conf)
DB_DUMP_FILE_SQL_DEV=PATH_TO_THE_SQL_DUMP_FILE (only if you do not use pg_restore)
DB_DUMP_FILE_DEV=PATH_TO_THE_BACKUP_DUMP_FILE (to be used with pg_restore)

Set your password in the "~/.pgpass" file or provide it at login. This *may*
require modifiying the bash script.

Finally, run the script "00_restore_modos_db.sh".





