import { text, serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable('mockerInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jsonPosition: text('jobPosition').notNull(),
    jobDesc: text('jobDesc').notNull(), // Assuming jsonDesc should be jobDesc
    jobExperience: text('jobExperience').notNull(), // Assuming jsonExperience should be jobExperience
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }).notNull(), // Ensure createdAt is not null if it's a timestamp
    mockId: varchar('mockId', { length: 255 }).notNull()
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: varchar('correctAns'), // Fixed typo from 'correctAnse' to 'correctAns'
    userAns: text('userAns'),
    feedback: text('feedback'), // Fixed typo from 'feebback' to 'feedback'
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt'),
});
