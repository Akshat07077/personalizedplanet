import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">This page is not in the shop.</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The link may be old. Browse the gifts, or tell us what you are looking for on WhatsApp.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/shop">Shop gifts</Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
      </div>
    </Container>
  );
}
