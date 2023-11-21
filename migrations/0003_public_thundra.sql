CREATE TABLE IF NOT EXISTS "royal"."command_execution" (
	"id" uuid PRIMARY KEY NOT NULL,
	"commandId" uuid NOT NULL,
	"discordUserId" uuid NOT NULL,
	"discordGuildMemberId" uuid NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."command" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"numAllowedUses" integer NOT NULL,
	"cooldownInSeconds" integer NOT NULL,
	"deleted" boolean DEFAULT false NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."guild_command" (
	"id" uuid PRIMARY KEY NOT NULL,
	"commandId" uuid NOT NULL,
	"discordGuildId" uuid NOT NULL,
	"numAllowedUses" integer NOT NULL,
	"cooldownInSeconds" integer NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	"updatedAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "royal"."discord_guild_member" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "royal"."discord_guild" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "royal"."discord_user" ADD PRIMARY KEY ("id");