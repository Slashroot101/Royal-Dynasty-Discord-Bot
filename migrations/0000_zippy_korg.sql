CREATE SCHEMA "royal";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."discord_guild" (
	"id" uuid NOT NULL,
	"snowflake" text NOT NULL,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."discord_guild_member" (
	"id" uuid NOT NULL,
	"discordUserId" uuid NOT NULL,
	"discordGuildId" uuid NOT NULL,
	"memberId" uuid NOT NULL,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."discord_user" (
	"id" uuid NOT NULL,
	"snowflake" text NOT NULL,
	"createdAt" date DEFAULT now(),
	"updatedAt" date DEFAULT now()
);
