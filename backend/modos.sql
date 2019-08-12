DROP TABLE IF EXISTS "location";
DROP TABLE IF EXISTS "image";
DROP TABLE IF EXISTS "observation";
DROP TABLE IF EXISTS "participant";
DROP TABLE IF EXISTS "event";
DROP TABLE IF EXISTS "user";


CREATE TABLE "user" (
    "id" serial PRIMARY KEY,
    "pseudonym" character varying(50) NOT NULL,
    "email" character varying(50) NOT NULL,
    "password" character varying(50) NOT NULL,
    "age" integer NOT NULL,
    "gender" character(1),
    "helper" integer,
    "helper_frequency" integer,
    "mobility" integer NOT NULL
);

CREATE TABLE "event" (
    "id" serial PRIMARY KEY,
    "user_id" integer NOT NULL REFERENCES public.user(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "password" character varying(50),
    "begining" date NOT NULL,
    "ending" date NOT NULL,
    "objectif" character varying(255) NOT NULL,
    "number_of_images" integer
);

CREATE TABLE "participant" (
    "user_id" integer NOT NULL REFERENCES public.user(id) ON UPDATE CASCADE ON DELETE CASCADE,
    "event_id" integer NOT NULL REFERENCES public.event(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "observation" (
    "id" integer PRIMARY KEY,
    "obstacle" integer[] NOT NULL,
    "free_text" character varying(255),
    "impact" integer NOT NULL,
    "user_id" integer NOT NULL REFERENCES public.user(id) ON UPDATE CASCADE,
    "event_id" integer REFERENCES public.event(id) ON UPDATE CASCADE
);

CREATE TABLE "image" (
    "observation_id" integer PRIMARY KEY REFERENCES public.observation(id) ON UPDATE CASCADE,
    "image_path" character varying(50) NOT NULL,
    "x" integer NOT NULL,
    "y" integer NOT NULL,
    "width" integer NOT NULL,
    "height" integer NOT NULL
);

CREATE TABLE "location" (
    "observation_id" integer PRIMARY KEY REFERENCES public.observation(id) ON UPDATE CASCADE,
    "latitude" integer NOT NULL,
    "longitude" integer NOT NULL,
    "degree" integer NOT NULL
);