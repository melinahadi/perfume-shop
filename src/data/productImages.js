import eclatNoir from "../assets/images/products/eclat-noir.webp";
import roseeDivoire from "../assets/images/products/rosee-divoire.webp";
import oudImmortel from "../assets/images/products/oud-immortel.webp";
import lumiereBlanche from "../assets/images/products/lumiere-blanche.webp";

export const productImages = {
    "eclat-noir.webp": eclatNoir,
    "rosee-divoire.webp": roseeDivoire,
    "oud-immortel.webp": oudImmortel,
    "lumiere-blanche.webp": lumiereBlanche,
};

export function getProductImage(imageUrl) {
    if (!imageUrl) return "";

    // اگر مقدار دیتابیس اسم فایل باشد
    if (productImages[imageUrl]) {
        return productImages[imageUrl];
    }

    // اگر URL کامل یا مسیر دیگری باشد
    return imageUrl;
}