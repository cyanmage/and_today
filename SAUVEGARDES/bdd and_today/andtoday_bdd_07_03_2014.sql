--
-- PostgreSQL database dump
--

-- Dumped from database version 9.0.15
-- Dumped by pg_dump version 9.0.15
-- Started on 2014-03-07 20:54:15

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- TOC entry 541 (class 2612 OID 11574)
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--

CREATE OR REPLACE PROCEDURAL LANGUAGE plpgsql;


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 149 (class 1259 OID 17694)
-- Dependencies: 5
-- Name: auth_group; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO and_today_connect;

--
-- TOC entry 148 (class 1259 OID 17692)
-- Dependencies: 5 149
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1986 (class 0 OID 0)
-- Dependencies: 148
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- TOC entry 1987 (class 0 OID 0)
-- Dependencies: 148
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_group_id_seq', 1, false);


--
-- TOC entry 147 (class 1259 OID 17679)
-- Dependencies: 5
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO and_today_connect;

--
-- TOC entry 146 (class 1259 OID 17677)
-- Dependencies: 147 5
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1988 (class 0 OID 0)
-- Dependencies: 146
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- TOC entry 1989 (class 0 OID 0)
-- Dependencies: 146
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);


--
-- TOC entry 145 (class 1259 OID 17669)
-- Dependencies: 5
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO and_today_connect;

--
-- TOC entry 144 (class 1259 OID 17667)
-- Dependencies: 5 145
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1990 (class 0 OID 0)
-- Dependencies: 144
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- TOC entry 1991 (class 0 OID 0)
-- Dependencies: 144
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_permission_id_seq', 39, true);


--
-- TOC entry 155 (class 1259 OID 17739)
-- Dependencies: 5
-- Name: auth_user; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone NOT NULL,
    is_superuser boolean NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(75) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO and_today_connect;

--
-- TOC entry 151 (class 1259 OID 17709)
-- Dependencies: 5
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO and_today_connect;

--
-- TOC entry 150 (class 1259 OID 17707)
-- Dependencies: 151 5
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1992 (class 0 OID 0)
-- Dependencies: 150
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- TOC entry 1993 (class 0 OID 0)
-- Dependencies: 150
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);


--
-- TOC entry 154 (class 1259 OID 17737)
-- Dependencies: 155 5
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1994 (class 0 OID 0)
-- Dependencies: 154
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- TOC entry 1995 (class 0 OID 0)
-- Dependencies: 154
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_user_id_seq', 1, true);


--
-- TOC entry 153 (class 1259 OID 17724)
-- Dependencies: 5
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO and_today_connect;

--
-- TOC entry 152 (class 1259 OID 17722)
-- Dependencies: 5 153
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1996 (class 0 OID 0)
-- Dependencies: 152
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- TOC entry 1997 (class 0 OID 0)
-- Dependencies: 152
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);


--
-- TOC entry 172 (class 1259 OID 50788)
-- Dependencies: 5
-- Name: core_background; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_background (
    id integer NOT NULL,
    opacite numeric(3,2) NOT NULL,
    couleur_de_fond text NOT NULL
);


ALTER TABLE public.core_background OWNER TO and_today_connect;

--
-- TOC entry 171 (class 1259 OID 50786)
-- Dependencies: 5 172
-- Name: core_background_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_background_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_background_id_seq OWNER TO and_today_connect;

--
-- TOC entry 1998 (class 0 OID 0)
-- Dependencies: 171
-- Name: core_background_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_background_id_seq OWNED BY core_background.id;


--
-- TOC entry 1999 (class 0 OID 0)
-- Dependencies: 171
-- Name: core_background_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_background_id_seq', 1, false);


--
-- TOC entry 170 (class 1259 OID 50771)
-- Dependencies: 5
-- Name: core_cadre; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_cadre (
    id integer NOT NULL,
    couleur_de_fond text NOT NULL,
    date date NOT NULL,
    date_creation timestamp with time zone NOT NULL,
    date_modification timestamp with time zone NOT NULL,
    image_de_fond text NOT NULL,
    "left" integer NOT NULL,
    top integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    opacite numeric(3,2) NOT NULL
);


ALTER TABLE public.core_cadre OWNER TO and_today_connect;

--
-- TOC entry 169 (class 1259 OID 50769)
-- Dependencies: 5 170
-- Name: core_cadre_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_cadre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_cadre_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2000 (class 0 OID 0)
-- Dependencies: 169
-- Name: core_cadre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_cadre_id_seq OWNED BY core_cadre.id;


--
-- TOC entry 2001 (class 0 OID 0)
-- Dependencies: 169
-- Name: core_cadre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_cadre_id_seq', 109, true);


--
-- TOC entry 166 (class 1259 OID 17845)
-- Dependencies: 5
-- Name: core_domaine; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_domaine (
    id integer NOT NULL,
    intitule_domaine character varying(50) NOT NULL
);


ALTER TABLE public.core_domaine OWNER TO and_today_connect;

--
-- TOC entry 165 (class 1259 OID 17843)
-- Dependencies: 5 166
-- Name: core_domaine_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_domaine_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_domaine_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2002 (class 0 OID 0)
-- Dependencies: 165
-- Name: core_domaine_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_domaine_id_seq OWNED BY core_domaine.id;


--
-- TOC entry 2003 (class 0 OID 0)
-- Dependencies: 165
-- Name: core_domaine_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_domaine_id_seq', 6, true);


--
-- TOC entry 168 (class 1259 OID 17853)
-- Dependencies: 5
-- Name: core_pays; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_pays (
    id integer NOT NULL,
    code_pays character varying(4),
    nom_pays character varying(50)
);


ALTER TABLE public.core_pays OWNER TO and_today_connect;

--
-- TOC entry 167 (class 1259 OID 17851)
-- Dependencies: 168 5
-- Name: core_pays_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_pays_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_pays_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2004 (class 0 OID 0)
-- Dependencies: 167
-- Name: core_pays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_pays_id_seq OWNED BY core_pays.id;


--
-- TOC entry 2005 (class 0 OID 0)
-- Dependencies: 167
-- Name: core_pays_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_pays_id_seq', 3, true);


--
-- TOC entry 164 (class 1259 OID 17834)
-- Dependencies: 1887 1888 5
-- Name: core_postgenerique; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_postgenerique (
    id integer NOT NULL,
    contenu text NOT NULL,
    date date NOT NULL,
    journee_generique boolean NOT NULL,
    recopie_tel_quel boolean NOT NULL,
    date_creation timestamp with time zone NOT NULL,
    inactif boolean NOT NULL,
    date_modification timestamp with time zone NOT NULL,
    style text,
    pays_id integer DEFAULT 0,
    domaine_id integer DEFAULT 0,
    "left" integer NOT NULL,
    top integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL
);


ALTER TABLE public.core_postgenerique OWNER TO and_today_connect;

--
-- TOC entry 163 (class 1259 OID 17832)
-- Dependencies: 164 5
-- Name: core_postgenerique_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_postgenerique_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_postgenerique_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2006 (class 0 OID 0)
-- Dependencies: 163
-- Name: core_postgenerique_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_postgenerique_id_seq OWNED BY core_postgenerique.id;


--
-- TOC entry 2007 (class 0 OID 0)
-- Dependencies: 163
-- Name: core_postgenerique_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_postgenerique_id_seq', 436, true);


--
-- TOC entry 162 (class 1259 OID 17823)
-- Dependencies: 5
-- Name: core_postuser; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE core_postuser (
    id integer NOT NULL,
    contenu text NOT NULL,
    date date NOT NULL,
    journee_generique boolean NOT NULL,
    date_creation timestamp with time zone NOT NULL,
    inactif boolean NOT NULL,
    date_modification timestamp with time zone NOT NULL,
    style text,
    heure time without time zone,
    "left" integer NOT NULL,
    top integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    recopie_tel_quel boolean NOT NULL
);


ALTER TABLE public.core_postuser OWNER TO and_today_connect;

