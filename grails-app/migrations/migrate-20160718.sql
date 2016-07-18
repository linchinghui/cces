
SET SQL_SAFE_UPDATES = 0;

update cces.function set description = '公告' where name='announcement';
update cces.function set description = '材料表-供應商', aided=1 where name='supplier';
update cces.function set description = '材料表-類別', aided=1 where name='materialCategory';
update cces.function set aided=1 where name='materialSupplier';
