import type { InferSelectModel } from 'drizzle-orm';
import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from './user';

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type Session = InferSelectModel<typeof sessionTable>;