--
-- TOC entry 161 (class 1259 OID 17821)
-- Dependencies: 5 162
-- Name: core_postuser_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE core_postuser_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_postuser_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2008 (class 0 OID 0)
-- Dependencies: 161
-- Name: core_postuser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE core_postuser_id_seq OWNED BY core_postuser.id;


--
-- TOC entry 2009 (class 0 OID 0)
-- Dependencies: 161
-- Name: core_postuser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('core_postuser_id_seq', 1, false);


--
-- TOC entry 143 (class 1259 OID 17657)
-- Dependencies: 1876 5
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    content_type_id integer,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO and_today_connect;

--
-- TOC entry 142 (class 1259 OID 17655)
-- Dependencies: 5 143
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2010 (class 0 OID 0)
-- Dependencies: 142
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;


--
-- TOC entry 2011 (class 0 OID 0)
-- Dependencies: 142
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('django_admin_log_id_seq', 1, false);


--
-- TOC entry 157 (class 1259 OID 17764)
-- Dependencies: 5
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE django_content_type (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO and_today_connect;

--
-- TOC entry 156 (class 1259 OID 17762)
-- Dependencies: 157 5
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2012 (class 0 OID 0)
-- Dependencies: 156
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;


--
-- TOC entry 2013 (class 0 OID 0)
-- Dependencies: 156
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('django_content_type_id_seq', 13, true);


--
-- TOC entry 158 (class 1259 OID 17782)
-- Dependencies: 5
-- Name: django_session; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO and_today_connect;

--
-- TOC entry 160 (class 1259 OID 17792)
-- Dependencies: 5
-- Name: south_migrationhistory; Type: TABLE; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE TABLE south_migrationhistory (
    id integer NOT NULL,
    app_name character varying(255) NOT NULL,
    migration character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.south_migrationhistory OWNER TO and_today_connect;

--
-- TOC entry 159 (class 1259 OID 17790)
-- Dependencies: 5 160
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: and_today_connect
--

CREATE SEQUENCE south_migrationhistory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.south_migrationhistory_id_seq OWNER TO and_today_connect;

--
-- TOC entry 2014 (class 0 OID 0)
-- Dependencies: 159
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: and_today_connect
--

ALTER SEQUENCE south_migrationhistory_id_seq OWNED BY south_migrationhistory.id;


--
-- TOC entry 2015 (class 0 OID 0)
-- Dependencies: 159
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: and_today_connect
--

SELECT pg_catalog.setval('south_migrationhistory_id_seq', 10, true);


--
-- TOC entry 1879 (class 2604 OID 17697)
-- Dependencies: 148 149 149
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- TOC entry 1878 (class 2604 OID 17682)
-- Dependencies: 146 147 147
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- TOC entry 1877 (class 2604 OID 17672)
-- Dependencies: 145 144 145
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- TOC entry 1882 (class 2604 OID 17742)
-- Dependencies: 155 154 155
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- TOC entry 1880 (class 2604 OID 17712)
-- Dependencies: 150 151 151
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- TOC entry 1881 (class 2604 OID 17727)
-- Dependencies: 153 152 153
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- TOC entry 1892 (class 2604 OID 50791)
-- Dependencies: 171 172 172
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_background ALTER COLUMN id SET DEFAULT nextval('core_background_id_seq'::regclass);


--
-- TOC entry 1891 (class 2604 OID 50774)
-- Dependencies: 170 169 170
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_cadre ALTER COLUMN id SET DEFAULT nextval('core_cadre_id_seq'::regclass);


--
-- TOC entry 1889 (class 2604 OID 17848)
-- Dependencies: 166 165 166
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_domaine ALTER COLUMN id SET DEFAULT nextval('core_domaine_id_seq'::regclass);


--
-- TOC entry 1890 (class 2604 OID 17856)
-- Dependencies: 168 167 168
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_pays ALTER COLUMN id SET DEFAULT nextval('core_pays_id_seq'::regclass);


--
-- TOC entry 1886 (class 2604 OID 17837)
-- Dependencies: 164 163 164
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_postgenerique ALTER COLUMN id SET DEFAULT nextval('core_postgenerique_id_seq'::regclass);


--
-- TOC entry 1885 (class 2604 OID 17826)
-- Dependencies: 161 162 162
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_postuser ALTER COLUMN id SET DEFAULT nextval('core_postuser_id_seq'::regclass);


--
-- TOC entry 1875 (class 2604 OID 17660)
-- Dependencies: 143 142 143
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);


--
-- TOC entry 1883 (class 2604 OID 17767)
-- Dependencies: 157 156 157
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);


--
-- TOC entry 1884 (class 2604 OID 17795)
-- Dependencies: 160 159 160
-- Name: id; Type: DEFAULT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY south_migrationhistory ALTER COLUMN id SET DEFAULT nextval('south_migrationhistory_id_seq'::regclass);


--
-- TOC entry 1968 (class 0 OID 17694)
-- Dependencies: 149
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_group (id, name) FROM stdin;
\.


--
-- TOC entry 1967 (class 0 OID 17679)
-- Dependencies: 147
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- TOC entry 1966 (class 0 OID 17669)
-- Dependencies: 145
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add permission	2	add_permission
5	Can change permission	2	change_permission
6	Can delete permission	2	delete_permission
7	Can add group	3	add_group
8	Can change group	3	change_group
9	Can delete group	3	delete_group
10	Can add user	4	add_user
11	Can change user	4	change_user
12	Can delete user	4	delete_user
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add migration history	7	add_migrationhistory
20	Can change migration history	7	change_migrationhistory
21	Can delete migration history	7	delete_migrationhistory
22	Can add Post utilisateur	8	add_postuser
23	Can change Post utilisateur	8	change_postuser
24	Can delete Post utilisateur	8	delete_postuser
25	Can add Post générique	9	add_postgenerique
26	Can change Post générique	9	change_postgenerique
27	Can delete Post générique	9	delete_postgenerique
28	Can add Domaine	10	add_domaine
29	Can change Domaine	10	change_domaine
30	Can delete Domaine	10	delete_domaine
31	Can add Pays	11	add_pays
32	Can change Pays	11	change_pays
33	Can delete Pays	11	delete_pays
34	Can add Cadre	12	add_cadre
35	Can change Cadre	12	change_cadre
36	Can delete Cadre	12	delete_cadre
37	Can add BackGround	13	add_background
38	Can change BackGround	13	change_background
39	Can delete BackGround	13	delete_background
\.


--
-- TOC entry 1971 (class 0 OID 17739)
-- Dependencies: 155
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$12000$J1pZUz0uCAqu$HBotx3lVKuT5HLeyQMHWdJ9fzkMQiXBnA/YI/Rcjh7M=	2014-01-16 01:13:51.949247+01	t	superuser				t	t	2014-01-16 01:13:51.949247+01
\.


--
-- TOC entry 1969 (class 0 OID 17709)
-- Dependencies: 151
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- TOC entry 1970 (class 0 OID 17724)
-- Dependencies: 153
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- TOC entry 1980 (class 0 OID 50788)
-- Dependencies: 172
-- Data for Name: core_background; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_background (id, opacite, couleur_de_fond) FROM stdin;
\.


