-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.Events (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title character varying,
  description text,
  date date,
  city character varying,
  created_by bigint,
  CONSTRAINT Events_pkey PRIMARY KEY (id),
  CONSTRAINT Events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.Users(id)
);


CREATE TABLE public.RSVPs (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  user_id bigint,
  event_id bigint,
  status character varying,
  CONSTRAINT RSVPs_pkey PRIMARY KEY (id),
  CONSTRAINT RSVPs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.Users(id),
  CONSTRAINT RSVPs_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.Events(id)
  CONSTRAINT rsvps_user_event_unique UNIQUE (user_id, event_id);
);


CREATE TABLE public.Users (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text,
  email character varying UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT Users_pkey PRIMARY KEY (id)
);


-- Sample Users (at least 10)
INSERT INTO "Users" (id, name, email) VALUES
(1, 'Alice Johnson', 'alice.j@example.com'),
(2, 'Bob Williams', 'bob.w@example.com'),
(3, 'Charlie Brown', 'charlie.b@example.com'),
(4, 'Diana Prince', 'diana.p@example.com'),
(5, 'Ethan Hunt', 'ethan.h@example.com'),
(6, 'Fiona Glenanne', 'fiona.g@example.com'),
(7, 'George Costanza', 'george.c@example.com'),
(8, 'Hannah Abbott', 'hannah.a@example.com'),
(9, 'Ian Malcolm', 'ian.m@example.com'),
(10, 'Jane Smith', 'jane.s@example.com');


-- Sample Events (at least 5)
INSERT INTO "Events" (id, title, description, date, city, created_by) VALUES
(221001, 'City Tech Meetup', 'A networking event for developers and tech enthusiasts.', '2025-10-20 18:00:00+00', 'San Francisco', 1),
(221002, 'Community Clean-Up', 'Join us to help clean up the local park.', '2025-09-15 10:00:00+00', 'New York', 2),
(221003, 'Web Development Workshop', 'Learn the basics of modern web development.', '2025-11-05 14:00:00+00', 'London', 3),
(221004, 'Art Exhibition', 'Discover local talent at our new gallery.', '2025-10-25 19:30:00+00', 'Paris', 4),
(221005, 'Gardening Club Meeting', 'Discuss tips for a great autumn garden.', '2025-09-22 17:00:00+00', 'Tokyo', 5);

-- Sample RSVPs (at least 20)
INSERT INTO "RSVPs" (user_id, event_id, status) VALUES
(1, 221002, 'Yes'),
(2, 221001, 'Yes'),
(3, 221002, 'Maybe'),
(4, 221003, 'Yes'),
(5, 221004, 'No'),
(6, 221005, 'Yes'),
(7, 221001, 'Yes'),
(8, 221002, 'Yes'),
(9, 221003, 'Maybe'),
(10, 221004, 'Yes'),
(1, 221003, 'No'),
(2, 221004, 'Yes'),
(3, 221001, 'Yes'),
(4, 221002, 'No'),
(5, 221003, 'Maybe'),
(6, 221004, 'Maybe'),
(7, 221005, 'No'),
(8, 221001, 'No'),
(9, 221002, 'Yes'),
(10, 221003, 'Yes');