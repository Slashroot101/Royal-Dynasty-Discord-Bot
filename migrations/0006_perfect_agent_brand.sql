ALTER TABLE "royal"."discord_guild_member" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."discord_guild_member" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."discord_guild" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."discord_guild" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."discord_user" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."discord_user" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."command_execution" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."command_execution" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."command" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."command" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."guild_command" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "royal"."guild_command" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;