--
-- TOC entry 1979 (class 0 OID 50771)
-- Dependencies: 170
-- Data for Name: core_cadre; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_cadre (id, couleur_de_fond, date, date_creation, date_modification, image_de_fond, "left", top, width, height, opacite) FROM stdin;
103	#FFFFFF	2014-03-02	2014-03-02 22:30:28.089862+01	2014-03-02 22:30:28.089862+01	d853ce9c20fcb7f9fb50242d5433c252.jpg	999	291	350	258	1.00
106	#FFFFFF	2014-03-03	2014-03-05 18:03:01.910672+01	2014-03-05 18:03:01.910672+01	59f3df1bb5c2f4a5a011950c3709e6a9.jpg	21	338	300	200	1.00
104	#FFFFFF	2014-03-03	2014-03-05 18:03:01.914672+01	2014-03-05 18:03:01.914672+01	441735ac1f4dd905e5c7ade0b642ef9c.jpg	0	0	253	179	1.00
107	#FFFFFF	2014-03-05	2014-03-06 18:37:32.503218+01	2014-03-06 18:37:32.503218+01	b1c425ee0304f5761a2d2974ef0a7a0c.png	166	74	965	358	1.00
93	#FFFFFF	2014-02-24	2014-02-24 17:23:58.86674+01	2014-02-24 17:23:58.86674+01	3a7377f56a60deeeb47a3a98f81e75f8.jpg	57	272	231	189	1.00
95	#FFFFFF	2014-02-24	2014-02-24 17:23:58.87074+01	2014-02-24 17:23:58.87074+01	f9401fa888e43fcc21d9bc89f0e3a74d.jpg	43	92	170	123	0.86
96	#FFFFFF	2014-02-24	2014-02-24 17:23:58.873741+01	2014-02-24 17:23:58.873741+01	4efa409c93ce7a47f9d930fb511a6301.png	267	36	150	151	0.94
97	#FFFFFF	2014-02-25	2014-02-25 22:22:11.411281+01	2014-02-25 22:22:11.411281+01	c3b07f66774cff4c465476f86b2526d1.png	1018	129	150	121	1.00
99	#FFFFFF	2014-02-27	2014-02-27 23:59:35.92176+01	2014-02-27 23:59:35.92276+01	6b137f9949e6b495b1f859cb99fa000d.jpg	14	11	300	200	1.00
108	#FFFFFF	2014-03-06	2014-03-06 23:23:03.925079+01	2014-03-06 23:23:03.926079+01	07a36cd6becd146b1a6c53efcf2c5c5c.jpg	0	0	394	251	1.00
109	#FFFFFF	2014-03-06	2014-03-06 23:23:03.930079+01	2014-03-06 23:23:03.931079+01	69c1a77a82c5ba965e085de4a84920f9.jpg	640	43	547	336	1.00
100	#FFFFFF	2014-03-01	2014-03-01 22:56:26.221361+01	2014-03-01 22:56:26.221361+01	de755b1d292f28254c0641868c361252.png	1020	234	150	155	1.00
101	#FFFFFF	2014-03-01	2014-03-01 22:56:26.225361+01	2014-03-01 22:56:26.225361+01	28cac8d97c818c883cf0ff538ff95fe0.png	966	9	150	164	1.00
102	#FFFFFF	2014-03-02	2014-03-02 22:30:28.086861+01	2014-03-02 22:30:28.086861+01	d3a5eddafb2cef7d6092885d85291b3e.png	398	20	464	333	1.00
89	#FFFFFF	2014-02-23	2014-02-23 23:06:49.086396+01	2014-02-23 23:06:49.086396+01	84f098b9f2219ac872ac0bc6634fd4ae.jpg	509	189	200	159	0.51
90	#FFFFFF	2014-02-23	2014-02-23 23:06:49.088396+01	2014-02-23 23:06:49.088396+01	default	882	269	300	200	1.00
91	#FFFFFF	2014-02-23	2014-02-23 23:06:49.090396+01	2014-02-23 23:06:49.090396+01	default	146	219	300	200	1.00
105	#FFFFFF	2014-03-03	2014-03-05 18:03:01.903671+01	2014-03-05 18:03:01.903671+01	c776753dad0d73e464595e1fdc102455.jpg	388	0	300	200	1.00
\.


--
-- TOC entry 1977 (class 0 OID 17845)
-- Dependencies: 166
-- Data for Name: core_domaine; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_domaine (id, intitule_domaine) FROM stdin;
0	Général
1	Sciences
2	Technologie
3	Histoire
4	People
5	Arts
6	Société
\.


--
-- TOC entry 1978 (class 0 OID 17853)
-- Dependencies: 168
-- Data for Name: core_pays; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_pays (id, code_pays, nom_pays) FROM stdin;
0	MON	Monde entier
1	FRA	France
2	ET-U	Etats_Unis
3	ALL	Allemagne
\.


