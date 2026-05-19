import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, LogOut, Download, ChevronRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin/intake")({
  head: () => ({
    meta: [
      { title: "Intake Submissions — Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminIntakePage,
});

type Submission = {
  id: string;
  business_name: string;
  contact_email: string | null;
  primary_phone: string | null;
  payload: Record<string, unknown>;
  sop_file_path: string | null;
  created_at: string;
};

function AdminIntakePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const userId = sess.session.user.id;
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setIsAdmin(true);
      const { data, error } = await supabase
        .from("voice_intake_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setSubmissions((data ?? []) as Submission[]);
      setLoading(false);
    };
    init();
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const downloadSop = async (path: string) => {
    const { data, error } = await supabase.storage.from("intake-sops").createSignedUrl(path, 60);
    if (error || !data) {
      toast.error("Could not generate download link");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(submissions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vektiss-intake-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">No access</h1>
          <p className="mt-2 text-muted-foreground">
            Your account is signed in but not an admin. An existing admin needs to grant you the admin role in the database.
          </p>
          <Button onClick={signOut} variant="outline" className="mt-6">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground">
              VEKTISS
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-sm font-semibold">Intake Submissions</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={exportJson} disabled={!submissions.length}>
              <Download className="h-4 w-4" /> Export JSON
            </Button>
            <Button size="sm" variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {selected ? (
          <SubmissionDetail submission={selected} onBack={() => setSelected(null)} onDownloadSop={downloadSop} />
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">{submissions.length} submission{submissions.length !== 1 ? "s" : ""}</p>
            {submissions.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground text-sm">
                No submissions yet.
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Business</th>
                      <th className="text-left px-4 py-3 font-medium">Email</th>
                      <th className="text-left px-4 py-3 font-medium">Phone</th>
                      <th className="text-left px-4 py-3 font-medium">Submitted</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => setSelected(s)}
                        className="border-t border-border hover:bg-muted/30 cursor-pointer"
                      >
                        <td className="px-4 py-3 font-medium">{s.business_name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.contact_email ?? "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.primary_phone ?? "—"}</td>
                        <td className="px-4 py-3 text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">
                          <ChevronRight className="h-4 w-4 text-muted-foreground inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function SubmissionDetail({
  submission,
  onBack,
  onDownloadSop,
}: {
  submission: Submission;
  onBack: () => void;
  onDownloadSop: (path: string) => void;
}) {
  return (
    <div>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4" /> Back to list
      </Button>
      <div className="rounded-lg border border-border bg-card p-6 mb-6">
        <h2 className="text-xl font-semibold">{submission.business_name}</h2>
        <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-4">
          <span>Submitted {new Date(submission.created_at).toLocaleString()}</span>
          {submission.contact_email && <span>Email: {submission.contact_email}</span>}
          {submission.primary_phone && <span>Phone: {submission.primary_phone}</span>}
        </div>
        {submission.sop_file_path && (
          <Button size="sm" variant="outline" className="mt-4" onClick={() => onDownloadSop(submission.sop_file_path!)}>
            <Download className="h-4 w-4" /> Download uploaded SOP
          </Button>
        )}
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">Full submission</h3>
        <pre className="text-xs whitespace-pre-wrap break-words bg-muted/30 p-4 rounded font-mono overflow-auto max-h-[600px]">
          {JSON.stringify(submission.payload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
