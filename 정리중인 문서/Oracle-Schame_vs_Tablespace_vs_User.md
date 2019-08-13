[StackExchange - Difference between database vs user vs schema](<https://dba.stackexchange.com/questions/37012/difference-between-database-vs-user-vs-schema?answertab=votes#tab-top>)

- **User is the account** for connecting to a database.
- **Schema is the set of objects that belong to that account.**

[Stackoverflow - Difference between a user and a schema in Oracle?](<https://stackoverflow.com/questions/880230/difference-between-a-user-and-a-schema-in-oracle>)

- Schema is the user account and collection of all objects therein as a schema for all intents and purposes.

[Answers - Difference between user and schema oracle?](<https://www.answers.com/Q/Difference_between_user_and_schema_oracle>)

- Oracle automatically create a schema when a user is created.
- Oracle stores all objects created by the user in the schema.
- `USERNAME` in `SELECT * FROM USERNAME.TABLE_NAME` is a schema.

[Stackoverflow - A database schema vs database tablespace?](<https://stackoverflow.com/questions/35120219/a-database-schema-vs-a-database-tablespace>)

- A schema is used to organize the names of database objects.
- **A tablespace is a physical container for data.**
- A single object could be spread across multiple tablespaces, but it can only be defined in a single schema. Because of different schema, `A.TABLE_A` couldn't be same as `B.TABLE_A`.