--
-- TOC entry 1976 (class 0 OID 17834)
-- Dependencies: 164
-- Data for Name: core_postgenerique; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_postgenerique (id, contenu, date, journee_generique, recopie_tel_quel, date_creation, inactif, date_modification, style, pays_id, domaine_id, "left", top, width, height) FROM stdin;
196	Lexmark	2014-01-23	f	f	2014-02-01 16:12:29.33252+01	f	2014-02-01 16:12:29.376523+01	font-weight: bold;	0	0	130	61	314	156
224	24kupi	2014-01-24	f	f	2014-01-27 17:17:34.22011+01	f	2014-01-27 17:17:34.263112+01	font-weight: bold; font-style: italic;	0	0	1112	278	250	123
200	Aujourdhui le 16	2014-01-16	f	f	2014-01-27 21:03:21.343961+01	f	2014-01-27 21:03:21.382963+01	font-weight: bold; font-style: italic;	0	0	421	254	250	110
325	HP48S	2014-01-28	f	f	2014-02-01 16:12:01.030902+01	f	2014-02-01 16:12:01.030902+01		0	0	929	173	141	89
237	Tout beau, tout neuf	2014-01-24	f	f	2014-01-27 17:17:34.269113+01	f	2014-01-27 17:17:34.269113+01	font-weight: bold;	0	0	794	191	250	110
226	Alep ?Oui !	2014-01-24	f	f	2014-01-27 17:17:34.278113+01	f	2014-01-27 17:17:34.278113+01	font-style: italic; font-weight: bold;	0	0	321	239	250	110
229	GIGN	2014-01-24	f	f	2014-01-27 17:17:34.281113+01	f	2014-01-27 17:17:34.282113+01	font-style: italic; font-weight: bold;	0	0	785	356	250	110
199	Nous étions hier	2014-01-16	f	f	2014-01-27 21:03:21.388964+01	f	2014-01-27 21:03:21.388964+01	font-weight: bold; font-style: italic;	0	0	205	200	200	150
310	test sauvegarde	2014-01-26	f	f	2014-02-01 16:13:31.198059+01	f	2014-02-01 16:13:31.199059+01		0	0	204	234	300	150
225	MAP BOX<br>TEST AVEC DES LIGNES	2014-01-24	f	f	2014-01-27 17:17:34.285114+01	f	2014-01-27 17:17:34.285114+01	font-weight: bold;	0	0	398	413	373	131
322	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Encore un test	2014-01-26	f	f	2014-02-01 16:13:31.204059+01	f	2014-02-01 16:13:31.204059+01	font-weight: bold;	0	0	585	105	300	150
324	Le chercheur d'or.<div><br></div><div>Le Clézio</div>	2014-01-27	f	f	2014-02-01 16:13:23.477617+01	f	2014-02-01 16:13:23.477617+01	font-weight: bold;	0	0	521	379	235	117
220	Toujours des marques d'imprimante ?&nbsp;	2014-01-23	f	f	2014-02-01 16:12:29.383523+01	f	2014-02-01 16:12:29.383523+01		0	0	721	5	416	110
198	On approche, le 23, et c'est bien aujourd'hui ! C'est cool, hein ? &nbsp;&nbsp;	2014-01-23	f	f	2014-02-01 16:12:29.392524+01	f	2014-02-01 16:12:29.392524+01	font-weight: bold;	0	0	675	160	250	237
323	L'insoutenable légèreté de l'être.<div><br></div><div>Milan Kundera</div>	2014-01-27	f	f	2014-02-01 16:13:23.487618+01	f	2014-02-01 16:13:23.488618+01	font-style: italic;	0	0	274	142	245	121
335	Hier kommt die sonne	2014-01-30	f	f	2014-02-01 16:13:42.275693+01	f	2014-02-01 16:13:42.323695+01	font-weight: bold; font-style: italic;	0	0	731	262	300	150
246	Test scopes imbriqués &nbsp;<div>Retest</div>	2014-01-25	f	f	2014-02-01 16:12:14.82169+01	f	2014-02-01 16:12:14.871693+01		0	0	581	315	300	150
217	J'ai ajouté un sticker le 21/01/2014	2014-01-21	f	f	2014-02-01 16:12:37.532989+01	f	2014-02-01 16:12:37.532989+01		0	0	643	331	250	110
197	Dans pas très longtemps, le 15	2014-01-15	f	f	2014-01-21 14:55:26.720259+01	f	2014-01-21 14:55:26.755261+01		0	0	439	208	265	136
205	Un test d'ajout	2014-01-21	f	f	2014-02-01 16:12:37.54199+01	f	2014-02-01 16:12:37.54199+01	font-weight: bold;	0	0	638	32	369	197
219	Canon HP	2014-01-23	f	f	2014-02-01 16:12:29.396524+01	f	2014-02-01 16:12:29.396524+01		0	0	326	284	250	110
222	Test d'ajout avec registre de modification	2014-01-23	f	f	2014-02-01 16:12:29.400524+01	f	2014-02-01 16:12:29.400524+01	font-weight: bold;	0	0	808	399	250	110
214	Not null maintenant ?	2014-01-22	f	f	2014-02-01 16:12:42.532275+01	f	2014-02-01 16:12:42.578278+01		0	0	281	146	402	134
213	re re test	2014-01-21	f	f	2014-02-01 16:12:37.474986+01	f	2014-02-01 16:12:37.524989+01		0	0	225	270	250	110
206	Nous testons !!!!!	2014-01-20	f	f	2014-01-27 21:02:57.387591+01	f	2014-01-27 21:02:57.427593+01	font-style: italic; font-weight: bold;	0	0	467	188	250	110
218	je rajoute aussi un sticker <br> pour le 20 janvier 2014	2014-01-20	f	f	2014-01-27 21:02:57.432593+01	f	2014-01-27 21:02:57.433593+01		0	0	237	371	300	126
221	Il ne faut pas te laisser vide	2014-01-20	f	f	2014-01-27 21:02:57.438594+01	f	2014-01-27 21:02:57.438594+01		0	0	743	436	250	110
207	Encore un du 17 janvier	2014-01-17	f	f	2014-02-01 16:12:57.207115+01	f	2014-02-01 16:12:57.267118+01	font-weight: bold; font-style: italic;	0	0	474	421	200	127
238	Un test pour le 19	2014-01-19	f	f	2014-01-27 21:03:03.349932+01	f	2014-01-27 21:03:03.388934+01		0	0	338	251	250	110
215	Un nouveau, celui du 18 janvier 2014	2014-01-18	f	f	2014-01-27 21:03:10.83036+01	f	2014-01-27 21:03:10.865362+01		0	0	381	339	320	155
201	le 18 janvier 2014	2014-01-18	f	f	2014-01-27 21:03:10.870362+01	f	2014-01-27 21:03:10.870362+01	font-weight: bold; font-style: italic;	0	0	880	226	250	296
251	Test id	2014-01-27	f	f	2014-02-01 16:13:23.426614+01	f	2014-02-01 16:13:23.471617+01		0	0	738	142	215	92
336	Du hast	2014-01-30	f	f	2014-02-01 16:13:42.329696+01	f	2014-02-01 16:13:42.329696+01	font-weight: bold; font-style: italic;	0	0	232	180	300	150
326	HP48GX	2014-01-28	f	f	2014-02-01 16:12:01.037902+01	f	2014-02-01 16:12:01.038902+01		0	0	230	439	200	81
262	Théorème du minimax	2014-01-26	f	f	2014-02-01 16:13:31.188058+01	f	2014-02-01 16:13:31.189058+01		0	0	900	332	300	150
330	PANNEAU_2	2014-01-29	f	f	2014-01-29 23:55:59.610106+01	f	2014-01-29 23:55:59.658109+01		0	0	348	241	463	213
261	Il fait le maximum minimir, entre nous c'est normal non ?&nbsp;<div>Encore un taré celui-là !!</div>	2014-01-26	f	f	2014-02-01 16:13:30.930044+01	f	2014-02-01 16:13:31.180058+01	font-weight: bold; font-style: italic;	0	0	202	15	300	150
337	Ohne dich	2014-01-30	f	f	2014-02-01 16:13:42.364698+01	f	2014-02-01 16:13:42.365698+01	font-weight: bold; font-style: italic;	0	0	555	11	300	150
329	PANNEAU 1	2014-01-28	f	f	2014-02-01 16:12:00.982899+01	f	2014-02-01 16:12:01.023901+01		0	0	618	137	300	411
357	Test upload 1<img src="http://r17.imgfast.net/users/1714/62/02/30/avatars/9199-30.jpg">	2014-02-02	f	f	2014-02-13 17:32:27.446035+01	f	2014-02-13 17:32:27.447035+01		0	0	168	150	372	197
358	test upload 3	2014-02-02	f	f	2014-02-13 17:32:27.450035+01	f	2014-02-13 17:32:27.450035+01		0	0	600	161	300	150
355	Cora &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<img src="http://odetocode.com/Images/feed-icon32x32.png" alt="RSS">	2014-02-01	f	f	2014-02-08 01:43:40.45388+01	f	2014-02-08 01:43:40.45388+01		0	0	127	343	300	150
359	Test upload 2	2014-02-02	f	f	2014-02-13 17:32:27.349029+01	f	2014-02-13 17:32:27.395032+01		0	0	150	336	300	150
354	Auchan<div><pre style="font-family: monospace, Courier; padding: 1em; border-style: dashed; border-color: rgb(47, 111, 171); color: rgb(0, 0, 0); background-color: rgb(249, 249, 249); line-height: 1.3em;">onmouseclick=alert('Wufff!')</pre></div>	2014-02-01	f	f	2014-02-08 01:43:40.402877+01	f	2014-02-08 01:43:40.447879+01		0	0	488	16	450	150
340	Tuiles<img src="http://2.bp.blogspot.com/-F74WaqFJUDI/Uedje77cKkI/AAAAAAAABa8/YUUuFHz9cu0/s640/tuiles+aux+amandes+2.jpg"><a href="https://www.google.fr/search?q=images&amp;oq=images&amp;aqs=chrome..69i57j0j69i60l3j69i61.821j0j8&amp;sourceid=chrome&amp;espv=210&amp;es_sm=93&amp;ie=UTF-8#"></a>	2014-01-31	f	f	2014-02-08 01:45:46.989117+01	f	2014-02-08 01:45:46.989117+01	font-weight: bold; font-family: Times New Roman; font-size: 21px; font-style: italic;	0	0	39	27	523	382
339	Macédoine<img class="imageControleSticker b_bold" src="http://127.0.0.1:8000/static/stickit/images/controles_sticker/fonteBold.jpg" ng-click="bold = ! bold"><div><br></div>	2014-01-31	f	f	2014-02-08 01:45:46.941114+01	f	2014-02-08 01:45:46.983117+01	font-weight: bold; font-family: Times New Roman; font-size: 21px; font-style: italic;	0	0	666	306	300	150
379	<img src="/media/faf9d21a081805a9d18faa6ca2fc7a6c.png"><font size="5">sdfdfffffds</font><img src="http://127.0.0.1:8000/media/3611e09810194cbb567fbe2c711ba609.jpg"><font size="5">fsd</font>	2014-02-12	f	f	2014-02-12 13:41:38.412856+01	f	2014-02-12 13:41:38.448858+01		0	0	471	303	335	195
384	<font size="5"><b><u><font face="cursive">T</font><font color="#e6301a" style="font-family: cursive;">ecgb</font><font color="#34e61a"><font face="cursive">fh</font><i><font face="Comfortaa">fg</font></i><font face="cursive">hst</font></font></u></b></font><font color="#34e61a">&nbsp;</font><font color="#e61aa0">sdfsdfsdfsdfs</font><font style="font-weight: bold;"><i style="color: rgb(230, 26, 160);">sdfsdfsdfsd</i><font size="4" color="#e6261a"><i>fds</i></font></font><font style="font-weight: bold;"><font size="4" color="#e6261a"><i>ffsdf</i></font><i style="color: rgb(230, 26, 160);">s</i></font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">dfsdfsdf</font><font face="Arial"><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">dsf</font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">ss</font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">ssssssssss</font></font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">sss</font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">sssssss</font><font style="font-style: italic; font-weight: bold;" color="#1a34e6" size="4">sdfqsdsdfqsdfsd</font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">sssssssssss</font><font color="#70e61a"><font style="font-style: italic; font-weight: bold;">eeeeeeeeee</font><font style="font-style: italic; font-weight: bold;">eeee</font><font style="font-style: italic; font-weight: bold;">eeeee</font></font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">eeeeeeee</font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">e</font><b style="font-style: italic;"><font color="#e61aa0">eee</font><font color="#6de61a">eeeeee</font></b><font size="4" color="#6de61a"><u>eeeeeeeeee</u></font><b style="color: rgb(230, 26, 160); font-style: italic;">eeeeeeee<font face="fantasy">eeee</font></b><font face="fantasy"><font style="font-style: italic;"><font color="#e9ab56"><u><font size="5">ee</font><font size="3">eee</font><font size="5">eeee</font></u></font><b style="color: rgb(230, 26, 160);">eeeeeeeee</b></font><font style="color: rgb(230, 26, 160); font-style: italic; font-weight: bold;">eeeeeeeeeeeeeeeeee</font></font>	2014-02-17	f	f	2014-02-17 23:19:03.900361+01	f	2014-02-17 23:19:03.945364+01		0	0	140	144	304	200
362	Test d'jout de fichier	2014-02-07	f	f	2014-02-07 22:14:14.673158+01	f	2014-02-07 22:14:14.720161+01		0	0	98	39	300	150
338	Galettes saint-michel et&nbsp;<img class="imageControleSticker deployeur" src="http://127.0.0.1:8000/static/stickit/images/controles_sticker/fontecolor2_t.jpg" style="float: right;"><div>mousseline de purée de&nbsp;carottes et de petits pois&nbsp;</div>	2014-01-31	f	f	2014-02-08 01:45:46.992117+01	f	2014-02-08 01:45:46.992117+01	font-weight: bold; font-size: 21px; font-family: Times New Roman; font-style: italic;position: relative;	0	0	637	72	447	189
380	<img src="/media/f46a632067459661bcc2f7fe84b46099.png"><img src="/media/bb0fa4261da501e46283d0a5df56a7c3.png">sdf<u>gd</u>fg	2014-02-12	f	f	2014-02-12 13:41:38.475859+01	f	2014-02-12 13:41:38.475859+01		0	0	151	120	300	150
381	wd<b><i>fgdf</i></b>g<img src="http://127.0.0.1:8000/media/55a053eefb94156551527b6be95597cb.jpg">	2014-02-12	f	f	2014-02-12 13:41:38.478859+01	f	2014-02-12 13:41:38.479859+01		0	0	525	96	300	150
371	<font face="cursive"><i><font size="4">Ou peut-</font><font size="3">être des abri</font><font size="4">cots ?</font></i><font size="4">&nbsp;</font></font>	2014-02-09	f	f	2014-02-14 01:04:54.910007+01	f	2014-02-14 01:04:54.949009+01		0	0	337	52	417	134
372	<img src="/media/07f65ac76b227767eef1cc2196f07104.jpg"><div><font face="monospace">Test police&nbsp;</font></div><div><font face="Comfortaa">Test pompier</font></div><div><font face="fantasy">Test armée</font></div><div><font face="Arial">Test bateau</font></div>	2014-02-09	f	f	2014-02-14 01:04:54.977011+01	f	2014-02-14 01:04:54.977011+01		0	0	370	188	327	360
356	mammouth écrase les prix &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img src="https://www.gravatar.com/avatar/6702dd49afe5c993a59dca53ddf371b6?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32">	2014-02-01	f	f	2014-02-08 01:43:40.45688+01	f	2014-02-08 01:43:40.45688+01		0	0	624	228	300	320
353	<div style="/* display:none; */background: rgba(233, 12, 12, 0.04);width: 200px;height: 0px;position: relative;top: 0px;z-index: 50;">Simply market &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img src="http://nettuts.s3.amazonaws.com/127_iNETTUTS/demo/img/photos/9.jpg" alt="photo9"></div>	2014-02-01	f	f	2014-02-08 01:43:40.45888+01	f	2014-02-08 01:43:40.45888+01		0	0	15	55	385	196
373	<b><i><u><font face="Times New Roman" size="3">Finalement, ce sera une banane !!&nbsp;</font></u></i></b><div><br></div><div><img src="http://127.0.0.1:8000/media/1b9103e9f693d22f24003fe471d3bd7e.jpg"></div>	2014-02-09	f	f	2014-02-14 01:04:54.982011+01	f	2014-02-14 01:04:54.982011+01		0	0	804	159	342	386
360	test bleach<div><span onclick="alert('tata'); return false ;">Clique-moi</span></div>	2014-02-04	f	f	2014-02-05 01:07:18.824196+01	f	2014-02-05 01:07:18.869199+01		0	0	181	220	300	150
364	Image avec un joli cygne !<div><img src="http://127.0.0.1:8000/media/b1c425ee0304f5761a2d2974ef0a7a0c.png"></div><div><br></div><div><br></div><div>C'est un signe !!</div>	2014-02-08	f	f	2014-02-11 19:59:21.61432+01	f	2014-02-11 19:59:21.649322+01		0	0	338	8	510	442
370	<div><b><font face="Times New Roman" size="4">Une env<i>ie de fra</i>ises ??</font></b></div><div><i><br></i></div><img src="/media/265a7a3f01c8575b1c777acaf7664ae8.jpg">	2014-02-09	f	f	2014-02-14 01:04:54.985011+01	f	2014-02-14 01:04:54.985011+01		0	0	8	4	316	453
385	<font size="4"><i><font style="font-family: cursive; font-weight: bold;"><font color="#ff4040">sfh</font><font color="#38169e">fhgfh</font></font><font color="#ff4040" style="font-family: cursive; font-weight: bold;">fh</font><font style="font-weight: bold;" color="#037600" face="Times New Roman">qsefdsfgsdgx</font><font style="font-weight: bold;" color="#037600" face="cursive">cvwxcv</font></i></font>	2014-02-18	f	f	2014-02-18 21:18:25.237274+01	f	2014-02-18 21:18:25.281276+01		0	0	875	100	300	150
367	On a&nbsp; réussi<img src="http://127.0.0.1:8000/media/d112fa23ae58f38277eb855fb3c8bbc1.png">	2014-02-08	f	f	2014-02-11 19:59:21.716326+01	f	2014-02-11 19:59:21.716326+01		0	0	23	316	300	150
363	Test avec des images<div><img src="/media/bb0fa4261da501e46283d0a5df56a7c3.png"><img src="/media/f46a632067459661bcc2f7fe84b46099.png">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div>	2014-02-08	f	f	2014-02-11 19:59:21.764329+01	f	2014-02-11 19:59:21.764329+01		0	0	22	0	246	236
375	<img src="/media/c1c3cf60e07dc9ca11b14b8ae295947b.jpg">	2014-02-10	f	f	2014-02-20 21:59:08.688847+01	f	2014-02-20 21:59:08.689847+01		0	0	688	256	341	156
376	<img src="/media/f46a632067459661bcc2f7fe84b46099.png">	2014-02-10	f	f	2014-02-20 21:59:08.693847+01	f	2014-02-20 21:59:08.694847+01		0	0	86	9	300	150
361	Test nouvelle syntaxe	2014-02-06	f	f	2014-02-12 11:14:41.134536+01	f	2014-02-12 11:14:41.177539+01		0	0	370	318	300	150
377	<img src="/media/39ebdfc0ee33644ba6023d9f9288d2b8.jpg">	2014-02-10	f	f	2014-02-20 21:59:08.57884+01	f	2014-02-20 21:59:08.617843+01		0	0	888	0	352	201
374	<img src="/media/d112fa23ae58f38277eb855fb3c8bbc1.png">	2014-02-10	f	f	2014-02-20 21:59:08.681846+01	f	2014-02-20 21:59:08.682846+01		0	0	84	172	512	367
393	Test	2014-02-21	f	f	2014-02-21 23:51:24.721599+01	f	2014-02-21 23:51:24.721599+01		0	0	84	39	300	150
395	test	2014-02-23	f	f	2014-02-23 23:06:49.042393+01	f	2014-02-23 23:06:49.081395+01		0	0	1072	17	200	80
402	<img src="/media/c1c3cf60e07dc9ca11b14b8ae295947b.jpg"><div>Déjeuner du matin </div>	2014-02-24	f	f	2014-02-24 17:23:58.854739+01	f	2014-02-24 17:23:58.85574+01		0	0	592	243	221	200
403	Test avec collision	2014-02-24	f	f	2014-02-24 17:23:58.86074+01	f	2014-02-24 17:23:58.86174+01		0	0	620	36	300	150
406	Test 3	2014-02-25	f	f	2014-02-25 22:22:11.39928+01	f	2014-02-25 22:22:11.39928+01		0	0	507	209	300	150
401	un sticker de placé	2014-02-24	f	f	2014-02-24 17:23:58.779735+01	f	2014-02-24 17:23:58.817737+01		0	0	989	131	300	150
404	Test 1	2014-02-25	f	f	2014-02-25 22:22:11.408281+01	f	2014-02-25 22:22:11.408281+01		0	0	237	31	316	150
405	test 2	2014-02-25	f	f	2014-02-25 22:22:11.349277+01	f	2014-02-25 22:22:11.39228+01		0	0	656	15	300	150
408	Obstacle 2	2014-02-26	f	f	2014-02-26 23:51:03.596468+01	f	2014-02-26 23:51:03.597468+01		0	0	371	233	319	152
409	Collider	2014-02-26	f	f	2014-02-26 23:51:03.604468+01	f	2014-02-26 23:51:03.605468+01		0	0	251	35	335	131
412	Obstacle Duo	2014-02-27	f	f	2014-02-27 23:59:35.865757+01	f	2014-02-27 23:59:35.866757+01		0	0	389	289	300	150
410	Obstaclecvbxcvwfghghcvxbvbxgbxfgbxfgb uno	2014-02-27	f	f	2014-02-27 23:59:35.896759+01	f	2014-02-27 23:59:35.896759+01		0	0	555	85	300	150
411	BIG COLLIDER	2014-02-27	f	f	2014-02-27 23:59:35.807754+01	f	2014-02-27 23:59:35.857757+01		0	0	66	127	200	80
407	Obstacle 1 	2014-02-26	f	f	2014-02-26 23:51:03.533464+01	f	2014-02-26 23:51:03.571466+01		0	0	676	42	299	162
413		2014-02-27	f	f	2014-02-27 23:59:35.900759+01	f	2014-02-27 23:59:35.901759+01		0	0	784	286	300	150
414	La croix javel	2014-02-28	f	f	2014-02-28 11:40:41.315755+01	f	2014-02-28 11:40:41.315755+01		0	0	310	66	300	150
415	Notre-dame-de-paris	2014-02-28	f	f	2014-02-28 11:40:41.478764+01	f	2014-02-28 11:40:41.478764+01		0	0	332	319	300	150
416	Oasis oasis ah	2014-02-28	f	f	2014-02-28 11:40:41.485764+01	f	2014-02-28 11:40:41.485764+01		0	0	822	305	300	150
424		2014-03-02	f	f	2014-03-02 22:30:28.06186+01	f	2014-03-02 22:30:28.06186+01		0	0	30	360	300	150
421	<font color="#db3737" face="Times New Roman"><u style="font-size: medium; font-style: italic;">g links a DOM element’cvbxv</u><u><font size="3">wxcvvvvwv</font><i style="font-size: medium;">wvvvvvvxcv</i><font size="3">wvvxv</font><font size="4">wxcvxcv</font><font size="6">wxcvxcv</font></u><u style="font-size: medium; font-style: italic;">s fowcvcus state with a viewmod<b>el property. It is fgsdfg</b>fga nice day</u><u style="font-size: medium;">&nbsp;? Isn't it ?</u></font>	2014-03-02	f	f	2014-03-02 22:30:28.076861+01	f	2014-03-02 22:30:28.076861+01		0	0	13	92	314	235
422	<font color="#ddd51f" face="cursive" size="5"><b>Foo fighters - All my life</b></font>	2014-03-02	f	f	2014-03-02 22:30:28.082861+01	f	2014-03-02 22:30:28.083861+01		0	0	426	51	200	104
423	<span style="">var</span> <span style="">colliders_selector</span> <span style="color: rgb(102, 102, 102);">=</span> <span style="color: rgb(186, 33, 33);">".collider"</span><span style="">;</span>\n<span style="">var</span> <span style="">obstacles_selector</span> <span style="color: rgb(102, 102, 102);">=</span> <span style="color: rgb(186, 33, 33);">".obstacle"</span><span style="">;</span>\n<span style="">var</span> <span style="">hits</span> <span style="color: rgb(102, 102, 102);">=</span> <span style="">$</span><span style="">(</span><span style="">colliders_selector</span><span style="">).</span><span style="">collision</span><span style="">(</span><span style="">obstacles_selector</span><span style="">)</span>	2014-03-02	f	f	2014-03-02 22:30:28.014857+01	f	2014-03-02 22:30:28.05286+01		0	0	998	88	380	150
425	<b><font color="#d223c7" face="Comfortaa" size="3"><i><u>Célèbre rue à Rio de Janeiro<img src="/media/04a4d5ec95085f8996eb4386dced3983.png"></u></i></font></b>	2014-03-03	f	f	2014-03-05 18:03:01.763663+01	f	2014-03-05 18:03:01.810666+01	background-color: rgba(216, 208, 188, 0.309804); background-position: initial initial; background-repeat: initial initial;	0	0	0	200	251	113
426	<div style="text-align: right;"><u style="font-family: Arial; background-color: rgb(255, 255, 255);"><i><b><font color="#cc3333" size="4">rouge-gorge</font></b></i></u></div><div><font color="#cc3333" size="4"><b><i><u><br></u></i></b></font><div style="text-align: right;"><font size="6"><font color="#ff9e0c">&nbsp;</font><font face="Times New Roman" color="#ff910c"><b><i>flamboyant</i></b></font></font></div></div>	2014-03-03	f	f	2014-03-05 18:03:01.88767+01	f	2014-03-05 18:03:01.88867+01	background-color: rgba(106, 223, 33, 0.0980392); background-position: initial initial; background-repeat: initial initial;	0	0	690	15	299	120
417	HP48S	2014-03-01	f	f	2014-03-01 22:56:26.096353+01	f	2014-03-01 22:56:26.128355+01		0	0	478	256	300	150
418	Jeux olyfgsmpiques de Sotchi	2014-03-01	f	f	2014-03-01 22:56:26.20836+01	f	2014-03-01 22:56:26.20936+01		0	0	581	24	300	150
419	<img src="/media/d112fa23ae58f38277eb855fb3c8bbc1.png">Un calendrier !!!	2014-03-01	f	f	2014-03-01 22:56:26.21636+01	f	2014-03-01 22:56:26.21636+01		0	0	110	263	300	150
427	<div style="text-align: justify;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-family: Arial, Helvetica, sans-serif; font-size: 16px; font-weight: bold; line-height: 16px; white-space: normal;">Objectifs</span></div><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; white-space: normal; background-color: rgb(255, 255, 255);"></span><div class="sous-partie" style="margin: 5px 0px 22px; padding: 0px 0px 0px 15px; border-width: 0px 0px 0px 4px; border-left-style: solid; border-left-color: rgb(198, 198, 198); outline: 0px; font-size: 12px; vertical-align: baseline; background-color: rgb(255, 255, 255); font-family: Arial, Helvetica, sans-serif; line-height: 16px; white-space: normal;"><p style="text-align: left; margin-bottom: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background-color: transparent;"><font color="#000000">Maîtriser les outils nécessaires au travail quotidien des photographes pour éditer, indexer, retoucher et envoyer leurs images numériques.</font></p></div><span style="margin: 0px; padding: 0px; border: 0px; outline: 0px; font-size: 16px; vertical-align: baseline; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font-weight: bold; font-family: Arial, Helvetica, sans-serif; line-height: 16px; white-space: normal;">Prérequis</span><span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 16px; white-space: normal; background-color: rgb(255, 255, 255);"></span><div class="sous-partie" style="margin: 5px 0px 22px; padding: 0px 0px 0px 15px; border-width: 0px 0px 0px 4px; border-left-style: solid; border-left-color: rgb(198, 198, 198); outline: 0px; font-size: 12px; vertical-align: baseline; background-color: rgb(255, 255, 255); color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; line-height: 16px; white-space: normal;"><p style="margin-bottom: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; background-color: transparent;">Produire du contenu photo et/ou travailler les photos avant leur diffusion.</p></div>	2014-03-03	f	f	2014-03-05 18:03:01.899671+01	f	2014-03-05 18:03:01.899671+01	background-color: rgba(65, 219, 107, 0.0980392); background-position: initial initial; background-repeat: initial initial;	0	0	343	284	409	245
431	<div style="text-align: center;"><i><font size="5" face="Times New Roman" color="#f53030">Un bateau s'en va !!</font></i></div>	2014-03-06	f	f	2014-03-06 23:23:03.819073+01	f	2014-03-06 23:23:03.861075+01	background-color: rgba(241, 183, 2, 0.2); background-position: initial initial; background-repeat: initial initial;	0	0	0	0	398	80
432	<div style="text-align: center;"><i style="font-family: 'Times New Roman'; font-size: small;"><font color="#42cd28">sur le dos d'un camion !!</font></i></div>	2014-03-06	f	f	2014-03-06 23:23:03.869076+01	f	2014-03-06 23:23:03.869076+01	background-color: rgba(222, 52, 136, 0.168627); background-position: initial initial; background-repeat: initial initial;	0	0	60	177	286	80
434	<div style="text-align: center;"><font color="#e6341a" size="4"><b><i>Et l'avion, va-t-il atterrir ici ?</i></b></font></div>	2014-03-06	f	f	2014-03-06 23:23:03.879076+01	f	2014-03-06 23:23:03.879076+01	background-color: rgba(58, 206, 72, 0); background-position: initial initial; background-repeat: initial initial;	0	0	643	49	274	115
429	<div style="text-align: right;"><b><font size="3" face="cursive" color="#e74848">C'est est un signe !</font></b></div>	2014-03-05	f	f	2014-03-06 18:37:32.409212+01	f	2014-03-06 18:37:32.452215+01	background: none repeat scroll 0% 0% rgba(28, 210, 42, 0.13);	0	0	237	341	372	80
435	<div style="text-align: center;"><span style="background-color: rgba(255, 255, 255, 0);"><font color="#e6341a" size="4"><i>Ou bien là ?</i></font></span></div>	2014-03-06	f	f	2014-03-06 23:23:03.913078+01	f	2014-03-06 23:23:03.914078+01	background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;	0	0	982	113	200	80
436	<div style="text-align: center;"><font color="#22af1e" face="cursive" size="7"><i><b><br></b></i></font></div><div style="text-align: center;"><font color="#22af1e" face="cursive" size="7"><i><b><u>Plutôt ici !!</u></b></i></font></div>	2014-03-06	f	f	2014-03-06 23:23:03.921079+01	f	2014-03-06 23:23:03.921079+01	background-color: rgba(255, 255, 255, 0); background-position: initial initial; background-repeat: initial initial;	0	0	719	194	303	148
\.


