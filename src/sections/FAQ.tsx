import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'Does continuous GPS tracking drain the battery?',
    answer:
      'We utilizes an advanced, optimized background polling strategy. It tracks your every move on the mountain with sub-meter precision while ensuring your phone outlasts your longest days on the slopes.',
  },
  {
    question: 'Does it work without cell service in the backcountry?',
    answer:
      'Yes, 100% offline tracking is built-in. Your phone already has a dedicated GPS receiver. The app records your entire session locally and gracefully syncs everything the moment you hit Wi-Fi back at the lodge.',
  },
  {
    question: 'Where is my location data handled?',
    answer:
      'Your privacy is our baseline. All location data is strictly stored locally on your device by default (Local Privacy First). The data only leaves your phone if you explicitly choose to share a run or back it up.',
  },
  {
    question: 'Is Snowly really completely open source?',
    answer:
      'Absolutely. Our entire stack, including both the frontend app and the backend infrastructure, is 100% open source. You can inspect the repo, contribute features, and own the software you trust your safety with.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 relative bg-white">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900">
            Questions? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">We have answers.</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border-b border-slate-100 group"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-8 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 group-hover:text-brand transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-8 h-8 transition-transform duration-500 ${
                      isOpen
                        ? 'transform rotate-180 text-brand'
                        : 'text-slate-300 group-hover:text-slate-500'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
