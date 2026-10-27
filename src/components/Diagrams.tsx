// Architecture sketches drawn from the real configs (compose.yaml, the design docs).
// Plain HTML so they stay readable to screen readers and scale on phones.

export function CreeArchitecture() {
  return (
    <figure className="diagram" aria-labelledby="cree-diagram-cap">
      <div className="dg-col">
        <div className="dg-box dg-quiet">Reader&apos;s browser</div>
        <div className="dg-arrow" aria-hidden="true">HTTPS</div>
        <div className="dg-box">
          <strong>Caddy</strong>
          <span>reverse proxy, automatic HTTPS</span>
        </div>
        <div className="dg-arrow" aria-hidden="true" />
        <div className="dg-split">
          <div className="dg-box dg-accent">
            <strong>SvelteKit app</strong>
            <span>pages and API routes, Node</span>
          </div>
          <ul className="dg-services" aria-label="ALTLab services the app calls">
            <li>Korp corpus API</li>
            <li>itwêwina dictionary</li>
            <li>Speech audio</li>
          </ul>
        </div>
        <div className="dg-arrow" aria-hidden="true" />
        <div className="dg-box">
          <strong>PostgreSQL</strong>
        </div>
      </div>
      <div className="dg-pipeline" aria-label="Release pipeline">
        <span>Pull request</span>
        <span>CI on self-hosted runner</span>
        <span>Staging, automatic</span>
        <span>Production, one click</span>
      </div>
      <figcaption id="cree-diagram-cap">The production stack I set up, each box a container in Docker Compose</figcaption>
    </figure>
  );
}

export function Federation() {
  return (
    <figure className="diagram" aria-labelledby="fed-diagram-cap">
      <div className="dg-fed">
        <div className="dg-box dg-accent">
          <strong>Our node</strong>
          <span>Django, PostgreSQL</span>
        </div>
        <div className="dg-wire" aria-hidden="true">
          <span>POST /api/authors/&#123;id&#125;/inbox</span>
          <span className="dg-line" />
          <span>follows, posts, likes</span>
        </div>
        <div className="dg-box">
          <strong>Partner node</strong>
          <span>another team&apos;s server</span>
        </div>
      </div>
      <ul className="dg-notes">
        <li>Each node authenticates with HTTP Basic Auth</li>
        <li>Authors and posts keep one global ID across servers</li>
        <li>Both sides must agree on every follow</li>
      </ul>
      <figcaption id="fed-diagram-cap">How independent servers share a social graph</figcaption>
    </figure>
  );
}
