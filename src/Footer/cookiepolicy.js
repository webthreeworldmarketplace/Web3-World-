import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="cookie-policy max-w-7xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">What are cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored in a computer's browser directory. They are used by website providers for various purposes such as setting language preferences, understanding site usage, and remembering login details.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Types of cookies</h2>
        <p className="mb-4">
          There are primarily two types of cookies:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>First-party cookies:</strong> Placed and read by WebThreeWorld (W3W) directly when you use our services.</li>
          <li><strong>Third-party cookies:</strong> Set by other companies (e.g., Google, Facebook) for purposes like site analytics.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Does W3W use cookies?</h2>
        <p className="mb-4">
          Yes, W3W uses cookies in accordance with our Privacy Policy to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Ensure that our services function properly.</li>
          <li>Detect and prevent fraud.</li>
          <li>Understand how visitors use and engage with our websites and applications.</li>
          <li>Analyze and improve our services.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Does W3W use cookies for marketing, analytics, and personalization?</h2>
        <p className="mb-4">
          <strong>Marketing:</strong> Yes. We use cookies and similar technologies to show you targeted ads and measure engagement.
        </p>
        <p className="mb-4">
          <strong>Analytics:</strong> We use analytics cookies to understand how visitors interact with our services.
        </p>
        <p className="mb-4">
          <strong>Personalization:</strong> Preference cookies are used to remember your settings and enhance your user experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Can I opt out?</h2>
        <p className="mb-4">
          Depending on your location, you can adjust cookie preferences through our cookie setting center. You can also manage cookies via your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Which cookies does W3W use?</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Cookie Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Strictly Necessary Cookies:</strong></td>
                <td className="border border-gray-300 px-4 py-2">Essential for the website to function and cannot be switched off.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Performance Cookies:</strong></td>
                <td className="border border-gray-300 px-4 py-2">Help us count visits and traffic sources to measure and improve site performance.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Functionality Cookies:</strong></td>
                <td className="border border-gray-300 px-4 py-2">Enable enhanced functionality and personalization.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Targeting Cookies:</strong></td>
                <td className="border border-gray-300 px-4 py-2">Set by our advertising partners to build a profile of your interests based on your browsing activity.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2"><strong>Social Media Cookies:</strong></td>
                <td className="border border-gray-300 px-4 py-2">Set by social media services to enable content sharing with your friends and networks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <p className="mb-4">
          If you have any questions, please contact us at <a href="mailto:legal@webthreeworld.com" className="text-blue-500">legal@webthreeworld.com</a>.
        </p>
        <p>
          You can adjust your cookie settings anytime through our cookie setting center.
        </p>
          </section>
          <hr className="my-4 border-t border-gray-200" />
      </div>
    );
}

export default CookiePolicy;
