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

export function EventEaseFlow() {
  return (
    <figure className="diagram" aria-labelledby="ee-diagram-cap">
      <div className="dg-lanes">
        <div className="dg-lane">
          <p className="dg-lane-title">When something changes</p>
          <div className="dg-col">
            <div className="dg-box dg-quiet">A notification is written to Firestore</div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box dg-accent">
              <strong>sendNotification</strong>
              <span>Cloud Function, Firestore trigger</span>
            </div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box">
              <strong>Firebase Cloud Messaging</strong>
              <span>batched sends, retries, dead tokens removed</span>
            </div>
          </div>
        </div>
        <div className="dg-lane">
          <p className="dg-lane-title">On a schedule</p>
          <div className="dg-col">
            <div className="dg-box dg-accent">
              <strong>Entrant lottery</strong>
              <span>random draw, capped at open spots</span>
            </div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box">
              <strong>Invitations</strong>
              <span>accept or decline before the deadline</span>
            </div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box">
              <strong>Sorry notices</strong>
              <span>to everyone not chosen</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption id="ee-diagram-cap">The Cloud Functions I wrote keep entrants informed without anyone refreshing</figcaption>
    </figure>
  );
}

export function AccessUFlow() {
  return (
    <figure className="diagram" aria-labelledby="au-diagram-cap">
      <div className="dg-lanes">
        <div className="dg-lane">
          <p className="dg-lane-title">Indoors</p>
          <div className="dg-col">
            <div className="dg-box dg-quiet">Scan a QR checkpoint</div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box dg-accent">
              <strong>Building graph</strong>
              <span>shortest path from this node</span>
            </div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box">
              <strong>Spoken directions</strong>
              <span>reroutes on a wrong-path scan</span>
            </div>
          </div>
        </div>
        <div className="dg-lane">
          <p className="dg-lane-title">Outdoors</p>
          <div className="dg-col">
            <div className="dg-box dg-quiet">Say a destination</div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box dg-accent">
              <strong>Campus routing</strong>
              <span>Google Directions, geocoding, places</span>
            </div>
            <div className="dg-arrow" aria-hidden="true" />
            <div className="dg-box">
              <strong>Transit</strong>
              <span>ETS schedule, live arrivals, stop alerts</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption id="au-diagram-cap">The navigation I built: QR checkpoints inside, maps and buses outside</figcaption>
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
