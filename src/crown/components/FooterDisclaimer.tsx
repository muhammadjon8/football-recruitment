import NAFCBLogo from "../assets/nacfb-black.svg";

const FooterDisclaimer = () => {
  return (
    <div className="bg-slate-700 text-white py-8 border-t border-slate-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs text-gray-300 leading-relaxed">
              <p className="mb-3">
                Crown Business Finance Limited is an independent Asset Finance
                broker not a lender, as such we can introduce you to a wide
                range of finance providers, depending on your requirements and
                circumstances. We are not independent financial advisors and so
                are unable to provide you with independent financial advice.
                Crown Business Finance Limited will receive payment(s) or other
                benefit from the finance provider if you decide to enter into an
                agreement with them. Crown Business Finance Limited is an
                appointed representative of APS Compliance Ltd which is
                authorised and regulated by the Financial Conduct Authority
                under number 692635.
              </p>

              <p className="mb-3">
                Crown Business Finance Limited aims to provide our customers
                with the highest standards of service. If our service fails to
                meet your requirements and you would like to report a complaint,
                please click on the link:{" "}
                <a
                  href="https://www.afsuk.com/asset-finance-solutions/contact/complaints-procedure/"
                  className="text-teal-400 hover:text-teal-300 underline"
                >
                  https://www.afsuk.com/asset-finance-solutions/contact/complaints-procedure/
                </a>
              </p>

              <p className="mb-6">
                All calls to and from our office phone number are recorded for
                training, monitoring, and regulatory purposes. This is to ensure
                we maintain high-quality service standards and comply with
                applicable regulations. By contacting us, you consent to the
                recording of calls.
              </p>
            </div>

            <div className="text-xs text-gray-400 border-t border-slate-600 pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                <span>© 2025 Crown Business Finance - All Rights Reserved</span>
                <span>
                  Website Design by{" "}
                  <a href="#" className="text-teal-400 hover:text-teal-300">
                    Loop Digital
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <img src={NAFCBLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDisclaimer;
