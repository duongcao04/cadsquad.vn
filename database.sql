-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public._prisma_migrations (
  id character varying NOT NULL,
  checksum character varying NOT NULL,
  finished_at timestamp with time zone,
  migration_name character varying NOT NULL,
  logs text,
  rolled_back_at timestamp with time zone,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  applied_steps_count integer NOT NULL DEFAULT 0,
  CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Post (
  id text NOT NULL,
  thumbnailUrl text NOT NULL,
  bgCoverUrl text,
  countView integer NOT NULL DEFAULT 0,
  createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp without time zone NOT NULL,
  CONSTRAINT Post_pkey PRIMARY KEY (id)
);
CREATE TABLE public.PostTranslation (
  id text NOT NULL,
  postId text NOT NULL,
  language USER-DEFINED NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  shortDescription text,
  content text NOT NULL,
  tags ARRAY,
  seoTitle text,
  seoDescription text,
  seoKeywords ARRAY,
  CONSTRAINT PostTranslation_pkey PRIMARY KEY (id),
  CONSTRAINT PostTranslation_postId_fkey FOREIGN KEY (postId) REFERENCES public.Post(id)
);
CREATE TABLE public.ServiceType (
  id text NOT NULL,
  code text NOT NULL,
  createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp without time zone NOT NULL,
  CONSTRAINT ServiceType_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ServiceTypeTranslation (
  id text NOT NULL,
  serviceTypeId text NOT NULL,
  language USER-DEFINED NOT NULL,
  displayName text NOT NULL,
  description text,
  brochureUrl text,
  CONSTRAINT ServiceTypeTranslation_pkey PRIMARY KEY (id),
  CONSTRAINT ServiceTypeTranslation_serviceTypeId_fkey FOREIGN KEY (serviceTypeId) REFERENCES public.ServiceType(id)
);
CREATE TABLE public.Service (
  id text NOT NULL,
  orderNumber integer NOT NULL,
  serviceTypeId text,
  createdAt timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp without time zone NOT NULL,
  backgroundCoverId text,
  thumbnailId text,
  CONSTRAINT Service_pkey PRIMARY KEY (id),
  CONSTRAINT Service_serviceTypeId_fkey FOREIGN KEY (serviceTypeId) REFERENCES public.ServiceType(id),
  CONSTRAINT Service_thumbnailId_fkey FOREIGN KEY (thumbnailId) REFERENCES public.ServiceThumbnail(id),
  CONSTRAINT Service_backgroundCoverId_fkey FOREIGN KEY (backgroundCoverId) REFERENCES public.ServiceBackgroundCover(id)
);
CREATE TABLE public.ServiceTranslation (
  id text NOT NULL,
  serviceId text NOT NULL,
  language USER-DEFINED NOT NULL,
  slug text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  shortDescription text NOT NULL,
  content text NOT NULL,
  seoTitle text,
  seoDescription text,
  seoKeywords ARRAY,
  CONSTRAINT ServiceTranslation_pkey PRIMARY KEY (id),
  CONSTRAINT ServiceTranslation_serviceId_fkey FOREIGN KEY (serviceId) REFERENCES public.Service(id)
);
CREATE TABLE public.ServiceThumbnail (
  id text NOT NULL,
  url text NOT NULL,
  type USER-DEFINED NOT NULL DEFAULT 'ImagePng'::"ServiceThumbnailType",
  CONSTRAINT ServiceThumbnail_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ServiceBackgroundCover (
  id text NOT NULL,
  url text NOT NULL,
  type USER-DEFINED NOT NULL DEFAULT 'ImagePng'::"ServiceThumbnailType",
  CONSTRAINT ServiceBackgroundCover_pkey PRIMARY KEY (id)
);