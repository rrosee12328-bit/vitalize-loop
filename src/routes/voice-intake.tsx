import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/voice-intake")({
  head: () => ({
    meta: [
      { title: "Vektiss Voice Intake — Vektiss" },
      {
        name: "description",
        content:
          "Tell us about your business so we can configure Vektiss Voice — your AI voice assistant.",
      },
      { property: "og:title", content: "Vektiss Voice Intake — Vektiss" },
      {
        property: "og:description",
        content:
          "Complete this form so we can build and train your Vektiss Voice AI assistant.",
      },
    ],
  }),
  component: VoiceIntakePage,
});

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type Transferee = { name: string; title: string; phone: string; callTypes: string };
type FAQ = { question: string; answer: string };

function VoiceIntakePage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  // Section 1
  const [businessName, setBusinessName] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [hours, setHours] = useState<Record<string, string>>(
    Object.fromEntries(DAYS.map((d) => [d, ""])),
  );
  const [afterHours, setAfterHours] = useState("take a message");

  // Section 2
  const [transferees, setTransferees] = useState<Transferee[]>([
    { name: "", title: "", phone: "", callTypes: "" },
  ]);
  const [hasEmergencyLine, setHasEmergencyLine] = useState("no");
  const [emergencyNumber, setEmergencyNumber] = useState("");

  // Section 3
  const [faqs, setFaqs] = useState<FAQ[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);
  const [services, setServices] = useState("");
  const [aiNeverDo, setAiNeverDo] = useState("");
  const [tone, setTone] = useState("");

  // Section 4
  const [sendForm, setSendForm] = useState("no");
  const [formUrl, setFormUrl] = useState("");
  const [formTrigger, setFormTrigger] = useState("");

  // Section 5
  const [aiName, setAiName] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("warm and friendly");
  const [discloseAi, setDiscloseAi] = useState("only if asked");

  // Section 6
  const [alertEmail, setAlertEmail] = useState("");
  const [additionalEmails, setAdditionalEmails] = useState<string[]>([]);

  // Section 7
  const [notes, setNotes] = useState("");
  const [sopFile, setSopFile] = useState<File | null>(null);

  const addTransferee = () => {
    if (transferees.length < 5) setTransferees([...transferees, { name: "", title: "", phone: "", callTypes: "" }]);
  };
  const removeTransferee = (i: number) => setTransferees(transferees.filter((_, idx) => idx !== i));
  const updateTransferee = (i: number, field: keyof Transferee, value: string) => {
    const next = [...transferees];
    next[i] = { ...next[i], [field]: value };
    setTransferees(next);
  };

  const addFaq = () => {
    if (faqs.length < 10) setFaqs([...faqs, { question: "", answer: "" }]);
  };
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, field: keyof FAQ, value: string) => {
    const next = [...faqs];
    next[i] = { ...next[i], [field]: value };
    setFaqs(next);
  };

  const addEmail = () => setAdditionalEmails([...additionalEmails, ""]);
  const removeEmail = (i: number) => setAdditionalEmails(additionalEmails.filter((_, idx) => idx !== i));
  const updateEmail = (i: number, value: string) => {
    const next = [...additionalEmails];
    next[i] = value;
    setAdditionalEmails(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      toast.error("Business name is required");
      return;
    }
    setSubmitting(true);
    try {
      let sopPath: string | null = null;
      if (sopFile) {
        const ext = sopFile.name.split(".").pop() ?? "bin";
        const key = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("intake-sops")
          .upload(key, sopFile, { contentType: sopFile.type || undefined });
        if (upErr) throw upErr;
        sopPath = key;
      }

      const payload = {
        business: { businessName, primaryPhone, businessAddress, hours, afterHours },
        callRouting: { transferees, hasEmergencyLine, emergencyNumber },
        aiKnowledge: { faqs, services, aiNeverDo, tone },
        intakeForms: { sendForm, formUrl, formTrigger },
        persona: { aiName, voiceStyle, discloseAi },
        emailAlerts: { alertEmail, additionalEmails },
        notes,
        sopFileName: sopFile?.name ?? null,
      };

      const { data: inserted, error } = await supabase
        .from("voice_intake_submissions")
        .insert({
          business_name: businessName,
          contact_email: alertEmail || null,
          primary_phone: primaryPhone || null,
          payload,
          sop_file_path: sopPath,
        })
        .select("id")
        .single();
      if (error) throw error;

      setSubmissionId(inserted?.id ?? null);
      setSubmitted(true);
      toast.success("Submission received");
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SiteLayout>
        <section className="container-editorial py-32 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h1 className="display-2 mt-6">Thank you</h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            We've received your Vektiss Voice intake. Our team will review your information and reach out within one business day to begin setup.
          </p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow">Intake</p>
          <h1 className="display-2 mt-3">Vektiss Voice Intake Form</h1>
          <p className="mt-4 text-muted-foreground">
            Tell us how your business answers the phone today. We use this to train and configure your AI voice assistant.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-16">
            {/* Section 1 */}
            <Section title="1 · Business Info">
              <Field label="Business name *">
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              </Field>
              <Field label="Primary phone number (the number callers will dial)">
                <Input value={primaryPhone} onChange={(e) => setPrimaryPhone(e.target.value)} />
              </Field>
              <Field label="Business address">
                <Textarea value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} rows={2} />
              </Field>
              <Field label="Business hours">
                <div className="space-y-2">
                  {DAYS.map((day) => (
                    <div key={day} className="grid grid-cols-[100px_1fr] items-center gap-3">
                      <Label className="text-sm text-muted-foreground">{day}</Label>
                      <Input
                        placeholder="e.g. 9:00 AM – 5:00 PM, or Closed"
                        value={hours[day]}
                        onChange={(e) => setHours({ ...hours, [day]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
              </Field>
              <Field label="After-hours handling preference">
                <select
                  value={afterHours}
                  onChange={(e) => setAfterHours(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                >
                  <option value="take a message">Take a message</option>
                  <option value="transfer to on-call">Transfer to on-call</option>
                  <option value="end call politely">End call politely</option>
                </select>
              </Field>
            </Section>

            {/* Section 2 */}
            <Section title="2 · Call Routing">
              <div className="space-y-4">
                <Label className="text-sm">Who should calls be transferred to? (up to 5)</Label>
                {transferees.map((t, i) => (
                  <div key={i} className="rounded-lg border border-border p-4 space-y-3 bg-card">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">CONTACT {i + 1}</span>
                      {transferees.length > 1 && (
                        <button type="button" onClick={() => removeTransferee(i)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <Input placeholder="Name" value={t.name} onChange={(e) => updateTransferee(i, "name", e.target.value)} />
                      <Input placeholder="Title" value={t.title} onChange={(e) => updateTransferee(i, "title", e.target.value)} />
                      <Input placeholder="Phone" value={t.phone} onChange={(e) => updateTransferee(i, "phone", e.target.value)} />
                    </div>
                    <Input
                      placeholder="What types of calls go to this person? (e.g. new patients, referrals)"
                      value={t.callTypes}
                      onChange={(e) => updateTransferee(i, "callTypes", e.target.value)}
                    />
                  </div>
                ))}
                {transferees.length < 5 && (
                  <Button type="button" variant="outline" size="sm" onClick={addTransferee}>
                    <Plus className="h-4 w-4" /> Add contact
                  </Button>
                )}
              </div>
              <Field label="Is there an emergency line or on-call number?">
                <select
                  value={hasEmergencyLine}
                  onChange={(e) => setHasEmergencyLine(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                {hasEmergencyLine === "yes" && (
                  <Input className="mt-2" placeholder="Emergency number" value={emergencyNumber} onChange={(e) => setEmergencyNumber(e.target.value)} />
                )}
              </Field>
            </Section>

            {/* Section 3 */}
            <Section title="3 · What the AI Needs to Know">
              <div className="space-y-4">
                <Label className="text-sm">Top questions callers ask most often (5–10)</Label>
                {faqs.map((f, i) => (
                  <div key={i} className="rounded-lg border border-border p-4 space-y-3 bg-card">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">Q&A {i + 1}</span>
                      {faqs.length > 1 && (
                        <button type="button" onClick={() => removeFaq(i)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Input placeholder="Question" value={f.question} onChange={(e) => updateFaq(i, "question", e.target.value)} />
                    <Textarea placeholder="Answer" rows={2} value={f.answer} onChange={(e) => updateFaq(i, "answer", e.target.value)} />
                  </div>
                ))}
                {faqs.length < 10 && (
                  <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                    <Plus className="h-4 w-4" /> Add question
                  </Button>
                )}
              </div>
              <Field label="What services or procedures do you offer?">
                <Textarea value={services} onChange={(e) => setServices(e.target.value)} rows={3} />
              </Field>
              <Field label="What should the AI never say or do?">
                <Textarea
                  placeholder="e.g. Never quote prices. Never confirm appointments without checking."
                  value={aiNeverDo}
                  onChange={(e) => setAiNeverDo(e.target.value)}
                  rows={3}
                />
              </Field>
              <Field label="Any words, phrases, or tone guidelines the AI should follow?">
                <Textarea value={tone} onChange={(e) => setTone(e.target.value)} rows={3} />
              </Field>
            </Section>

            {/* Section 4 */}
            <Section title="4 · Intake Forms">
              <Field label="Do you want the AI to send a form to callers mid-call?">
                <select
                  value={sendForm}
                  onChange={(e) => setSendForm(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="need one built">Need one built</option>
                </select>
              </Field>
              {sendForm !== "no" && (
                <>
                  <Field label="Form link or URL (if you have one)">
                    <Input value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="https://..." />
                  </Field>
                  <Field label="What should trigger the form being sent?">
                    <Input
                      placeholder="e.g. new patient, referral booking, job inquiry"
                      value={formTrigger}
                      onChange={(e) => setFormTrigger(e.target.value)}
                    />
                  </Field>
                </>
              )}
            </Section>

            {/* Section 5 */}
            <Section title="5 · AI Voice and Persona">
              <Field label="What should the AI's name be?">
                <Input
                  placeholder='e.g. "Hi, this is Jordan with Sheats Endodontics"'
                  value={aiName}
                  onChange={(e) => setAiName(e.target.value)}
                />
              </Field>
              <Field label="Preferred voice style">
                <select
                  value={voiceStyle}
                  onChange={(e) => setVoiceStyle(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                >
                  <option value="warm and friendly">Warm and friendly</option>
                  <option value="professional and direct">Professional and direct</option>
                  <option value="neutral">Neutral</option>
                </select>
              </Field>
              <Field label="Should the AI disclose it is an AI?">
                <select
                  value={discloseAi}
                  onChange={(e) => setDiscloseAi(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="only if asked">Only if asked</option>
                </select>
              </Field>
            </Section>

            {/* Section 6 */}
            <Section title="6 · Email Alerts">
              <Field label="Email address for call summaries">
                <Input type="email" value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} placeholder="you@example.com" />
              </Field>
              <div className="space-y-2">
                <Label className="text-sm">Additional emails (optional)</Label>
                {additionalEmails.map((email, i) => (
                  <div key={i} className="flex gap-2">
                    <Input type="email" value={email} onChange={(e) => updateEmail(i, e.target.value)} />
                    <Button type="button" variant="outline" size="icon" onClick={() => removeEmail(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addEmail}>
                  <Plus className="h-4 w-4" /> Add email
                </Button>
              </div>
            </Section>

            {/* Section 7 */}
            <Section title="7 · Additional Notes">
              <Field label="Anything specific about your callers or industry we should know?">
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
              </Field>
              <Field label="Upload scripts, call flows, or SOPs (optional)">
                <Input
                  type="file"
                  onChange={(e) => setSopFile(e.target.files?.[0] ?? null)}
                  accept=".pdf,.doc,.docx,.txt,.md,.rtf"
                />
                {sopFile && <p className="text-xs text-muted-foreground mt-1">Selected: {sopFile.name}</p>}
              </Field>
            </Section>

            <div className="flex flex-col items-start gap-3 border-t border-border pt-8">
              <Button type="submit" disabled={submitting} size="lg">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {submitting ? "Submitting…" : "Submit intake"}
              </Button>
              <p className="text-xs text-muted-foreground">
                We'll review and respond within one business day.
              </p>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold border-b border-border pb-3 mb-6">{title}</h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
