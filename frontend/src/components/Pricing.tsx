import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    href: '#',
    priceMonthly: '$29',
    description: 'Perfect for startups and small teams.',
    features: [
      '5 team members',
      '1GB of storage',
      'Basic analytics',
      'Email support',
      'API access',
    ],
  },
  {
    name: 'Professional',
    id: 'tier-professional',
    href: '#',
    priceMonthly: '$99',
    description: 'Ideal for growing businesses.',
    featured: true,
    features: [
      'Unlimited team members',
      '10GB of storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'SSO authentication',
    ],
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$199',
    description: 'For large-scale organizations.',
    features: [
      'Unlimited everything',
      '100GB of storage',
      'Premium analytics',
      '24/7 priority support',
      'API access',
      'Custom integrations',
      'SSO authentication',
      'Dedicated account manager',
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32" id="plans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan to help your team succeed. All plans include 40+ integrations and access to our API.
          </p>
        </motion.div>
        <motion.div 
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.id}
              className={classNames(
                tier.featured ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + tierIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    className={classNames(
                      tier.featured ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                className={classNames(
                  tier.featured
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Get started
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
