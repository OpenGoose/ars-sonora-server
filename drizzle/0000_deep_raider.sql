CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(32) NOT NULL,
	"second_name" varchar(32),
	"last_name" varchar(32),
	"login" varchar(16) NOT NULL,
	"password" varchar(256),
	"email" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_login_unique" UNIQUE("login"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
