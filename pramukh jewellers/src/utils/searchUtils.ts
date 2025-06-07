
export const jewelryData = [
  {
    id: 1,
    name: "Gold Bangles",
    category: "Bangles",
    type: "bangle",
    price: "From ₹15,000",
    description: "Traditional and modern gold bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["gold", "bangles", "traditional", "modern", "jewelry"]
  },
  {
    id: 2,
    name: "Diamond Necklace",
    category: "Necklaces",
    type: "necklace",
    price: "From ₹45,000",
    description: "Elegant gold necklaces for every occasion",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["diamond", "necklace", "elegant", "gold", "occasion"]
  },
  {
    id: 3,
    name: "Gold Earrings",
    category: "Earrings",
    type: "earring",
    price: "From ₹8,000",
    description: "Stunning gold earrings to complement your style",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["gold", "earrings", "stunning", "style", "complement"]
  },
  {
    id: 4,
    name: "Wedding Ring",
    category: "Rings",
    type: "ring",
    price: "From ₹25,000",
    description: "Beautiful gold rings to cherish forever",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["wedding", "ring", "gold", "beautiful", "cherish", "forever"]
  },
  {
    id: 5,
    name: "Gold Pendants",
    category: "Pendants",
    type: "pendant",
    price: "From ₹12,000",
    description: "Exquisite gold pendants for special occasions",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["gold", "pendants", "exquisite", "special", "occasions"]
  },
  {
    id: 6,
    name: "Gold Bracelets",
    category: "Bracelets",
    type: "bracelet",
    price: "From ₹18,000",
    description: "Delicate gold bracelets for everyday elegance",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    keywords: ["gold", "bracelets", "delicate", "everyday", "elegance"]
  }
];

export const searchJewelry = (query: string) => {
  if (!query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  
  return jewelryData.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.type.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  });
};
