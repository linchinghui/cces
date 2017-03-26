
SET SQL_SAFE_UPDATES = 0;

update cces.sp_task set construct_code = construct_type where construct_code is null;
update cces.function set description = '人員配置-派工' where name = 'assignment';
update cces.function set aided = 1 where name = 'vehiclebrand';
update cces.function set aided = 0 where aided is null;
