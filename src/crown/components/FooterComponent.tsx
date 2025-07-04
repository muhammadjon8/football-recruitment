import { ChevronRight } from "@mui/icons-material";

const FooterComponent = () => {
  const footerData = {
    "Finance Solutions": [
      "Asset Finance",
      "Business Loans",
      "Government Backed Loans",
      "Asset Refinance",
      "Tax Funding",
      "Vehicle Finance",
    ],
    Sectors: [
      "Arboriculture",
      "Construction",
      "Drainage",
      "Fleet & PCO",
      "Transport & Logistics",
    ],
    Information: [
      "Meet the Team",
      "Recent News",
      "Complaints",
      "Become an Introducer",
    ],
    "": ["FAQs", "Privacy Policy", "Contact Us", "Sitemap"],
  };

  return (
    <footer className="bg-slate-700 text-white py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(footerData).map(([title, items], columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {title && (
                <h3 className="text-teal-400 font-semibold text-2xl mb-6">
                  {title}
                </h3>
              )}
              <ul className="space-y-3">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 text-sm group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-gray-400 group-hover:text-teal-400 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
