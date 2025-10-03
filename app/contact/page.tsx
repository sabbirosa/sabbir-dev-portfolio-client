import { socials } from "@/data/socials";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ContactPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>

            <div className="space-y-4">
              <a
                href={socials.email}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-700 hover:border-[#7C3AED] transition-colors group"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl text-gray-400 group-hover:text-[#7C3AED]"
                />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400 text-sm">
                    sabbir.sa.dev@gmail.com
                  </p>
                </div>
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-700 hover:border-[#7C3AED] transition-colors group"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-2xl text-gray-400 group-hover:text-[#7C3AED]"
                />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-gray-400 text-sm">
                    Sabbir Bin Abdul Latif
                  </p>
                </div>
              </a>

              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-700 hover:border-[#7C3AED] transition-colors group"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-2xl text-gray-400 group-hover:text-[#7C3AED]"
                />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-gray-400 text-sm">@sabbirosa</p>
                </div>
              </a>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50">
              <p className="text-gray-300 mb-4">
                Feel free to reach out to me through any of the contact methods
                listed. I usually respond within 24-48 hours.
              </p>
              <p className="text-gray-400 text-sm">
                Whether you have a question, want to collaborate on a project,
                or just want to say hi, I'd love to hear from you!
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/30">
              <h3 className="font-semibold mb-2">💼 Available for:</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Full-time opportunities</li>
                <li>• Freelance projects</li>
                <li>• Open source collaboration</li>
                <li>• Technical consulting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
