import type { CaseStudy } from "@/content/profile";
import { GameClip } from "@/components/GameClip";
import { CreeArchitecture, EventEaseFlow, Federation } from "@/components/Diagrams";

export function StudyVisual({ kind }: { kind: CaseStudy["visual"] }) {
  if (kind === "galaga") return <GameClip />;
  if (kind === "federation") return <Federation />;
  if (kind === "eventease") return <EventEaseFlow />;
  return <CreeArchitecture />;
}
