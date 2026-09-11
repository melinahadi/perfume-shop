import eclatNoir from "../assets/images/products/eclat-noir.webp";
import roseeDivoire from "../assets/images/products/rosee-divoire.webp";
import oudImmortel from "../assets/images/products/oud-immortel.webp";
import lumiereBlanche from "../assets/images/products/lumiere-blanche.webp";

export const products = [{
        id: "eclat-noir",
        name: "Éclat Noir",
        type: "Extrait de Parfum",
        price: 190,
        size: "100ml",
        image: eclatNoir,
        category: "Woody",
        gender: "Unisex",
        description: "A deep and sophisticated composition built around warm woods, amber, and refined aromatic notes.",
        notes: {
            top: ["Bergamot", "Pink Pepper"],
            heart: ["Iris", "Cedarwood"],
            base: ["Amber", "Vetiver", "Musk"],
        },
    },

    {
        id: "rosee-divoire",
        name: "Rosée d'Ivoire",
        type: "Eau de Parfum",
        price: 165,
        size: "100ml",
        image: roseeDivoire,
        category: "Floral",
        gender: "Feminine",
        description: "A delicate floral fragrance with an elegant ivory character, softened by creamy and luminous notes.",
        notes: {
            top: ["Pear", "Bergamot"],
            heart: ["White Rose", "Jasmine"],
            base: ["Vanilla", "Musk", "Sandalwood"],
        },
    },

    {
        id: "oud-immortel",
        name: "Oud Immortel",
        type: "Extrait de Parfum",
        price: 210,
        size: "100ml",
        image: oudImmortel,
        category: "Oriental",
        gender: "Unisex",
        description: "A mysterious and intense oud composition enriched with spices, resinous woods, and warm amber.",
        notes: {
            top: ["Saffron", "Cardamom"],
            heart: ["Oud", "Rose"],
            base: ["Amber", "Leather", "Patchouli"],
        },
    },

    {
        id: "lumiere-blanche",
        name: "Lumière Blanche",
        type: "Eau de Parfum",
        price: 160,
        size: "100ml",
        image: lumiereBlanche,
        category: "Fresh",
        gender: "Unisex",
        description: "A clean and radiant fragrance blending fresh citrus, delicate florals, and soft musks.",
        notes: {
            top: ["Lemon", "Green Mandarin"],
            heart: ["Neroli", "Orange Blossom"],
            base: ["White Musk", "Cedar"],
        },
    },
];