--
-- TOC entry 1975 (class 0 OID 17823)
-- Dependencies: 162
-- Data for Name: core_postuser; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY core_postuser (id, contenu, date, journee_generique, date_creation, inactif, date_modification, style, heure, "left", top, width, height, recopie_tel_quel) FROM stdin;
\.


--
-- TOC entry 1965 (class 0 OID 17657)
-- Dependencies: 143
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY django_admin_log (id, action_time, user_id, content_type_id, object_id, object_repr, action_flag, change_message) FROM stdin;
\.


--
-- TOC entry 1972 (class 0 OID 17764)
-- Dependencies: 157
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY django_content_type (id, name, app_label, model) FROM stdin;
1	log entry	admin	logentry
2	permission	auth	permission
3	group	auth	group
4	user	auth	user
5	content type	contenttypes	contenttype
6	session	sessions	session
7	migration history	south	migrationhistory
8	Post utilisateur	core	postuser
9	Post générique	core	postgenerique
10	Domaine	core	domaine
11	Pays	core	pays
12	Cadre	core	cadre
13	BackGround	core	background
\.


--
-- TOC entry 1973 (class 0 OID 17782)
-- Dependencies: 158
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- TOC entry 1974 (class 0 OID 17792)
-- Dependencies: 160
-- Data for Name: south_migrationhistory; Type: TABLE DATA; Schema: public; Owner: and_today_connect
--

