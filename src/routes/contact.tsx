import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vektiss" },
      {
        name: "description",
        content:
          "Talk to Vektiss. Email us, get started, or send a note about your operational challenges.",
      },
      { property: "og:title", content: "Contact — Vektiss" },
      {
        property: "og:description",
        content: "Reach the Vektiss team. We respond within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    Icon: Calendar,
    label: "Get Started",
    body: "30 minutes with a systems architect. Bring your messiest operational headache.",
    cta: "Pick a time",
    to: "/book" as const,
  },
  {
    Icon: Mail,
    label: "Email the team",
    body: "Prefer to send a note first? We respond within one business day.",
    cta: "info@vektiss.com",
    href: "mailto:info@vektiss.com",
  },
  {
    Icon: MapPin,
    label: "Where we work",
    body: "525 North Sam Houston Pkwy East, Suite 415, Houston, TX 77060.",
    cta: "Houston, TX",
  },
];

const faqs = [
  {
    q: "What size of company do you work with?",
    a: "Growth-stage operator-owned businesses, typically $3M–$50M in revenue, with 15–250 people. If you've outgrown your tools but a McKinsey project would be overkill, we're built for you.",
  },
  {
    q: "How fast can you start?",
    a: "Most engagements kick off within two weeks of a signed agreement. The first working system usually ships in 4–5 weeks from kickoff.",
  },
  {
    q: "Do we have to rip out our existing tools?",
    a: "No. We build inside the stack you already have — HubSpot, Notion, Google Workspace, Slack, your CRM. We add the connective tissue, not another bill.",
  },
  {
    q: "Do you do one-off projects or only retainers?",
    a: "Both. Most clients start with a defined build (4–8 weeks) then continue with us as their operating partner. The build alone is enough to leave with a working system.",
  },
];

const consentText1 =
  'I agree to receive non-marketing SMS messages from Vektiss LLC, regarding appointment confirmations, project updates, service notifications, support messages, invoices, account information, and customer support communications. Message frequency may vary. Reply "HELP" for assistance or "STOP" to unsubscribe. Standard message and data rates may apply.';

const consentText2 =
  'I agree to receive marketing SMS messages from Vektiss LLC, regarding promotional offers, discounts, and related marketing communications. Message frequency may vary. Reply "HELP" for assistance or "STOP" to unsubscribe. Standard message and data rates may apply.';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200, "Name must be under 200 characters"),
  email: z.string().trim().email("Please enter a valid email").max(320, "Email must be under 320 characters"),
  phone: z.string().trim().max(40, "Phone must be under 40 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be under 5000 characters"),
  consentNonMarketingSms: z.boolean().default(false),
  consentMarketingSms: z.boolean().default(false),
  consentTerms: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consentNonMarketingSms: false,
      consentMarketingSms: false,
      consentTerms: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message,
        consent_non_marketing_sms: values.consentNonMarketingSms,
        consent_marketing_sms: values.consentMarketingSms,
        consent_terms: values.consentTerms,
      } as any);

      if (error) throw error;

      toast.success("Message sent. We'll be in touch within one business day.");
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container-editorial pt-20 pb-12 md:pt-32 md:pb-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-6 display-1 max-w-4xl">
          Let's talk about <span className="accent-underline">your operations.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Three ways to reach the Vektiss team. Pick whichever feels right — we read everything
          and respond within one business day.
        </p>
      </section>

      <section className="container-editorial pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map(({ Icon, label, body, cta, to, href }) => (
            <article
              key={label}
              className="rounded-xl border border-border bg-white p-8 shadow-card"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-6 text-xl font-semibold tracking-tight">{label}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
              {to ? (
                <Link
                  to={to}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : href ? (
                <a
                  href={href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  {cta}
                </a>
              ) : (
                <p className="mt-6 text-sm font-medium text-foreground">{cta}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-border bg-white p-8 shadow-card md:p-10">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">Message sent</h2>
                <p className="mt-2 text-muted-foreground">
                  We've received your note and will respond within one business day.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold tracking-tight">Send us a message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your operations..."
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4 pt-2">
                      <FormField
                        control={form.control}
                        name="consentNonMarketingSms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal text-sm text-muted-foreground">
                                {consentText1}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consentMarketingSms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal text-sm text-muted-foreground">
                                {consentText2}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="consentTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start gap-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="font-normal text-sm text-muted-foreground">
                                By checking this box, I accept the{" "}
                                <Link
                                  to="/privacy"
                                  className="text-primary underline-offset-2 hover:underline"
                                >
                                  Privacy Policy
                                </Link>{" "}
                                and{" "}
                                <Link
                                  to="/terms"
                                  className="text-primary underline-offset-2 hover:underline"
                                >
                                  Terms of Service
                                </Link>
                                .
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full md:w-auto"
                      >
                        {submitting ? (
                          <span className="inline-flex items-center gap-2">
                            Sending...
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <Send className="h-4 w-4" />
                            Send message
                          </span>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-elevated">
        <div className="container-editorial py-24 md:py-32">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-6 display-2">Common questions.</h2>
            </div>
            <div className="md:col-span-8">
              <dl className="space-y-px overflow-hidden rounded-xl border border-border bg-border">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-background p-6 md:p-8">
                    <dt className="text-lg font-semibold tracking-tight text-foreground">
                      {f.q}
                    </dt>
                    <dd className="mt-3 text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
