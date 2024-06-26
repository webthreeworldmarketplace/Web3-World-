import React from 'react';

const Disclaimer = () => {
  return (
      <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Disclaimer</h1>
        {/* Non-Endorsement and Investment Disclaimer */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Non-Endorsement and Investment Disclaimer</h2>
            <p className="text-gray-700 leading-7">
              The content provided on this platform is for informational purposes only and should not be construed as investment advice, financial advice, or trading advice. WebthreeWorld does not recommend the buying, selling, or holding of any cryptocurrency. Users are urged to conduct their own due diligence and consult with a qualified financial advisor before making any investment decisions. By accessing and using this platform, you acknowledge that you are solely responsible for any actions you take based on the information provided herein.
            </p>
          </div>
        </div>

        {/* Accuracy Disclaimer */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Accuracy Disclaimer</h2>
            <p className="text-gray-700 leading-7">
              While WebthreeWorld strives to ensure the accuracy of the information presented on this platform, we do not guarantee the completeness or reliability of such information. Users understand that they utilize the information provided here at their own risk.
            </p>
          </div>
        </div>

        {/* Non-Endorsement of Third-Party Services */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Non-Endorsement of Third-Party Services</h2>
            <p className="text-gray-700 leading-7">
              The presence of third-party advertisements and hyperlinks on WebthreeWorld does not constitute an endorsement, guarantee, warranty, or recommendation by WebthreeWorld. Users are advised to conduct their own due diligence before engaging with any third-party services.
            </p>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Affiliate Disclosure</h2>
            <p className="text-gray-700 leading-7">
              WebthreeWorld may receive compensation for affiliate links, which may take the form of monetary compensation or services. This compensation may occur without any action from site visitors. Users should be aware that engaging with affiliate links may result in compensation to WebthreeWorld. Each affiliate link is clearly marked with an icon for transparency.
            </p>
          </div>
        </div>

        {/* Token Launch Notifications */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Token Launch Notifications</h2>
            <p className="text-gray-700 leading-7">
              Information provided by WebthreeWorld regarding new token launches is for general informational purposes only. We do not make any representation or warranty, express or implied, regarding the accuracy, reliability, or completeness of such information. Additionally, the provision of this information does not constitute an endorsement, invitation, or recommendation to invest in or transact with such tokens. Digital assets are inherently volatile, and users should evaluate their financial situation and risk tolerance before engaging with such assets. WebthreeWorld shall not be liable for any loss or damage incurred as a result of using our platform or relying on any information provided therein.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Disclaimer;
