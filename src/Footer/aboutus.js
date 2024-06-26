import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">Founded in 2024 by AD99 India, WebThreeWorld aims to democratize access to crypto data and empower users with actionable insights. We delve deep into the crypto space to deliver valuable information through our comprehensive cryptocurrency reports, publications, newsletters, and more.</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">What We Offer</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border border-gray-300">Real-Time Updates:</td>
                    <td className="py-2 px-4 border border-gray-300">Stay informed with up-to-the-minute cryptocurrency prices.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300">Latest Developments:</td>
                    <td className="py-2 px-4 border border-gray-300">Discover the newest trends and developments in the crypto world.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300">Insights into Adoption:</td>
                    <td className="py-2 px-4 border border-gray-300">Gain insights into global cryptocurrency adoption and trends.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">How We Support You</h2>
            <p className="text-gray-700">Our platform features affiliate links to leading cryptocurrency exchanges and NFT marketplaces, enabling you to access top platforms for trading and investing while supporting our mission of delivering high-quality content and data.</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">Commitment to Quality</h2>
            <p className="text-gray-700">We are committed to accuracy and timeliness in our reporting. Our dedicated team of experts works tirelessly to help you navigate the fast-paced world of cryptocurrency with confidence.</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">Our Journey</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="py-2 px-4 border border-gray-300"><strong>Q1 2024:</strong></td>
                    <td className="py-2 px-4 border border-gray-300">Introduced WebThreeWorld to the public, established real-time cryptocurrency price updates, began publishing regular news articles and insights.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300"><strong>Q2 2024:</strong></td>
                    <td className="py-2 px-4 border border-gray-300">Launched detailed cryptocurrency reports, started a monthly newsletter featuring in-depth analysis and expert opinions.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300"><strong>Q3 2024:</strong></td>
                    <td className="py-2 px-4 border border-gray-300">Introduced interactive features for user engagement, hosted webinars and live Q&A sessions with industry experts.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300"><strong>Q4 2024:</strong></td>
                    <td className="py-2 px-4 border border-gray-300">Introduced public APIs for accessing real-time crypto data, expanded affiliate links to include all major cryptocurrency exchanges and NFT marketplaces.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border border-gray-300"><strong>Q1 2025:</strong></td>
                    <td className="py-2 px-4 border border-gray-300">Provided detailed reports on global blockchain adoption, explored and reported on how different industries are integrating blockchain technology.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">Future Outlook</h2>
            <p className="text-gray-700">In 2025 and beyond, WebThreeWorld is committed to continuous improvement: regularly updating and enhancing our platform based on user feedback, staying at the forefront of cryptocurrency news and data to remain your go-to resource in the crypto community.</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-700">Join our growing community to stay informed about the latest trends and updates in the crypto space. Whether you're a seasoned trader, a crypto enthusiast, or just getting started, WebThreeWorld is your trusted resource for all things crypto.</p>
            <p className="text-gray-700">Thank you for choosing WebThreeWorld as your source for cryptocurrency news and data. Together, let's explore the future of finance.</p>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <p className="text-gray-700">For inquiries or support, please contact us at <a href="mailto:support@webthreeworld.com" className="text-blue-500 hover:underline">support@webthreeworld.com</a> and follow us on social media for the latest news and trends in the cryptocurrency world.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
