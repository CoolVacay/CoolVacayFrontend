import StaticPageWrapper from "../../ui/components/common/StaticPageWrapper/StaticPageWrapper";

export default function Page() {
  return (
    <StaticPageWrapper
      img={{
        alt: "Privacy policy picture",
        src: "/privacy-policy.jpeg",
        height: "588px",
      }}
      title="Privacy Policy"
      subtitle="Last modified: May 15, 2024"
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Information</h1>
        <p>
          While using our Site, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to your name (“Personal Information”).
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">
          Information we collect
        </h1>
        <p>
          <span className="font-bold">Personal Information: </span> We may
          collect personally identifiable information, such as your name, email
          address, postal address, phone number, and other similar information
          when you provide it to us voluntarily or when you interact with our
          Services.
        </p>
        <p>
          <span className="font-bold">Usage Data: </span>We may collect
          information about how you use our Services, including your access
          times, browser types, and language preferences.
        </p>
        <p>
          <span className="font-bold">Device Information: </span> We may collect
          information about the device you are using to access our Services,
          including the hardware model, operating system and version, unique
          device identifiers, and mobile network information.
        </p>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">
          How we use your information
        </h1>
        <p>
          We may use the information we collect from you for various purposes,
          including:
        </p>
        <ul className="list-inside list-disc">
          <li>To provide, maintain, and improve our Services.</li>
          <li>To personalize your experience on our Services.</li>
          <li>To respond to your comments, questions, and requests.</li>
          <li>
            To send you technical notices, updates, security alerts, and support
            and administrative messages.
          </li>
          <li>
            To communicate with you about products, services, promotions,
            events, and other news and information we think will be of interest
            to you.
          </li>
          <li>
            To monitor and analyze usage patterns, trends, and activities in
            connection with our Services.
          </li>
        </ul>
      </div>
      <hr />
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-medium text-black">Log Data</h1>
        <p>
          In addition to the information mentioned above, we collect log data
          when you interact with our Services. This log data includes your
          computer’s IP address, browser type, browser version, the pages of our
          Services that you visit, the time and date of your visit, the time
          spent on those pages, and other statistics. This information is used
          for analyzing trends, administering the site, tracking users’
          movements on the site, and gathering demographic information
        </p>
      </div>
    </StaticPageWrapper>
  );
}
