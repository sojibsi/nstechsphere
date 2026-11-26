import { db } from '@/lib/store/local-db';
import { Activity } from 'lucide-react';

export default function AdminActivityLogsPage() {
  const logs = db.getActivityLogs();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
          System Activity & Audit Logs
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Immutable server-side trail of administrator operations, pricing changes, and order dispatches.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
        <table className="w-full text-xs text-left">
          <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Entity</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                <td className="py-3 px-4 text-neutral-400 text-[11px]">
                  {new Date(log.created_at).toLocaleString()}
                </td>
                <td className="py-3 px-4 font-sans font-semibold text-foreground">
                  {log.user_email || 'System'}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold text-foreground">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-neutral-500">
                  {log.entity_type} ({log.entity_id})
                </td>
                <td className="py-3 px-4 text-right font-sans text-neutral-400 text-[11px]">
                  {log.details ? JSON.stringify(log.details) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
