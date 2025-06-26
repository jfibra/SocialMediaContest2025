import { ArrowRight, Award, Users, TrendingUp } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Contests for Real Estate Professionals</h2>
          <p className="text-lg text-realty-text">
            At Leuterio Realty & Brokerage and Filipino Homes, we empower our agents through engaging social media
            contests tied to our events. Team leaders can also create their own contests through our CRM platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md opacity-0 animate-fadeIn animate-delay-100">
            <div className="bg-realty-primary bg-opacity-10 p-4 rounded-full inline-block mb-4">
              <Award className="h-8 w-8 text-realty-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Event-Based Contests</h3>
            <p className="text-realty-text mb-4">
              Our social media contests are designed for agents attending our company events, providing opportunities to
              engage and win prizes.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-realty-secondary hover:text-realty-primary transition-colors"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md opacity-0 animate-fadeIn animate-delay-200">
            <div className="bg-realty-primary bg-opacity-10 p-4 rounded-full inline-block mb-4">
              <Users className="h-8 w-8 text-realty-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Team Leader Tools</h3>
            <p className="text-realty-text mb-4">
              Team leaders can create their own contests through our CRM platform at leuteriorealty.com for their
              specific events and team activities.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-realty-secondary hover:text-realty-primary transition-colors"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md opacity-0 animate-fadeIn animate-delay-300">
            <div className="bg-realty-primary bg-opacity-10 p-4 rounded-full inline-block mb-4">
              <TrendingUp className="h-8 w-8 text-realty-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Boost Your Visibility</h3>
            <p className="text-realty-text mb-4">
              Participating in our contests helps agents increase their social media presence and connect with potential
              clients in the Philippine real estate market.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-realty-secondary hover:text-realty-primary transition-colors"
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* The "Why Our Social Media Contests Work" section has been removed */}
      </div>
    </section>
  )
}
