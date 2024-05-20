CREATE TABLE IF NOT EXISTS "logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(128),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
