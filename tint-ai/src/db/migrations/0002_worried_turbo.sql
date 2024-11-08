CREATE TABLE IF NOT EXISTS "policies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"premium" integer,
	"limit" integer,
	"deductible" integer,
	"quote_id" uuid NOT NULL,
	"underwriting_details_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "policies" ADD CONSTRAINT "policies_underwriting_details_id_underwriting_details_id_fk" FOREIGN KEY ("underwriting_details_id") REFERENCES "underwriting_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
