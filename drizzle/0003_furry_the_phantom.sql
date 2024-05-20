DO $$ BEGIN
 CREATE TYPE "public"."log_type" AS ENUM('login');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "logs" ADD COLUMN "type" "log_type" NOT NULL;