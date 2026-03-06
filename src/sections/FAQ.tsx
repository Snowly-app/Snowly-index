import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
      'Absolutely. The core tracking logic, the UI, and the trajectory parsers are entirely open source. You can inspect the repo, contribute features, and own the software you trust your safety with.',
  },
  {
    question: 'How does it automatically know when I\'m on a chairlift?',
    answer:
      'Snowly doesn\'t just rely on GPS speed. It combines altitude trends with CoreMotion accelerometer data to accurately distinguish true ski runs from riding a lift or gondola.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 relative bg-zinc-950">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white/90">
            Questions? <br />
            <span className="text-white/40">We have answers.</span>
          </h2>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-white/10 group"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-8 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-8 h-8 text-white/30 transition-transform duration-500 ${
                      isOpen ? 'transform rotate-180 text-primary' : 'group-hover:text-white/60'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl">
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
