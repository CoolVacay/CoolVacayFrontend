import { StaticPageWrapper } from "~/app/ui/components/common";

export default function Page() {
  return (
    <StaticPageWrapper
      img={{
        alt: "Terms and conditions picture",
        src: "/terms-conditions.jpeg",
        height: "588px",
      }}
      title="Terms and Conditions"
      subtitle="Last modified: May 15, 2024"
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Our services</h1>
        <p>
          <span className="text-primary">Acceptance of Terms: </span>These Terms
          and Conditions (“Terms”) govern your use of the WordPress themes and
          related services (“Services”) provided by (“Company”). By accessing or
          using our Services, you agree to comply with and be bound by these
          Terms.
        </p>
        <p>
          <span className="text-primary">License: </span>Company grants you a
          non-exclusive, non-transferable, revocable license to use the themes
          for your personal or commercial websites, subject to the limitations
          specified in these Terms.
        </p>
        <p>
          <span className="text-primary">Updates: </span> You are entitled to
          receive updates for purchased themes for one year from the date of
          purchase. After that period, you may renew your license for continued
          access to updates.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Property rights</h1>
        <p>
          <span className="text-primary">Ownership: </span> All themes, content,
          and materials provided by the Company are protected by copyright and
          intellectual property laws. You may not reproduce, distribute, or
          modify any part of our themes or materials without our explicit
          written consent.
        </p>
        <p>
          <span className="text-primary">Pricing: </span>Prices for our themes
          are subject to change without notice. The Company reserves the right
          to modify or discontinue themes or services at any time without
          liability.
        </p>
        <p>
          <span className="text-primary">Payment: </span> All payments are
          processed securely through a third-party payment processor. You agree
          to provide accurate and complete payment information and authorize us
          to charge your payment method for all purchases made through our
          Services.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">
          Prohibited activities
        </h1>
        <p>
          <span className="text-primary">Unauthorized Use: </span> You may not
          use our themes or Services for any unlawful or prohibited purpose,
          including but not limited to distributing malware, engaging in
          hacking, or violating any applicable laws.
        </p>
        <p>
          <span className="text-primary">Reverse Engineering: </span> You may
          not decompile, reverse engineer, or attempt to obtain the source code
          of any theme or software provided by the Company.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Services management</h1>
        <p>
          <span className="text-primary">Support: </span>
          The Company provides support for its themes as described in the
          Support and Updates policy. Support inquiries should be directed
          through our designated support channels.
        </p>
        <p>
          <span className="text-primary">Termination: </span>
          The Company reserves the right to terminate or suspend your access to
          our Services at its discretion, without notice, for any violation of
          these Terms.
        </p>
        <p>
          <span className="text-primary">Changes to Terms: </span>
          The Company may update these Terms from time to time. It is your
          responsibility to review the Terms periodically. Your continued use of
          the Services after any changes to these Terms constitutes acceptance
          of those changes.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Contact information</h1>
        <p>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us.
        </p>
        <p>
          By using our Services, you agree to abide by these Terms and
          Conditions, as well as our Privacy Policy, which is incorporated
          herein by reference.
        </p>
      </div>
    </StaticPageWrapper>
  );
}
