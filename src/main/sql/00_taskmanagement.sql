
-- ****************************************************************************

CREATE SCHEMA tm;

-- ............................................................................

GRANT USAGE ON SCHEMA tm to tm;

-- ............................................................................

SET search_path TO tm;

-- ****************************************************************************

-- ............................................................................
CREATE TABLE project
(
  	id                          bigserial NOT NULL,
  	name                        character varying(255) NOT NULL UNIQUE,
  	description					text,
  
  	createdby_id               	bigint,
    created_date              	timestamp without time zone,
    updatedby_id              	bigint,
    updated_date           		timestamp without time zone,
  
  CONSTRAINT project_pkey PRIMARY KEY (id)

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
  
  CONSTRAINT task_pkey PRIMARY KEY (id)

);

CREATE TABLE user
(
  	id                          bigserial NOT NULL,
  	name                        character varying(255) NOT NULL UNIQUE,
  	username					 character varying(255),
 	 password                      character varying(255),
  
  	createdby_id               	bigint,
    created_date              	timestamp without time zone,
    updatedby_id              	bigint,
    updated_date           		timestamp without time zone,
  
  CONSTRAINT user_pkey PRIMARY KEY (id)
);


CREATE TABLE project_user
(
  	project_id               	bigint,
    user_id              		bigint
);