import React from 'react';
import { Check, Star, Zap, Crown, Heart } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "$0",
      period: "/month",
      description: "Perfect for trying out our AI Doctor services",
      features: [
        "Access to General Physician",
        "5 medical reports per month",
        "Basic health consultations",
        "Email support",
        "Community access"
      ],
      buttonText: "Get Started Free",
      popular: false,
      color: "from-blue-500 to-cyan-500",
      icon: Heart
    },
    {
      name: "Pro Plan",
      price: "$29",
      period: "/month",
      description: "Ideal for regular health monitoring and consultations",
      features: [
        "Access to all 10 specialists",
        "Unlimited medical reports",
        "Priority AI consultations",
        "24/7 chat support",
        "Advanced health tracking",
        "Prescription management",
        "Health history analytics"
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
      color: "from-purple-500 to-pink-500",
      icon: Zap
    },
    {
      name: "Premium Plan",
      price: "$59",
      period: "/month",
      description: "Complete healthcare solution for families",
      features: [
        "Everything in Pro Plan",
        "Family account (up to 6 members)",
        "Video consultations",
        "Personalized health plans",
        "Medicine delivery integration",
        "Emergency consultation priority",
        "Dedicated health coordinator",
        "Monthly health reports"
      ],
      buttonText: "Go Premium",
      popular: false,
      color: "from-amber-500 to-orange-500",
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-6 text-blue-600 bg-blue-100 rounded-full animate-pulse">
            <Star className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Trusted by 10,000+ patients</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Health Plan
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Get instant access to AI-powered medical consultations with specialized doctors. 
            Choose the plan that fits your healthcare needs.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-500 mb-16">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-ping"></div>
              <span className="text-sm">FDA Approved</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-ping"></div>
              <span className="text-sm">24/7 Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative group transform transition-all duration-500 hover:scale-105 ${
                  plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 ${
                  plan.popular ? 'border-purple-200 shadow-2xl shadow-purple-100' : 'border-gray-100'
                } group-hover:shadow-2xl transition-all duration-300`}>
                  
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${plan.color}`}></div>
                  
                  <div className="p-8">
                    {/* Plan Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Plan Name & Price */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed">{plan.description}</p>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mr-3 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-600 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg hover:shadow-purple-200 transform hover:-translate-y-1 transition-all duration-300 group-hover:scale-105`}>
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: "Can I upgrade or downgrade my plan anytime?",
                a: "Yes, you can change your plan at any time. Changes take effect immediately and you'll be billed accordingly."
              },
              {
                q: "What happens if I exceed my report limit on the free plan?",
                a: "You'll be notified when approaching your limit. You can upgrade to Pro for unlimited reports or wait until next month."
              },
              {
                q: "Are the AI doctors licensed medical professionals?",
                a: "Our AI is trained on medical data but should not replace professional medical advice. Always consult with licensed doctors for serious conditions."
              },
              {
                q: "Is my health data secure and private?",
                a: "Yes, we're HIPAA compliant and use end-to-end encryption to protect all your health information."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;