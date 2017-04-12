--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: notetions; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE notetions (
    id integer NOT NULL,
    username text NOT NULL,
    note text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE notetions OWNER TO ioulios;

--
-- Name: notetions_Num_seq; Type: SEQUENCE; Schema: public; Owner: ioulios
--

CREATE SEQUENCE "notetions_Num_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "notetions_Num_seq" OWNER TO ioulios;

--
-- Name: notetions_Num_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ioulios
--

ALTER SEQUENCE "notetions_Num_seq" OWNED BY notetions.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE session OWNER TO ioulios;

--
-- Name: users; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE users (
    id text NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE users OWNER TO ioulios;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: ioulios
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO ioulios;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ioulios
--

ALTER SEQUENCE user_id_seq OWNED BY users.id;


--
-- Name: usr; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE usr (
    id integer NOT NULL,
    username text,
    password text,
    name text
);


ALTER TABLE usr OWNER TO ioulios;

--
-- Name: usr_id_seq; Type: SEQUENCE; Schema: public; Owner: ioulios
--

CREATE SEQUENCE usr_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usr_id_seq OWNER TO ioulios;

--
-- Name: usr_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ioulios
--

ALTER SEQUENCE usr_id_seq OWNED BY usr.id;


--
-- Name: notetions id; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notetions ALTER COLUMN id SET DEFAULT nextval('"notetions_Num_seq"'::regclass);


--
-- Name: usr id; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr ALTER COLUMN id SET DEFAULT nextval('usr_id_seq'::regclass);


--
-- Data for Name: notetions; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY notetions (id, username, note, created_at) FROM stdin;
6	110571016559691148951	test note	2017-04-12 14:20:14.996394
7	110571016559691148951	a biger note to display in the html table\r\nwith two rows	2017-04-12 14:57:16.519271
8	test	taking a testing note\r\nwith two rows\r\nand a third\r\nand a really long fooooooooooooooooorthhhhhhhhhhhh	2017-04-12 14:58:45.863445
9	110571016559691148951		2017-04-12 15:43:46.680374
10	test1	new note	2017-04-12 17:11:53.54629
11	test1		2017-04-12 17:11:55.354488
12	test1		2017-04-12 17:11:57.269333
13	test1	sdfs	2017-04-12 17:12:00.274378
14	110571016559691148951	ffd	2017-04-12 17:12:47.679677
\.


--
-- Name: notetions_Num_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('"notetions_Num_seq"', 14, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY session (sid, sess, expire) FROM stdin;
\.


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('user_id_seq', 9, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY users (id, username, password) FROM stdin;
110571016559691148951	Ioulios Tsiko	This account doesnt require password
test	ioulios tsiko	$2a$10$WjcF5a/RGwU2H7VdljTO6.4DVSTyxQjeQXvl6MJlpF4FmqGRasGNq
test2	ioulios tsiko2	$2a$10$ZO0FHJDWgWkHxdTYEy2kaewSyTC.PqGgEVNH2066ECrdH2UoAob6.
test3	ioulios tsiko3	$2a$10$i2.KfMmYk6MSXeO/v6dss.5u85gDilE5o0jasCfqCxEoh2xGPfcNq
\.


--
-- Data for Name: usr; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY usr (id, username, password, name) FROM stdin;
1	110571016559691148951	This account doesnt require password	Ioulios Tsiko
2	test1	$2a$10$KZ7C4QeZdrl2P2UCFv3xg.Grg7oCXG50/Nt5tObG.m.OmlOH4dlgy	ioulios
\.


--
-- Name: usr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('usr_id_seq', 2, true);


--
-- Name: notetions notetions_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notetions
    ADD CONSTRAINT notetions_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users user_username_key; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: usr usr_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (id);


--
-- Name: usr usr_username_key; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr
    ADD CONSTRAINT usr_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

