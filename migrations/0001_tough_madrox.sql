ALTER TABLE "royal"."discord_guild_member" ADD COLUMN "snowflake" text NOT NULL;--> statement-breakpoint
ALTER TABLE "royal"."discord_guild_member" DROP COLUMN IF EXISTS "memberId";