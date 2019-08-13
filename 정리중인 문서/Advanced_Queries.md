### (MySQL) multiple rows to one column: [can-i-concatenate-multiple-mysql-rows-into-one-field](https://stackoverflow.com/questions/276927/can-i-concatenate-multiple-mysql-rows-into-one-field)

```sql
GROUP_CONCAT([DISTINCT] expr [,expr ...]
             [ORDER BY {unsigned_integer | col_name | expr}
                 [ASC | DESC] [,col_name ...]]
             [SEPARATOR str_val])
```

To create column for multiple paths of attached files.
