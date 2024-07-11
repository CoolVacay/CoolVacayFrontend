import StaticPageWrapper from "../../ui/components/common/StaticPageWrapper/StaticPageWrapper";

export default function Page() {
  return (
    <StaticPageWrapper
      img={{
        alt: "Accessibility statement picture",
        src: "/accessibility-statement.jpeg",
        height: "588px",
      }}
      title="Accessibility Statement"
      subtitle="Last modified: May 15, 2024"
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">General</h1>
        <p>
          UserWay strives to ensure that its services are accessible to people
          with disabilities. UserWay has invested a significant amount of
          resources to help ensure that its website is made easier to use and
          more accessible for people with disabilities, with the strong belief
          that every person has the right to live with dignity, equality,
          comfort and independence.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Accessibility</h1>
        <p>
          The UserWay Accessibility Widget that is powered by a dedicated
          accessibility server. The software allows the site to improve its
          compliance with the Web Content Accessibility Guidelines (WCAG 2.1).
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">
          Enabling the Accessibility Menu
        </h1>
        <p>
          UserWay’s accessibility menu can be enabled by clicking the
          accessibility menu icon that appears on the corner of the page. After
          triggering the accessibility menu, please wait a moment for the
          accessibility menu to load in its entirety.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Disclaimer</h1>
        <p>
          UserWay continues its efforts to constantly improve the accessibility
          of its site and services in the belief that it is our collective moral
          obligation to allow seamless, accessible and unhindered use also for
          those of us with disabilities. In an ongoing effort to continually
          improve and remediate accessibility issues, we also regularly scan
          UserWay with UserWay’s{" "}
          <span className="underline">Accessibility Scanner</span> to identify
          and fix every possible accessibility barrier on our site. Despite our
          efforts to make all pages and content on UserWay fully accessible,
          some content may not have yet been fully adapted to the strictest
          accessibility standards. This may be a result of not having found or
          identified the most appropriate technological solution.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Here for you</h1>
        <p>
          If you are experiencing difficulty with any content on UserWay’s
          website, widget, any of its services or require assistance with any
          part of our site or software, please contact us during normal business
          hours as detailed below and we will be happy to assist.
        </p>
      </div>
    </StaticPageWrapper>
  );
}
