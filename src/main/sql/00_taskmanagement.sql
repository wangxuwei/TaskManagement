
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


