
-- ****************************************************************************

CREATE SCHEMA tm;

-- ............................................................................

GRANT USAGE ON SCHEMA tm to tm;

-- ............................................................................

SET search_path TO tm;

-- ****************************************************************************

-- ............................................................................


CREATE TABLE tmuser
(
  	id                          bigserial NOT NULL,
  	name                        character varying(255) NOT NULL UNIQUE,
  	username					 character varying(255),
 	 password                      character varying(255),
  
  	createdby_id               	bigint,
    created_date              	timestamp without time zone,
    updatedby_id              	bigint,
    updated_date           		timestamp without time zone,
  
  CONSTRAINT user_pkey PRIMARY KEY (id),
  CONSTRAINT "FK_USER_CREATEID" FOREIGN KEY ("createdby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT "FK_USER_UPDATEID" FOREIGN KEY ("updatedby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE project
(
  	id                          bigserial NOT NULL,
  	name                        character varying(255) NOT NULL UNIQUE,
  	description					text,
  
  	createdby_id               	bigint,
    created_date              	timestamp without time zone,
    updatedby_id              	bigint,
    updated_date           		timestamp without time zone,
  
  CONSTRAINT project_pkey PRIMARY KEY (id),
  CONSTRAINT "FK_PROJECT_CREATEID" FOREIGN KEY ("createdby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT "FK_PROJECT_UPDATEID" FOREIGN KEY ("updatedby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE

);

CREATE TABLE task
(
  	id                          bigserial NOT NULL,
  	name                        character varying(255) NOT NULL UNIQUE,
  	description					text,
 	 state                      character varying(255),
	  start_date              	timestamp without time zone,
	  end_date              	timestamp without time zone,
	  assignee_id               bigint,
	  project_id               	bigint,
  
  	createdby_id               	bigint,
    created_date              	timestamp without time zone,
    updatedby_id              	bigint,
    updated_date           		timestamp without time zone,
  
  CONSTRAINT task_pkey PRIMARY KEY (id),
  CONSTRAINT "FK_TASK_PROJECTID" FOREIGN KEY ("project_id") REFERENCES "tm"."project" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT "FK_TASK_ASSIGNEEID" FOREIGN KEY ("assignee_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT "FK_TASK_CREATEID" FOREIGN KEY ("createdby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT "FK_TASK_UPDATEID" FOREIGN KEY ("updatedby_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE

);



CREATE TABLE project_user
(
  	project_id               	bigint,
    user_id              		bigint,
    CONSTRAINT "FK_PROJECT_ID" FOREIGN KEY ("project_id") REFERENCES "tm"."project" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE,
	CONSTRAINT "FK_USER_ID" FOREIGN KEY ("user_id") REFERENCES "tm"."tmuser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION NOT DEFERRABLE INITIALLY IMMEDIATE
);