COPY south_migrationhistory (id, app_name, migration, applied) FROM stdin;
1	core	0001_initial	2014-01-16 01:16:04.205812+01
2	core	0002_auto__del_field_postuser_user__chg_field_postuser_style__chg_field_pos	2014-01-16 15:20:27.132215+01
3	core	0003_auto__add_field_postuser_left__add_field_postuser_top__add_field_postg	2014-01-18 22:06:45.052328+01
4	core	0004_auto__add_field_postuser_width__add_field_postuser_height__add_field_p	2014-01-19 14:46:45.763721+01
5	core	0005_auto__chg_field_postgenerique_date__chg_field_postuser_date	2014-01-21 23:22:30.910424+01
6	core	0006_auto__chg_field_postuser_date__chg_field_postgenerique_date	2014-01-21 23:27:51.082736+01
7	core	0007_auto__chg_field_postgenerique_contenu__chg_field_postuser_contenu	2014-02-03 11:01:09.280803+01
8	core	0008_auto__add_cadre	2014-02-18 12:18:38.023831+01
9	core	0009_auto__add_background__del_field_cadre_images_de_fond__add_field_cadre_	2014-02-23 10:45:21.076377+01
10	core	0010_auto__add_field_postuser_recopie_tel_quel	2014-02-23 10:56:08.732421+01
\.


