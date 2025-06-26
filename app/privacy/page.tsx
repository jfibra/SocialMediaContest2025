import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Social Media Contests",
  description: "Privacy policy for social media contests hosted by Leuterio Realty & Brokerage.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Privacy Policy</h1>

          <div className="prose prose-sm md:prose max-w-none">
            <p>Last Updated: May 22, 2025</p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p>
              At Leuterio Realty & Brokerage, we respect your privacy and are committed to protecting your personal
              data. This Privacy Policy explains how we collect, use, and safeguard your information when you
              participate in our social media contests.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
            <p>When you participate in our contests, we may collect the following types of information:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>
                <strong>Personal Identification Information:</strong> Name, email address, phone number
              </li>
              <li>
                <strong>Social Media Information:</strong> Links to your social media posts, profile information,
                engagement metrics
              </li>
              <li>
                <strong>Communication Data:</strong> Feedback, responses, and other information you provide when
                communicating with us
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type, device information, and other technology
                identifiers
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>To administer and manage contests, including verifying eligibility and contacting winners</li>
              <li>To analyze contest participation and improve our services</li>
              <li>To communicate with you about contest results and future opportunities</li>
              <li>To comply with legal obligations and enforce our terms and conditions</li>
              <li>To promote our services and share success stories (with your consent)</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">4. Legal Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>
                <strong>Consent:</strong> You have given us permission to process your data for specific purposes
              </li>
              <li>
                <strong>Contract:</strong> Processing is necessary for the performance of our contest terms
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests
              </li>
              <li>
                <strong>Legal Obligation:</strong> Processing is necessary to comply with legal requirements
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">5. Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>
                <strong>Service Providers:</strong> Third parties who provide services on our behalf
              </li>
              <li>
                <strong>Business Partners:</strong> Companies we collaborate with for specific contests
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to protect our rights
              </li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal data from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
              storage is 100% secure.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">7. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was
              collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Right to access and receive a copy of your personal data</li>
              <li>Right to rectify inaccurate or incomplete data</li>
              <li>Right to erasure (the "right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">9. Cookies and Tracking Technologies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your experience. You can set your
              browser to refuse all or some browser cookies, but this may affect your ability to participate in
              contests.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">10. Children's Privacy</h2>
            <p>
              Our contests are not intended for individuals under 18 years of age. We do not knowingly collect personal
              information from children.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
              "Last Updated" date.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Leuterio Realty & Brokerage
              <br />
              Email: info.leuteriorealty@gmail.com
              <br />
              Phone: (+63) 977 815 0888
            </p>

            <div className="mt-8">
              <Link href="/" className="text-realty-secondary hover:text-realty-primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
