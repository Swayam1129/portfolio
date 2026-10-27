import { asc, eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { profile, type Project } from "@/content/profile";

/** Projects from the database when configured (editable in /admin), otherwise from profile.ts. */
export async function getProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return profile.projects;
  try {
    const rows = await db
      .select()
      .from(schema.projects)
      .where(eq(schema.projects.visible, true))
      .orderBy(asc(schema.projects.position));
    if (rows.length === 0) return profile.projects;
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      summary: r.summary,
      details: r.details,
      stack: r.stack,
      period: r.period,
      context: r.context ?? undefined,
      repo: r.repo ?? undefined,
      live: r.live ?? undefined,
      featured: r.featured,
    }));
  } catch (err) {
    console.error("Falling back to profile.ts projects:", err);
    return profile.projects;
  }
}
