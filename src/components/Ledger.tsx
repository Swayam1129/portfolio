import type { LedgerRow } from "@/content/profile";

/** My commits on each team project, from the repositories' histories (merge commits excluded). */
export function Ledger({ rows }: { rows: LedgerRow[] }) {
  const totalMine = rows.reduce((n, r) => n + r.mine, 0);

  return (
    <figure className="ledger">
      <figcaption className="ledger-cap">
        <strong>{totalMine} commits</strong> across {rows.length} team projects
      </figcaption>
      <table>
        <thead>
          <tr>
            <th scope="col">Project</th>
            <th scope="col" className="num">Team</th>
            <th scope="col">My share of commits</th>
            <th scope="col" className="num">Rank</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const pct = Math.round((r.mine / r.total) * 100);
            return (
              <tr key={r.project}>
                <th scope="row">
                  {r.slug ? <a href={`#${r.slug}-h`}>{r.project}</a> : r.project}
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
                    {r.mine} of {r.total}
                  </span>
                </td>
                <td className="num ledger-rank">{r.rank ?? "–"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="ledger-note">Counted from each repository&apos;s history, merge commits excluded.</p>
    </figure>
  );
}
