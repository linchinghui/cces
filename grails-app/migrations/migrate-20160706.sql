
#--- 變更 project-type
SET SQL_SAFE_UPDATES = 0;

update cces.project
set type = (case note
			when '委外' then 'ORI'
			when '包月試作' then 'MON'
			when '攬工' then 'SOL'
			when '點工' then 'HOU'
			else 'OTH' # '其他'
			end)
where type is null;
