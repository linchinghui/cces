
SET SQL_SAFE_UPDATES = 0;

update cces.sp_task set construct_code = construct_type where construct_code is null;
