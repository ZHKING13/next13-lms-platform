export const plans = [
  
  {
    id: 2,
    name: "Pack Elite",
    subscription: {
      monthly: {
        price: 33000,
        type: "monthly",
      },
      yearly: {
        price: 350000,
        trails: "2 mois gratuit",
        type: "yearly",
      },
    },
  },
  {
    id: 3,
    name: "Pack Premium",
    subscription: {
      monthly: {
        price: 100000,
        type: "monthly",
      },
      yearly: {
        price: 1000000,
        trails: "2 mois gratuit",
        type: "yearly",
      },
    },
  },
];

export const addOns = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    subscription: {
      monthly: {
        price: 1,
        type: "month",
      },
      yearly: {
        price: 10,
        type: "yearly",
      },
    },
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    subscription: {
      monthly: {
        price: 2,
        type: "month",
      },
      yearly: {
        price: 20,
        type: "yearly",
      },
    },
  },
  {
    id: 3,
    name: "Customizable profile",
    description: "Custom theme to your profile",
    subscription: {
      monthly: {
        price: 2,
        type: "month",
      },
      yearly: {
        price: 20,
        type: "yearly",
      },
    },
  },
];