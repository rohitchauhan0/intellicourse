
import { boolean, integer, json, pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const CourseList = pgTable("course-list", {
  id: serial("id").primaryKey(),
  courseId: varchar("course-Id").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("include-video").notNull().default("Yes"),
  courseOutput: json("course-output").notNull(),
  createdBy: varchar("created-by").notNull(),
  courseBanner: varchar("course-banner").default("/book.png"),
  publish: boolean("publish").notNull().default(false),
  rating: integer("rating").notNull().default(0),
  role: varchar("role").notNull(),
});

export const Chapter = pgTable("chapter", {
  id: serial("id").primaryKey(),
  courseId: varchar("course-Id").notNull(),
  chapterId: integer("chapter-id").notNull(),
  content: json("content").notNull(),
  videoId: varchar("video-id").notNull(),
})

export const quizzModel = pgTable("quizz-model", {
  id: serial("id").primaryKey(),
  topic: varchar("topic").notNull(),
  level: varchar("level").notNull(),
  number: integer("number").notNull(),
  createdBy: varchar("created-by").notNull(),
  question: json("question").notNull(),
  role: varchar("role").notNull(),
  quizzId: varchar("quizz-id").notNull(),
  createdAt: timestamp("created-at").defaultNow().notNull(),  
});
