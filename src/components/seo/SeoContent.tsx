import { profile } from "@/src/data/profile";
import { jobs } from "@/src/data/experience";
import { projects } from "@/src/data/projects";
import { buildPersonJsonLd } from "@/src/lib/seo";

export function SeoContent() {
  const jsonLd = buildPersonJsonLd(profile);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only" aria-hidden={false}>
        <h1>
          {profile.name} — {profile.title}
        </h1>
        <p>{profile.summary}</p>
        <section>
          <h2>Experiencia profesional</h2>
          <ul>
            {jobs.map((job) => (
              <li key={`${job.company}-${job.role}`}>
                {job.role} en {job.company}
                {job.client ? ` — ${job.client}` : ""} ({job.period})
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Proyectos</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                {project.name}: {project.description}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
