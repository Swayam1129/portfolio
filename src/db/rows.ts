import type { Project } from "../content/profile.ts";

/** Converts a project from profile.ts into a database row. */
export function projectToRow(p: Project, position: number) {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    details: p.details,
    stack: p.stack,
    period: p.period,
    context: p.context ?? null,
    repo: p.repo ?? null,
    live: p.live ?? null,
    featured: Boolean(p.featured),
    position,
  };
}
