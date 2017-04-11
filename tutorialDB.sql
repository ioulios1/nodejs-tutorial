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
-- Name: google_users; Type: TABLE; Schema: public; Owner: ioulios
--

CREATE TABLE google_users (
    id text NOT NULL,
    family_name text NOT NULL,
    given_name text NOT NULL
);


ALTER TABLE google_users OWNER TO ioulios;

--
-- Name: googleUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: ioulios
--

CREATE SEQUENCE "googleUsers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "googleUsers_id_seq" OWNER TO ioulios;

--
-- Name: googleUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ioulios
--

ALTER SEQUENCE "googleUsers_id_seq" OWNED BY google_users.id;


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
    id integer NOT NULL,
    username character varying(40) NOT NULL,
    password character varying(100) NOT NULL
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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: googleUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ioulios
--

SELECT pg_catalog.setval('"googleUsers_id_seq"', 1, false);


--
-- Data for Name: google_users; Type: TABLE DATA; Schema: public; Owner: ioulios
--

COPY google_users (id, family_name, given_name) FROM stdin;
110571016559691148951	Tsiko	Ioulios
\.


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
7	zxc	$2a$10$DQ5uPDc3fM3eY4b2uKPEieBTYkro8kJy6fi13065CjHzALsRYbvzi
8	test	$2a$10$08iCc9R1dsYr5eZi7NOJ5uha2h6CTUxwTNfzu4Qvjhv.B3Ggw.Rga
9	110571016559691148951	ioulios tsiko
\.


--
-- Name: google_users googleUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: ioulios
--

ALTER TABLE ONLY google_users
    ADD CONSTRAINT "googleUsers_pkey" PRIMARY KEY (id);


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
-- PostgreSQL database dump complete
--

