"use client";

import { socials } from "@/data/socials";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const [messageVisible, setMessageVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" },
        {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xkgjwjok", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setMessageVisible(true);
        setFormVisible(false);
        form.reset(); // Clear form fields
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Failed to send the message. Please check your connection.");
    }
  };

  return (
    <>
      <section ref={contactRef} id="contact" className="w-full mt-16 px-4">
        {" "}
        <div ref={textRef} className="max-w-5xl mx-auto">
          {" "}
          <h2 className="text-lg text-purple-600 mb-2">Let&apos;s talk</h2>{" "}
          <h3 className="text-4xl md:text-5xl font-medium text-white mb-6">
            Contact
          </h3>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <div className="text-gray-400">
              {" "}
              <p className="mb-4">
                Have a question or a project in mind? Feel free to reach out.
              </p>{" "}
              <div className="flex flex-col gap-2 text-sm mt-2">
                <div className="flex items-center gap-2">
                  <span>Location:</span>
                  <span className="text-white">Uttara, Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Email:</span>
                  <a
                    href={socials.email}
                    className="text-white underline hover:text-purple-400 transition"
                  >
                    sabbir0727@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>Phone:</span>
                  <a
                    href="tel:+8801632862927"
                    className="text-white underline hover:text-purple-400 transition"
                  >
                    +8801632862927
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>WhatsApp:</span>
                  <a
                    href="https://wa.me/8801632862927"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white underline hover:text-purple-400 transition"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="social-links flex gap-5 mt-5 text-lg">
                <a
                  href={socials.linkedin}
                  className="text-gray-500 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href={socials.github}
                  className="text-gray-500 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={socials.instagram}
                  className="text-gray-500 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href={socials.email}
                  className="text-gray-500 hover:text-white transition"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
              <iframe
                className="mt-6 w-full h-60 rounded-lg border border-gray-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29186.925161647196!2d90.378288!3d23.87664955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d05e7074dd%3A0xd1c58803049f00c7!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1754917737523!5m2!1sen!2sbd"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div>
              {formVisible && (
                <form
                  id="contact-form"
                  onSubmit={handleSubmit}
                  action="https://formspree.io/f/xkgjwjok"
                  method="POST"
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col">
                    <label htmlFor="from_name" className="text-white mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      className="px-4 py-2 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="reply_to" className="text-white mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="reply_to"
                      name="reply_to"
                      required
                      className="px-4 py-2 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-white mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="px-4 py-2 text-white bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg opacity-60 transition-all border border-gray-700 hover:opacity-100 hover:bg-gray-700 cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              )}
              {messageVisible && (
                <div className="mt-4 text-lg text-green-400">
                  ✅ Thank you for your message!
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
