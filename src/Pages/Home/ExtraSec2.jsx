import React, { useState } from "react";

const ExtraSec2 = () => {
  // FAQ data
  const faqs = [
    {
      question: "How do I vote for a product?",
      answer:
        "Click the thumbs-up button on any product card. You must be logged in to vote. Each user can vote once per product.",
    },
    {
      question: "How can I add a product to the website?",
      answer:
        "You need to register an account. Once logged in, go to the 'Add Product' page, fill out the details, and submit.",
    },
    {
      question: "What happens if I vote multiple times?",
      answer:
        "The system allows only one vote per product per user. Multiple clicks will not increase the vote count.",
    },
    {
      question: "Can I edit or delete my product?",
      answer:
        "Yes! After adding a product, you can go to 'My Products' to edit or delete it anytime.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Yes. We only store the information needed for voting and user account management, and never share it with third parties.",
    },
  ];

  // State to track which question is open
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 px-5 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>

      <div className="flex flex-col gap-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-5 bg-blue-900 text-white font-semibold flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "-" : "+"}</span>
            </button>

            {/* Answer */}
            {openIndex === index && (
              <div className="p-5 bg-gray-50 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSec2;
