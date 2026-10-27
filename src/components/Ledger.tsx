import type { LedgerRow } from "@/content/profile";

/** How much of each team project I wrote: lines still in the final code (git blame) and commits (merges excluded). */
export function Ledger({ rows }: { rows: LedgerRow[] }) {
  const totalLines = rows.reduce((n, r) => n + r.linesMine, 0);

  return (
    <figure className="ledger">
      <figcaption className="ledger-cap">
        <strong>{totalLines.toLocaleString("en-CA")} lines</strong> of mine still in the final code of {rows.length} team projects
      </figcaption>
      <table>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col" className="num">Team</th>
            <th scope="col">Share of the final code I wrote</th>
            <th scope="col" className="num">Commits</th>
            <th scope="col" className="num">Rank</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const pct = Math.round((r.linesMine / r.linesTotal) * 100);
            return (
              <tr key={r.project}>
                <th scope="row">
                  {r.slug ? <a href={`#story-${r.slug}`}>{r.project}</a> : r.project}
                  <span className="ledger-kind">
                    {r.kind}, {r.period}
                  </span>
                </th>
                <td className="num">{r.team}</td>
                <td>
                  <span className="ledger-bar" aria-hidden="true">
                    <span style={{ width: `${Math.max(pct, 3)}%` }} />
                  </span>
                  <span className="ledger-count">
                    {pct}%, {r.linesMine.toLocaleString("en-CA")} of {r.linesTotal.toLocaleString("en-CA")} lines
                  </span>
                </td>
                <td className="num">
                  {r.mine}
                  <span className="ledger-kind">of {r.total}</span>
                </td>
                <td className="num ledger-rank">{r.rank ?? "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="ledger-note">
        Lines are those still in each project&apos;s final code, counted with git blame. Commits exclude merges. Rank is by
        lines or commits, whichever is higher.
      </p>
    </figure>
  );
}
