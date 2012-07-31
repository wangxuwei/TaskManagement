
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
  
  	createdBy_id               	bigint,
    createdDate              	timestamp without time zone,
    updatedBy_id              	bigint,
    updatedDate           		timestamp without time zone,
  
  CONSTRAINT project_pkey PRIMARY KEY (id)

);


