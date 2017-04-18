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
-- Name: notes; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE notes (
    notes_id integer NOT NULL,
    note text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    user_id integer NOT NULL
);


ALTER TABLE notes OWNER TO ioulios;

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

ALTER SEQUENCE "notetions_Num_seq" OWNED BY notes.notes_id;


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
-- Name: usr; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE usr (
    user_id integer NOT NULL,
    username text NOT NULL,
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

ALTER SEQUENCE usr_id_seq OWNED BY usr.user_id;


--
-- Name: notes notes_id; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notes ALTER COLUMN notes_id SET DEFAULT nextval('"notetions_Num_seq"'::regclass);


--
-- Name: usr user_id; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr ALTER COLUMN user_id SET DEFAULT nextval('usr_id_seq'::regclass);


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY notes (notes_id, note, created_at, user_id) FROM stdin;
\.


--
-- Name: notetions_Num_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('"notetions_Num_seq"', 21, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY session (sid, sess, expire) FROM stdin;
\.


--
-- Data for Name: usr; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY usr (user_id, username, password, name) FROM stdin;
2	test1	$2a$10$KZ7C4QeZdrl2P2UCFv3xg.Grg7oCXG50/Nt5tObG.m.OmlOH4dlgy	ioulios
17	test4	$2a$10$8aWa8iIw005jDlVxNBOy/uk1iEZINAsLNptUew2QmZ7ZyFSb.mQMW	tsiko
20	test2	$2a$10$T4jlId2xGRpbCo11r.qtf.XcjfDN0Ttgidv2nO2fTl7/eGlFLMYjG	tsiko
35	test7	$2a$10$0StZw.tcD5ssGNIt40qSZ.vrLg3dFLThqHm0uYSbv9QDmTDFLGnBO	atr
41	110571016559691148951	This account doesnt require password	Ioulios Tsiko
\.


--
-- Name: usr_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('usr_id_seq', 41, true);


--
-- Name: notes notetions_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notetions_pkey PRIMARY KEY (notes_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: usr usr_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr
    ADD CONSTRAINT usr_pkey PRIMARY KEY (user_id);


--
-- Name: usr usr_username_key; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY usr
    ADD CONSTRAINT usr_username_key UNIQUE (username);


--
-- Name: notes notes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notes
    ADD CONSTRAINT notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES usr(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

