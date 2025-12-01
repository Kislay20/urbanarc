export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    children: [
      { label: "Shoes", href: "/category/shoes" },
      { label: "Jackets", href: "/category/jackets" },
      { label: "Shirts", href: "/category/shirts" },
      { label: "T-shirts", href: "/category/t-shirts" }
    ]
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const footerLinks = {
  shop: [
    { label: "All products", href: "/shop" },
    { label: "New In", href: "/category/new-in" },
    { label: "Sale", href: "/category/sale" }
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" }
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" }
  ]
};
