import { ExperienceOrchestrator } from "@/src/features/orchestrator/ExperienceOrchestrator";
import { SeoContent } from "@/src/components/seo/SeoContent";

export default function Home() {
  return (
    <>
      <SeoContent />
      <ExperienceOrchestrator />
    </>
  );
}
