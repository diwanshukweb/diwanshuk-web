import FloatingWhatsApp from "@/components/floating-whatsapp";
import Image from "next/image";
import Navigation from "@/components/navigation";
import { links } from "@/lib/site";
import ContactForm from "@/components/contact-form";
const whatsapp =
  "https://wa.me/917065908203?text=" +
  encodeURIComponent(
    "Hi Diwanshu, I came across your website and I'd like to discuss a website for my business.",
  );
const projects = [
  {
    name: "Shreejee",
    category: "Banquet & Hospitality",
    description:
      "A premium banquet and hospitality website concept designed around venue discovery, enquiries and event bookings.",
    url: "https://shreejee-dk.netlify.app",
    tone: "venue",
    number: "01",
    image: "/projects/shreejee.webp",
    imageHeight: 800,
  },
  {
    name: "Rao Butter Momos",
    category: "Restaurant / Food",
    description:
      "A mobile-first restaurant website concept designed around menu discovery, customer convenience and direct engagement.",
    url: "https://raobuttermomos-dk.netlify.app",
    tone: "food",
    number: "02",
    image: "/projects/rao-butter-momos.webp",
    imageHeight: 720,
  },
];
const services = [
  [
    "Business Websites",
    "Professional websites that clearly communicate what you offer and make contacting you easy.",
  ],
  [
    "Restaurant Websites",
    "Menu-focused, mobile-first experiences with directions, WhatsApp and ordering or contact integrations.",
  ],
  [
    "Hotel & Hospitality Websites",
    "Room, venue and hospitality experiences designed around enquiries and bookings.",
  ],
  [
    "Landing Pages",
    "Focused pages for campaigns, services, products and lead generation.",
  ],
  [
    "Website Redesign",
    "Modernize an outdated website with clearer navigation and a better mobile experience.",
  ],
  [
    "Digital Integrations",
    "WhatsApp, contact forms, Google Maps, social links and useful business integrations.",
  ],
];
const starterFeatures = [
  "Premium custom website design",
  "Core business pages / sections",
  "Gallery / visual showcase where required",
  "Google Maps integration",
  "WhatsApp integration",
  "Click-to-call",
  "Basic local SEO",
  "Basic analytics",
  "Domain + hosting for 1 year",
  "2 revision rounds — 1 before launch + 1 after launch",
  "Target launch within 10 days",
];
const growthFeatures = [
  "Everything in Starter",
  "Custom guided enquiry flow",
  "Advanced enquiry + availability system",
  "Event-specific enquiry flows",
  "WhatsApp conversion setup + pre-filled messages",
  "Interactive premium experience",
  "Advanced gallery / lightbox",
  "Conversion analytics",
  "20-day zero-cost post-launch maintenance",
];
const packageWhatsApp = (message: string) =>
  "https://wa.me/917065908203?text=" + encodeURIComponent(message);
