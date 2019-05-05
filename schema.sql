BEGIN;

DROP TABLE IF EXISTS todo_table CASCADE;
DROP TABLE IF EXISTS user_table CASCADE;

DROP SEQUENCE IF EXISTS user_seq;
DROP SEQUENCE IF EXISTS todo_seq;

/****** 1. USER TABLE ******/
CREATE SEQUENCE user_seq start 100 increment 1 cache 1;
CREATE TABLE user_table (
  user_id BIGINT DEFAULT nextval('user_seq'::text),
  username VARCHAR,
  password VARCHAR,
  CONSTRAINT user_pk PRIMARY KEY(user_id)
)
WITHOUT OIDS;

/****** 2. TODO TABLE ******/
CREATE SEQUENCE todo_seq start 100 increment 1 cache 1;
CREATE TABLE todo_table (
  todo_id BIGINT DEFAULT nextval('todo_seq'::text),
  user_id BIGINT NOT NULL,
  todo_name VARCHAR,
  completed BOOLEAN,
  deleted BOOLEAN,
  CONSTRAINT todo_pk PRIMARY KEY(todo_id)
)
WITHOUT OIDS;

/****** TABLE FOREIGN KEYS: ******/
ALTER TABLE todo_table ADD CONSTRAINT todo_to_user_fk
  FOREIGN KEY (user_id)
  REFERENCES user_table (user_id)
  ON DELETE CASCADE;

COMMIT;