--
-- TOC entry 1909 (class 2606 OID 17701)
-- Dependencies: 149 149
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- TOC entry 1904 (class 2606 OID 17686)
-- Dependencies: 147 147 147
-- Name: auth_group_permissions_group_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id);


--
-- TOC entry 1907 (class 2606 OID 17684)
-- Dependencies: 147 147
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 1912 (class 2606 OID 17699)
-- Dependencies: 149 149
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- TOC entry 1899 (class 2606 OID 17676)
-- Dependencies: 145 145 145
-- Name: auth_permission_content_type_id_codename_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename);


--
-- TOC entry 1901 (class 2606 OID 17674)
-- Dependencies: 145 145
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- TOC entry 1915 (class 2606 OID 17714)
-- Dependencies: 151 151
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 1918 (class 2606 OID 17716)
-- Dependencies: 151 151 151
-- Name: auth_user_groups_user_id_group_id_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id);


--
-- TOC entry 1926 (class 2606 OID 17744)
-- Dependencies: 155 155
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- TOC entry 1921 (class 2606 OID 17729)
-- Dependencies: 153 153
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 1924 (class 2606 OID 17731)
-- Dependencies: 153 153 153
-- Name: auth_user_user_permissions_user_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_key UNIQUE (user_id, permission_id);


