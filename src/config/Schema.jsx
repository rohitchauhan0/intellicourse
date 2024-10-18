import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("course-list", {
  id: serial("id").primaryKey(),
  courseId: varchar("course-Id").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  includeVideo: varchar("include-video").notNull().default("Yes"),
  courseOutput: json("course-output").notNull(),
  createdBy: varchar("created-by").notNull(),
  userName: varchar("user-name"),
  userProfileImg: varchar("user-profile-img"),
  courseBanner: varchar("course-banner").default("/book-icon.png"),
  publish: boolean("publish").notNull().default(false),
  rating: integer("rating").notNull().default(0),
});

export const Chapter = pgTable("chapter", {
  id: serial("id").primaryKey(),
  courseId: varchar("course-Id").notNull(),
  chapterId: integer("chapter-id").notNull(),
  content: json("content").notNull(),
  videoId: varchar("video-id").notNull(),
})