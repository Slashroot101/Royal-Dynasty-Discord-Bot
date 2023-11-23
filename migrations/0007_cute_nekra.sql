CREATE TABLE IF NOT EXISTS "royal"."user_guild_bank" (
	"id" uuid PRIMARY KEY NOT NULL,
	"discordGuildId" uuid NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "royal"."user_guild_bank_transaction" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userGuildBankId" uuid NOT NULL,
	"amount" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
