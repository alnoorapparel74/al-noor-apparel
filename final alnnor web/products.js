document.addEventListener("DOMContentLoaded", function () {

    const products = JSON.parse(
        localStorage.getItem("alNoorProducts")
    ) || [];

    if (!products.length) return;

    const page = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const categoryMap = {
        "shirts.html": "Shirts",
        "pants.html": "Pants",
        "trousers.html": "Trousers",
        "waistcoats.html": "Waistcoats",
        "jackets.html": "Jackets",
        "shawls.html": "Handmade Woolen Shawls",
        "sweaters.html": "Wool Sweaters",
        "baby-collection.html": "Baby Collection",
        "swati-pakol.html": "Swati Pakol (Cap)",
        "perfumes.html": "Perfumes",
        "watches.html": "Watches"
    };

    const currentCategory = categoryMap[page];

    if (!currentCategory) return;

    const categoryProducts = products.filter(function (product) {
        return product.category === currentCategory;
    });

    if (!categoryProducts.length) return;

    const section = document.createElement("section");
    section.className = "admin-added-products";

    section.innerHTML = `
        <div class="product-box">
            ${categoryProducts.map(function (product) {
                return `
                    <div class="product-card">

                        <img
    src="${product.image || ""}"
    alt="${product.name || ""}"
    loading="lazy"
    decoding="async"
>
                        <h3>${product.name}</h3>

                        <p>Size: ${product.size || "Available"}</p>

                        <p>Price: Rs. ${product.price}</p>

                        <p>${product.description || ""}</p>

                    </div>
                `;
            }).join("")}
        </div>
    `;

    const main =
        document.querySelector("main") ||
        document.body;

    main.appendChild(section);

});