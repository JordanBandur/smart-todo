

\i 01_users.sql
\i 02_categories.sql
\i 03_todos.sql
\i 05_widgets.sql

--> this allows us to automatically run all seed scripts from the command line/terminal by navigating to the "seeds" directory and typing: "psql -d smart_todo -f seed_all.sql"
--> if there is duplicate info, tables can be reset using "TRUNCATE TABLE users, categories, todos, widgets RESTART IDENTITY;" in psql