--
-- TOC entry 1928 (class 2606 OID 17746)
-- Dependencies: 155 155
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- TOC entry 1953 (class 2606 OID 50796)
-- Dependencies: 172 172
-- Name: core_background_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_background
    ADD CONSTRAINT core_background_pkey PRIMARY KEY (id);


--
-- TOC entry 1951 (class 2606 OID 50779)
-- Dependencies: 170 170
-- Name: core_cadre_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_cadre
    ADD CONSTRAINT core_cadre_pkey PRIMARY KEY (id);


--
-- TOC entry 1947 (class 2606 OID 17850)
-- Dependencies: 166 166
-- Name: core_domaine_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_domaine
    ADD CONSTRAINT core_domaine_pkey PRIMARY KEY (id);


--
-- TOC entry 1949 (class 2606 OID 17858)
-- Dependencies: 168 168
-- Name: core_pays_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_pays
    ADD CONSTRAINT core_pays_pkey PRIMARY KEY (id);


--
-- TOC entry 1945 (class 2606 OID 17842)
-- Dependencies: 164 164
-- Name: core_postgenerique_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_postgenerique
    ADD CONSTRAINT core_postgenerique_pkey PRIMARY KEY (id);


--
-- TOC entry 1941 (class 2606 OID 17831)
-- Dependencies: 162 162
-- Name: core_postuser_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY core_postuser
    ADD CONSTRAINT core_postuser_pkey PRIMARY KEY (id);


--
-- TOC entry 1895 (class 2606 OID 17666)
-- Dependencies: 143 143
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- TOC entry 1931 (class 2606 OID 17771)
-- Dependencies: 157 157 157
-- Name: django_content_type_app_label_model_key; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_key UNIQUE (app_label, model);


--
-- TOC entry 1933 (class 2606 OID 17769)
-- Dependencies: 157 157
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- TOC entry 1936 (class 2606 OID 17789)
-- Dependencies: 158 158
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- TOC entry 1939 (class 2606 OID 17800)
-- Dependencies: 160 160
-- Name: south_migrationhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: and_today_connect; Tablespace: 
--

ALTER TABLE ONLY south_migrationhistory
    ADD CONSTRAINT south_migrationhistory_pkey PRIMARY KEY (id);


--
-- TOC entry 1910 (class 1259 OID 17806)
-- Dependencies: 149
-- Name: auth_group_name_like; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_group_name_like ON auth_group USING btree (name varchar_pattern_ops);


--
-- TOC entry 1902 (class 1259 OID 17804)
-- Dependencies: 147
-- Name: auth_group_permissions_group_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_group_permissions_group_id ON auth_group_permissions USING btree (group_id);


--
-- TOC entry 1905 (class 1259 OID 17805)
-- Dependencies: 147
-- Name: auth_group_permissions_permission_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_group_permissions_permission_id ON auth_group_permissions USING btree (permission_id);


--
-- TOC entry 1897 (class 1259 OID 17803)
-- Dependencies: 145
-- Name: auth_permission_content_type_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_permission_content_type_id ON auth_permission USING btree (content_type_id);


--
-- TOC entry 1913 (class 1259 OID 17808)
-- Dependencies: 151
-- Name: auth_user_groups_group_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_user_groups_group_id ON auth_user_groups USING btree (group_id);


--
-- TOC entry 1916 (class 1259 OID 17807)
-- Dependencies: 151
-- Name: auth_user_groups_user_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_user_groups_user_id ON auth_user_groups USING btree (user_id);


--
-- TOC entry 1919 (class 1259 OID 17810)
-- Dependencies: 153
-- Name: auth_user_user_permissions_permission_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_permission_id ON auth_user_user_permissions USING btree (permission_id);


--
-- TOC entry 1922 (class 1259 OID 17809)
-- Dependencies: 153
-- Name: auth_user_user_permissions_user_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_user_id ON auth_user_user_permissions USING btree (user_id);


--
-- TOC entry 1929 (class 1259 OID 17811)
-- Dependencies: 155
-- Name: auth_user_username_like; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX auth_user_username_like ON auth_user USING btree (username varchar_pattern_ops);


--
-- TOC entry 1942 (class 1259 OID 17876)
-- Dependencies: 164
-- Name: core_postgenerique_domaine_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX core_postgenerique_domaine_id ON core_postgenerique USING btree (domaine_id);


--
-- TOC entry 1943 (class 1259 OID 17870)
-- Dependencies: 164
-- Name: core_postgenerique_pays_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX core_postgenerique_pays_id ON core_postgenerique USING btree (pays_id);


--
-- TOC entry 1893 (class 1259 OID 17802)
-- Dependencies: 143
-- Name: django_admin_log_content_type_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX django_admin_log_content_type_id ON django_admin_log USING btree (content_type_id);


--
-- TOC entry 1896 (class 1259 OID 17801)
-- Dependencies: 143
-- Name: django_admin_log_user_id; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX django_admin_log_user_id ON django_admin_log USING btree (user_id);


--
-- TOC entry 1934 (class 1259 OID 17813)
-- Dependencies: 158
-- Name: django_session_expire_date; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX django_session_expire_date ON django_session USING btree (expire_date);


--
-- TOC entry 1937 (class 1259 OID 17812)
-- Dependencies: 158
-- Name: django_session_session_key_like; Type: INDEX; Schema: public; Owner: and_today_connect; Tablespace: 
--

CREATE INDEX django_session_session_key_like ON django_session USING btree (session_key varchar_pattern_ops);


--
-- TOC entry 1957 (class 2606 OID 17687)
-- Dependencies: 1900 145 147
-- Name: auth_group_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1959 (class 2606 OID 17717)
-- Dependencies: 149 151 1911
-- Name: auth_user_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1961 (class 2606 OID 17732)
-- Dependencies: 1900 145 153
-- Name: auth_user_user_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1955 (class 2606 OID 17772)
-- Dependencies: 143 1932 157
-- Name: content_type_id_refs_id_93d2d1f8; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT content_type_id_refs_id_93d2d1f8 FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1956 (class 2606 OID 17777)
-- Dependencies: 157 145 1932
-- Name: content_type_id_refs_id_d043b34a; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT content_type_id_refs_id_d043b34a FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1964 (class 2606 OID 17871)
-- Dependencies: 1946 164 166
-- Name: domaine_id_refs_id_05c43ec2; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_postgenerique
    ADD CONSTRAINT domaine_id_refs_id_05c43ec2 FOREIGN KEY (domaine_id) REFERENCES core_domaine(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1958 (class 2606 OID 17702)
-- Dependencies: 147 1911 149
-- Name: group_id_refs_id_f4b32aac; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT group_id_refs_id_f4b32aac FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1963 (class 2606 OID 17865)
-- Dependencies: 168 164 1948
-- Name: pays_id_refs_id_55dd248c; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY core_postgenerique
    ADD CONSTRAINT pays_id_refs_id_55dd248c FOREIGN KEY (pays_id) REFERENCES core_pays(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1960 (class 2606 OID 17752)
-- Dependencies: 155 1925 151
-- Name: user_id_refs_id_40c41112; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT user_id_refs_id_40c41112 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1962 (class 2606 OID 17757)
-- Dependencies: 155 153 1925
-- Name: user_id_refs_id_4dc23c39; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT user_id_refs_id_4dc23c39 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1954 (class 2606 OID 17747)
-- Dependencies: 143 155 1925
-- Name: user_id_refs_id_c0d12874; Type: FK CONSTRAINT; Schema: public; Owner: and_today_connect
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT user_id_refs_id_c0d12874 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 1985 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-03-07 20:54:19

--
-- PostgreSQL database dump complete
--

