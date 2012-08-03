INSERT INTO "tmuser" (name,username,password) VALUES ('test1', 'test1', '1');
INSERT INTO "tmuser" (name,username,password) VALUES ('test2', 'test2', '1');
INSERT INTO "tmuser" (name,username,password) VALUES ('test3', 'test3', '1');



INSERT INTO "project" (name,description,createdBy_id) VALUES ( 'project1', 'desc1', '1');
INSERT INTO "project" (name,description,createdBy_id) VALUES ( 'project2', 'desc2', '1');


INSERT INTO "task" (name,description,state,createdBy_id,project_id,assignee_id) VALUES ('task1', 'd', 'New',  1, 1, 1);


INSERT INTO "project_user" VALUES ('1', '1');