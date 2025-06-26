import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms and Conditions | Social Media Contests",
  description: "Terms and conditions for participating in social media contests hosted by Leuterio Realty & Brokerage.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Terms and Conditions</h1>

          <div className="prose prose-sm md:prose max-w-none">
            <p>Last Updated: May 22, 2025</p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
            <p>
              By participating in any contest hosted by Leuterio Realty & Brokerage ("we," "us," or "our"), you agree to
              be bound by these Terms and Conditions. If you do not agree to these terms, please do not participate in
              our contests.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">2. Eligibility</h2>
            <p>Unless otherwise specified, contests are open to individuals who:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Are at least 18 years of age</li>
              <li>Have a valid email address and phone number</li>
              <li>Comply with all requirements specified in the contest rules</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">3. Contest Entry</h2>
            <p>To enter a contest, participants must:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Complete all required fields in the entry form</li>
              <li>Submit entries within the specified contest period</li>
              <li>Follow all contest-specific rules and requirements</li>
              <li>Ensure social media posts are set to public and include required hashtags</li>
              <li>Provide accurate information regarding post engagement metrics</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">4. Content Submission</h2>
            <p>By submitting content (including but not limited to photos, videos, text, and links):</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>You confirm that you own or have permission to use all content submitted</li>
              <li>
                You grant us a non-exclusive, royalty-free license to use, reproduce, modify, and display your content
                for promotional purposes
              </li>
              <li>You agree not to submit content that is unlawful, defamatory, obscene, or otherwise objectionable</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">5. Winner Selection and Prizes</h2>
            <p>Winners will be selected based on:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Criteria specified in the individual contest rules</li>
              <li>Verification of eligibility and compliance with all contest requirements</li>
              <li>Validation of social media engagement metrics</li>
            </ul>
            <p>
              Prizes are non-transferable and cannot be exchanged for cash. We reserve the right to substitute prizes of
              equal or greater value if necessary.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">6. Notification and Claiming Prizes</h2>
            <p>
              Winners will be notified via the contact information provided in their entry form. If a winner does not
              respond within 7 days, we reserve the right to select an alternate winner.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">7. Disqualification</h2>
            <p>We reserve the right to disqualify any participant who:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Provides false or misleading information</li>
              <li>Violates these Terms and Conditions or specific contest rules</li>
              <li>Engages in fraudulent activity, including the use of automated entry methods or fake engagement</li>
              <li>Exhibits behavior that is deemed inappropriate or harmful</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
            <p>Leuterio Realty & Brokerage is not responsible for:</p>
            <ul className="list-disc pl-5 md:pl-6 space-y-1 md:space-y-2">
              <li>Technical failures of any kind</li>
              <li>Unauthorized human intervention in the contest</li>
              <li>Technical or human error that may occur in the administration of the contest</li>
              <li>Any injury or damage to persons or property that may be caused by participation</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">9. Changes to Terms and Conditions</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting to our website.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">10. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of the Philippines, without regard to its conflict of
              law provisions.
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mt-6 mb-3">11. Contact Information</h2>
            <p>For questions regarding these Terms and Conditions, please contact us at:</p>
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