const starterWhatsApp = packageWhatsApp(
  "Hi Diwanshu, I came across your website and I'm interested in the Starter Website Package. I'd like to discuss my business website.",
);
const growthWhatsApp = packageWhatsApp(
  "Hi Diwanshu, I came across your website and I'm interested in the Growth Package. I'd like to discuss the digital growth system for my business.",
);
const steps = [
  ["Discover", "Understand your business, customers and goals."],
  ["Plan", "Define the structure, content and customer journey."],
  ["Build", "Design and develop with mobile users in mind."],
  ["Review", "You review the website; we complete the revisions."],
  ["Launch", "Your website goes live and post-launch support begins."],
];
const faqs = [
  [
    "How long does a website take?",
    "Target launch is within 10 days when required inputs and approvals are provided on time. Larger or more complex projects may take longer; we agree the timeline before starting.",
  ],
  [
    "What's the difference between Starter and Growth?",
    "Starter creates a strong professional online presence. Growth adds advanced enquiry, conversion and interaction systems to help turn visitors into qualified business enquiries. Advanced functionality is customized around your business and customer journey.",
  ],
  [
    "Is domain and hosting included?",
    "Yes. Both packages include domain and hosting for the first year, subject to domain availability and agreed scope. Renewal costs are agreed separately.",
  ],
  [
    "What is the ₹24,999 Growth offer?",
    "The founding-client offer is for the first 5 businesses. Growth is ₹24,999 under this offer, compared with the ₹29,999 standard price. Ask on WhatsApp to confirm eligibility and availability.",
  ],
  [
    "Can you redesign my existing website?",
    "Yes. We can review your current website and plan a redesign around your business, content and customers.",
  ],
  [
    "Will my website work on mobile?",
    "Yes. Both packages are designed responsively for phones, tablets and desktops.",
  ],
  [
    "Can I request changes?",
    "Both packages include 2 revision rounds: 1 before launch and 1 after launch. Additional changes can be scoped separately.",
  ],
  [
    "What happens after launch?",
    "Both packages include a 20-day technical guarantee: development bugs identified in that period are fixed at no extra cost. Growth also includes 20 days of zero-cost post-launch maintenance. Optional ongoing maintenance is ₹1,500/month.",
  ],
  [
    "Can you integrate WhatsApp?",
    "Yes. Both packages include WhatsApp integration. Growth adds conversion setup and pre-filled messages tailored to your enquiry journey.",
  ],
  [
    "How do we get started?",
    "Choose a package or send me a message on WhatsApp. We discuss your business, confirm the scope and timeline, and gather the inputs needed to begin.",
  ],
];
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span /> {children}
    </p>
  );
}
export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-copy">
            <Label>WEB DEVELOPMENT · DIGITAL SOLUTIONS</Label>
            <h1>
              Your business deserves more than just a <em>Google listing.</em>
            </h1>
            <p className="hero-description">
              I build modern, conversion-focused websites that help local
              businesses turn online visitors into enquiries, bookings and
              customers.
            </p>
            <div className="actions">
              <a className="button" href="#work">
                View My Work <span>↗</span>
              </a>
              <a className="text-link" href="#contact">
                Let&apos;s Talk <span>↗</span>
              </a>
            </div>
            <p className="trust-line">
              Modern websites <i /> Mobile-first <i /> Built for business
            </p>
          </div>
          <div
            className="hero-art"
            aria-label="Illustration of a clear journey from business website to customer enquiry"
          >
            <div className="art-top">
              <span className="status-dot" /> YOUR NEXT CHAPTER, ONLINE{" "}
              <span>↗</span>
            </div>
            <div className="art-browser">
              <div className="browser-toolbar">
                <span>● ● ●</span>
                <span>yourbusiness.com</span>
                <span>↗</span>
              </div>
              <div className="illustrated-site">
                <div className="mini-brand">
                  Your business<span>Menu &nbsp; About &nbsp; Contact</span>
                </div>
                <p>MAKE A GREAT FIRST IMPRESSION</p>
                <h2>
                  Local business.
                  <br />
                  Lasting impression.
                </h2>
                <div className="mini-rule" />
                <span className="mini-button">Let&apos;s connect &nbsp; ↗</span>
                <div className="art-shape">
                  <span>
                    YOUR
                    <br />
                    BUSINESS
                  </span>
                </div>
              </div>
            </div>
            <div className="enquiry-card">
              <span className="enquiry-icon">↗</span>
              <div>
                A clearer path to contact.
                <small>Discover. Trust. Enquire.</small>
              </div>
              <span>✓</span>
            </div>
            <p className="art-caption">
              Thoughtful design. A useful business tool.
            </p>
          </div>
        </section>
        <div className="section-divider container">
          <span>INDEPENDENT DEVELOPER. BUSINESS-FIRST APPROACH.</span>
          <a href="#work">Explore the work ↓</a>
        </div>
        <section id="work" className="section container">
          <div className="section-heading">
            <div>
              <Label>01 / SELECTED WORK</Label>
              <h2>
                Good design.
                <br />
                <em>Real business purpose.</em>
              </h2>
            </div>
            <p>
              A selection of business website concepts designed around real
              customer journeys and conversion goals.
            </p>
          </div>
          <div className="projects">
            {projects.map((project) => (
              <article className="project" key={project.name}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-preview ${project.tone}`}
                  aria-label={`View ${project.name} concept website in a new tab`}
                >
                  <div className="project-browser-bar" aria-hidden="true">
                    <span>● ● ●</span>
                    <span>{project.url.replace("https://", "")}</span>
                    <span>↗</span>
                  </div>
                  <Image
                    src={project.image}
                    alt={`Screenshot of the live ${project.name} concept website homepage`}
                    width={1280}
                    height={project.imageHeight}
                    sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1256px) 45vw, 564px"
                    unoptimized
                    className="project-screenshot"
                  />
                </a>
                <div className="project-info">
                  <div>
                    <h3>{project.name}</h3>
                    <p className="category">{project.category}</p>
                  </div>
                  <span className="badge">Concept Website</span>
                </div>
                <p className="project-description">{project.description}</p>
                <a
                  className="text-link"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Website <span>↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="work-note">
            Independent concepts, created to demonstrate design and development.
            These businesses have not commissioned this work.
          </p>
        </section>
        <section className="value-section">
          <div className="container value-grid">
            <div>
              <Label>MORE THAN AN ONLINE PRESENCE</Label>
              <h2>
                Your customers are already <em>searching for you.</em>
              </h2>
              <p>
                Give them one professional destination to understand your
                business, feel confident in what you offer and take the next
                step.
              </p>
            </div>
            <div className="value-list">
              {[
                [
                  "01",
                  "Build credibility",
                  "Make a strong first impression with a clear, professional presence.",
                ],
                [
                  "02",
                  "Show what you offer",
                  "Bring your services, products and important details together.",
                ],
                [
                  "03",
                  "Make enquiries easier",
                  "Help visitors reach you, find your location or discuss a booking.",
                ],
                [
                  "04",
                  "Own your destination",
                  "Reduce dependence on social feeds with a space dedicated to your business.",
                ],
              ].map(([n, t, d]) => (
                <div key={n}>
                  <span>{n}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                  <span>↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="services" className="section container">
          <div className="section-heading">
            <div>
              <Label>02 / SERVICES</Label>
              <h2>
                Websites built around
                <br />
                <em>your business.</em>
              </h2>
            </div>
            <p>
              The right website starts with what your customers need.
              Here&apos;s how I can help.
            </p>
          </div>
          <div className="services">
            {services.map(([title, description], i) => (
              <article key={title}>
                <div className="service-number">
                  0{i + 1}
                  <span>↗</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="pricing" className="pricing-section">
          <div className="container">
            <div className="package-heading">
              <Label>03 / CHOOSE YOUR GROWTH LEVEL</Label>
              <h2>
                Start with a strong presence.
                <br />
                <em>Grow with a conversion system.</em>
              </h2>
              <p>Choose the level that fits where your business is today.</p>
              <p className="package-explanation">
                Starter = premium presence.{" "}
                <span>Growth = presence + conversion system.</span>
              </p>
            </div>
            <div className="package-cards">
              <article className="price-card starter-card">
                <div className="package-name-row">
                  <h3>STARTER</h3>
                </div>
                <p className="package-subtitle">
                  PROFESSIONAL BUSINESS WEBSITE
                </p>
                <p className="price">
                  ₹19,999<span>INR</span>
                </p>
                <p className="package-positioning">
                  A premium online presence for businesses that need a
                  professional, modern website customers can easily explore and
                  contact.
                </p>
                <ul>
                  {starterFeatures.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className="button"
                  href={starterWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choose Starter <span>↗</span>
                </a>
              </article>
              <article className="price-card growth-card">
                <div className="package-name-row">
                  <h3>GROWTH</h3>
                  <span className="recommended">MOST RECOMMENDED</span>
                </div>
                <p className="package-subtitle">PRESENCE + CONVERSION SYSTEM</p>
                <p className="price">
                  ₹24,999<span>INR</span>
                </p>
                <p className="standard-price">
                  <s>₹29,999</s> standard
                </p>
                <p className="founding-offer">
                  FOUNDING CLIENT OFFER — FIRST 5 BUSINESSES
                </p>
                <p className="package-positioning">
                  A complete digital growth system designed to turn website
                  visitors into qualified enquiries.
                </p>
                <ul>
                  {growthFeatures.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="growth-context">
                  Advanced enquiry and conversion features are customized around
                  your business, customer journey and requirements. Scope is
                  agreed before development begins.
                </p>
                <p className="growth-cta-support">
                  Best for businesses that want their website to actively
                  generate enquiries.
                </p>
                <a
                  className="button"
                  href={growthWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Choose Growth <span>↗</span>
                </a>
              </article>
            </div>
            <div className="delivery-strip">
              <article>
                <span>01</span>
                <h3>10-DAY LAUNCH TARGET</h3>
                <p>
                  Target launch within 10 days when required inputs and
                  approvals are provided on time.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>20-DAY TECHNICAL GUARANTEE</h3>
                <p>
                  Development bugs identified during the 20 days after launch
                  are fixed at no additional cost. Included with both packages.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>20-DAY ZERO-COST MAINTENANCE</h3>
                <p>Included with the Growth package after launch.</p>
              </article>
            </div>
            <div className="ongoing-maintenance">
              <div>
                <h3>OPTIONAL ONGOING MAINTENANCE</h3>
                <p>
                  Ongoing technical maintenance and support after the included
                  post-launch period.
                </p>
              </div>
              <p>
                ₹1,500<span> / month</span>
              </p>
            </div>
          </div>
        </section>
        <section id="process" className="section container">
          <Label>04 / THE PROCESS</Label>
          <h2>
            From idea to <em>live website.</em>
          </h2>
          <div className="steps">
            {steps.map(([title, description], i) => (
              <article key={title}>
                <div>
                  <span>0{i + 1}</span>
                  <span>→</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="about-section container">
          <div className="about-mark" aria-hidden="true">
            <span>
              DK<span>.</span>
            </span>
            <p>
              PERSONAL APPROACH.
              <br />
              PROFESSIONAL WORK.
            </p>
          </div>
          <div className="about-copy">
            <Label>05 / THE PERSON BEHIND THE WORK</Label>
            <h2>
              Hi, I&apos;m <em>Diwanshu.</em>
            </h2>
            <p>
              I&apos;m Diwanshu Kumar, a web developer focused on helping
              businesses build a stronger and more professional presence online.
            </p>
            <p>
              I believe a business website shouldn&apos;t exist just to look
              good. It should make it easier for potential customers to
              understand the business, trust it and take the next step.
            </p>
            <p>
              I work directly with businesses from planning through launch,
              keeping the process simple, transparent and focused on what
              actually matters.
            </p>
            <a href="#contact" className="text-link">
              Let&apos;s talk about your business <span>↗</span>
            </a>
          </div>
        </section>
        <section className="why-section container">
          <div>
            <Label>WHY WORK WITH ME</Label>
            <h2>
              A developer who thinks about the business,{" "}
              <em>not just the code.</em>
            </h2>
          </div>
          <div className="qualities">
            {[
              "Business-first thinking",
              "Modern design",
              "Mobile-first approach",
              "Direct communication",
              "Fast turnaround",
              "Post-launch support",
            ].map((item) => (
              <p key={item}>
                <span>✓</span>
                {item}
              </p>
            ))}
          </div>
        </section>
        <section className="faq-section section container">
          <div>
            <Label>A FEW USEFUL ANSWERS</Label>
            <h2>
              Before we
              <br /> <em>get started.</em>
            </h2>
            <p>
              Have another question?
              <br />
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Just ask me ↗
              </a>
            </p>
          </div>
          <div className="faqs">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span>+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <Label>06 / LET’S MAKE IT HAPPEN</Label>
              <h2>
                Have a business?
                <br />
                Let&apos;s build something that <em>works for it.</em>
              </h2>
              <p>
                Tell me about your business and what you&apos;d like your
                website to achieve.
              </p>
              <div className="contact-actions">
                <a
                  className="button"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp <span>↗</span>
                </a>
                <a className="text-link" href="mailto:diwanshuk.web@gmail.com">
                  Email Me <span>↗</span>
                </a>
              </div>
              <div className="contact-details">
                <a href="mailto:diwanshuk.web@gmail.com">
                  diwanshuk.web@gmail.com
                </a>
                <a href="tel:+917065908203">+91 70659 08203</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="container">
        <div className="footer-top">
          <div>
            <a href="#home" className="footer-brand">
              Diwanshu Kumar<span>↗</span>
            </a>
            <p>Web Developer & Digital Solutions</p>
            <p>
              <a href="mailto:diwanshuk.web@gmail.com">
                diwanshuk.web@gmail.com
              </a>
              <br />
              <a href="tel:+917065908203">+91 70659 08203</a>
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Diwanshu Kumar. All rights reserved.
          </p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
      <FloatingWhatsApp href={whatsapp} />
    </>
  );
}
