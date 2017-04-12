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
    "Num" integer NOT NULL,
    id text NOT NULL,
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

ALTER SEQUENCE "notetions_Num_seq" OWNED BY notetions."Num";


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
-- Name: notetions Num; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notetions ALTER COLUMN "Num" SET DEFAULT nextval('"notetions_Num_seq"'::regclass);


--
-- Data for Name: notetions; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY notetions ("Num", id, note, created_at) FROM stdin;
\.


--
-- Name: notetions_Num_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('"notetions_Num_seq"', 5, true);


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
-- Name: notetions notetions_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notetions
    ADD CONSTRAINT notetions_pkey PRIMARY KEY ("Num");


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
-- Name: notetions notetions_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY notetions
    ADD CONSTRAINT notetions_id_fkey FOREIGN KEY (id) REFERENCES users(id);


--
-- PostgreSQL database dump complete
--

