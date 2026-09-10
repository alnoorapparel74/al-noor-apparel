/* =========================================================
   AL NOOR APPAREL
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });

    }


    /* =====================================================
       PRODUCT IMAGE LIGHTBOX / GALLERY
       ===================================================== */

    const imageGallery = document.getElementById("imageGallery");
    const galleryImage = document.getElementById("galleryImage");
    const galleryClose = document.getElementById("galleryClose");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");

    /*
       Agar current HTML page par gallery nahi hai,
       to script safely yahan stop ho jayega.
    */

    if (
    imageGallery &&
    galleryImage &&
    galleryClose
) {

        let galleryImages = [];
        let currentImageIndex = 0;


        /* -------------------------------------------------
           GET ALL PRODUCT IMAGES
           ------------------------------------------------- */

        function loadGalleryImages() {

            const productImages =
document
    .querySelectorAll(".products-section .product-card img")
            galleryImages = Array.from(productImages)
                .map(function (img) {

                    return img.currentSrc || img.src;

                })
                .filter(function (src) {

                    return src && src.trim() !== "";

                });

        }


        /* -------------------------------------------------
           SHOW IMAGE
           ------------------------------------------------- */

        function showGalleryImage(index) {

            if (galleryImages.length === 0) {
                return;
            }

            if (index < 0) {

                index = galleryImages.length - 1;

            }

            if (index >= galleryImages.length) {

                index = 0;

            }

            currentImageIndex = index;

            galleryImage.src =
                galleryImages[currentImageIndex];

        }


       /* -------------------------------------------------
   OPEN GALLERY
   Works with dynamically loaded Supabase products
   ------------------------------------------------- */

document.addEventListener(
    "click",
    function (event) {

        /* -----------------------------------------
           WATCHES IMAGE
           Homepage Watches image → watches.html
           ----------------------------------------- */

        const watchLink =
            event.target.closest(
               ".watches-section .watch-image-link"
            );

        if (watchLink) {
            event.preventDefault();
            window.location.href = "watches.html";
            return;
        }


        /* -----------------------------------------
           NORMAL PRODUCT IMAGE GALLERY
           ----------------------------------------- */

        const img =
            event.target.closest(
                ".product-card img"
            );

        if (!img) {
            return;
        }


        /* Watches ko gallery mein na le jayein */
        if (
            img.closest(
                ".watches-section"
            )
        ) {
            return;
        }


        loadGalleryImages();

        const clickedImage =
            img.currentSrc || img.src;

        currentImageIndex =
            galleryImages.indexOf(
                clickedImage
            );

        if (currentImageIndex < 0) {
            currentImageIndex = 0;
        }

        showGalleryImage(
            currentImageIndex
        );

        imageGallery.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }
);

        /* -------------------------------------------------
           CLOSE GALLERY
           ------------------------------------------------- */

        function closeGallery() {

            imageGallery.classList.remove("active");

            document.body.style.overflow = "";

        }


        galleryClose.addEventListener(
            "click",
            closeGallery
        );


        /* -------------------------------------------------
           NEXT IMAGE
           ------------------------------------------------- */

        galleryNext.addEventListener(
            "click",
            function () {

                showGalleryImage(
                    currentImageIndex + 1
                );

            }
        );


        /* -------------------------------------------------
           PREVIOUS IMAGE
           ------------------------------------------------- */

        galleryPrev.addEventListener(
            "click",
            function () {

                showGalleryImage(
                    currentImageIndex - 1
                );

            }
        );


        /* -------------------------------------------------
           CLICK OUTSIDE IMAGE = CLOSE
           ------------------------------------------------- */

        imageGallery.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === imageGallery
                ) {

                    closeGallery();

                }

            }
        );


        /* -------------------------------------------------
           KEYBOARD CONTROLS
           ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !imageGallery.classList.contains("active")
                ) {

                    return;

                }


                /* ESC */

                if (event.key === "Escape") {

                    closeGallery();

                }


                /* RIGHT ARROW */

                if (event.key === "ArrowRight") {

                    showGalleryImage(
                        currentImageIndex + 1
                    );

                }


                /* LEFT ARROW */

                if (event.key === "ArrowLeft") {

                    showGalleryImage(
                        currentImageIndex - 1
                    );

                }

            }
        );


        /* -------------------------------------------------
           SWIPE SUPPORT FOR MOBILE
           ------------------------------------------------- */

        let touchStartX = 0;
        let touchEndX = 0;


        galleryImage.addEventListener(
            "touchstart",
            function (event) {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        galleryImage.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event.changedTouches[0].screenX;

                const swipeDistance =
                    touchEndX - touchStartX;


                /* Swipe Left = Next */

                if (swipeDistance < -50) {

                    showGalleryImage(
                        currentImageIndex + 1
                    );

                }


                /* Swipe Right = Previous */

                if (swipeDistance > 50) {

                    showGalleryImage(
                        currentImageIndex - 1
                    );

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       PRODUCT DETAILS PAGE GALLERY
       ===================================================== */

    const mainProductImage =
        document.getElementById("mainProductImage");

    const thumbnails =
        document.querySelectorAll(".product-gallery img");


    if (mainProductImage && thumbnails.length > 0) {

        thumbnails.forEach(function (thumbnail) {

            thumbnail.addEventListener(
                "click",
                function () {

                    mainProductImage.src =
                        this.currentSrc || this.src;

                }
            );

        });

    }


    /* =====================================================
    /* =====================================================
   IMAGE FALLBACK
   ===================================================== */

document
    .querySelectorAll("img")
    .forEach(function (img) {

        img.addEventListener(
            "error",
            function () {

                this.style.visibility = "hidden";

            }
        );

    });

});
/* =========================================================
   SMART SEARCH
   Categories + Products
   ========================================================= */

function initSmartSearch() {

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".search-box button");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput || !searchResults) {
        return;
    }

    function getSearchItems() {

        const items = [];

        /* =========================
           CATEGORY CARDS
           ========================= */

        document.querySelectorAll(".category-card").forEach(function (card) {

            const title = card.querySelector("h3");
            const image = card.querySelector("img");

            const name = title
                ? title.textContent.trim()
                : "";

            const dataName =
                card.getAttribute("data-name") || "";

            const alt =
                image
                    ? image.getAttribute("alt") || ""
                    : "";

            const link =
                card.querySelector("a");

            const href =
                link
                    ? link.getAttribute("href") || ""
                    : "";

            items.push({

                element: card,

                name:
                    name ||
                    dataName ||
                    alt,

                searchText: (
                    name + " " +
                    dataName + " " +
                    alt
                ).toLowerCase(),

                href: href,

                type: "category"

            });

        });


        /* =========================
           PRODUCT CARDS
           ========================= */

        document.querySelectorAll(".product-card").forEach(function (card) {

            const title = card.querySelector("h3");
            const image = card.querySelector("img");

            const name = title
                ? title.textContent.trim()
                : "";

            const dataName =
                card.getAttribute("data-name") || "";

            const alt =
                image
                    ? image.getAttribute("alt") || ""
                    : "";

            items.push({

                element: card,

                name:
                    name ||
                    dataName ||
                    alt,

                searchText: (
                    name + " " +
                    dataName + " " +
                    alt
                ).toLowerCase(),

                href: "",

                type: "product"

            });

        });


        return items;
    }


    /* =========================
       CLOSE RESULTS
       ========================= */

    function closeSearch() {

        searchResults.innerHTML = "";

        searchResults.style.display = "none";

    }


    /* =========================
       RUN SEARCH
       ========================= */

    function runSearch() {

        const query =
            searchInput.value.trim().toLowerCase();

        closeSearch();

        if (!query) {
            return;
        }


        const items =
            getSearchItems();


        const matches =
            items.filter(function (item) {

                return item.searchText.includes(query);

            });


        /* =========================
           NO RESULT
           ========================= */

        if (matches.length === 0) {

            const noResult =
                document.createElement("div");

            noResult.className =
                "search-result-item";

            noResult.textContent =
                "No Products Found";

            searchResults.appendChild(
                noResult
            );

            searchResults.style.display =
                "block";

            return;
        }


        /* =========================
           RESULTS
           ========================= */

        matches.forEach(function (item) {

            const result =
                document.createElement("div");

            result.className =
                "search-result-item";

            result.textContent =
                item.name;


            result.addEventListener(
                "click",
                function () {

                    /* CATEGORY */

                    if (
                        item.type === "category" &&
                        item.href
                    ) {

                        window.location.href =
                            item.href;

                        return;

                    }


                    /* PRODUCT */

                    if (item.element) {

                        item.element.scrollIntoView({

                            behavior: "smooth",

                            block: "center"

                        });


                        item.element.classList.add(
                            "search-highlight"
                        );


                        setTimeout(function () {

                            item.element.classList.remove(
                                "search-highlight"
                            );

                        }, 1500);

                    }


                    searchInput.value = "";

                    closeSearch();

                }
            );


            searchResults.appendChild(
                result
            );

        });


        searchResults.style.display =
            "block";

    }


    /* =========================
       TYPING
       ========================= */

    searchInput.addEventListener(
        "input",
        runSearch
    );


    /* =========================
       SEARCH BUTTON
       ========================= */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            runSearch
        );

    }


    /* =========================
       ENTER KEY
       ========================= */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                runSearch();

            }


            if (event.key === "Escape") {

                searchInput.value = "";

                closeSearch();

            }

        }
    );


    /* =========================
       CLICK OUTSIDE
       ========================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(".search-box")
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================================================
   START SEARCH SAFELY
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initSmartSearch
    );

} else {

    initSmartSearch();

}
/* =========================================================
   AL NOOR APPAREL — ORDER FORM + WHATSAPP
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const orderModal = document.getElementById("orderModal");
    const closeOrderModal = document.getElementById("closeOrderModal");
    const orderProductName = document.getElementById("orderProductName");

    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");
    const deliveryAddress = document.getElementById("deliveryAddress");
    const customerCity = document.getElementById("customerCity");

    const onlinePaymentDetails =
        document.getElementById("onlinePaymentDetails");

    const sendOrderWhatsApp =
        document.getElementById("sendOrderWhatsApp");

    let selectedProduct = "";


    /* =========================
       OPEN ORDER FORM
       ========================= */

    document.addEventListener("click", function (event) {

        const orderButton =
            event.target.closest(".product-btn");

        if (!orderButton) return;

        event.preventDefault();

        const productCard =
            orderButton.closest(".product-card");

        if (!productCard) return;

        const productTitle =
            productCard.querySelector("h3");

        selectedProduct =
            productTitle
                ? productTitle.textContent.trim()
                : "Product";

        orderProductName.textContent = selectedProduct;

        orderModal.style.display = "flex";

        document.body.style.overflow = "hidden";
    });


    /* =========================
       CLOSE ORDER FORM
       ========================= */

    closeOrderModal.addEventListener("click", function () {

        orderModal.style.display = "none";

        document.body.style.overflow = "";
    });


    /* =========================
       PAYMENT METHOD
       ========================= */

    const paymentMethods =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );

    paymentMethods.forEach(function (radio) {

        radio.addEventListener("change", function () {

            if (this.value === "Online Payment - 10% Discount") {

                onlinePaymentDetails.style.display = "block";

            } else {

                onlinePaymentDetails.style.display = "none";

            }

        });

    });


    /* =========================
       SEND ORDER TO WHATSAPP
       ========================= */

    sendOrderWhatsApp.addEventListener(
        "click",
        function () {

            const name =
                customerName.value.trim();

            const phone =
                customerPhone.value.trim();

            const address =
                deliveryAddress.value.trim();

            const city =
                customerCity.value.trim();

            const payment =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            if (!name || !phone || !address || !city) {

                alert(
                    "Please complete your name, phone number, address and city."
                );

                return;
            }


            if (!payment) {

                alert(
                    "Please select a payment method."
                );

                return;
            }


            const paymentMethod =
                payment.value;


            const orderId =
                "ANA-" +
                Date.now();


            let message =
                "🛍️ AL NOOR APPAREL ORDER\n\n" +

                "Order ID: " +
                orderId +
                "\n" +

                "Product: " +
                selectedProduct +
                "\n" +

                "Customer Name: " +
                name +
                "\n" +

                "Phone: " +
                phone +
                "\n" +

                "Delivery Address: " +
                address +
                "\n" +

                "City: " +
                city +
                "\n" +

                "Payment Method: " +
                paymentMethod;


            if (
                paymentMethod ===
                "Online Payment - 10% Discount"
            ) {

                message +=
                    "\n\nI will send my payment receipt for confirmation.";
            }


            const whatsappUrl =
                "https://wa.me/923402787575?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappUrl,
                "_blank"
            );

        }
    );

});
/* =========================================================
   CATEGORY SLIDER — DOTS SYNC
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const categorySlider =
        document.querySelector(".category-container");

    const categoryCards =
        document.querySelectorAll(
            ".category-container .category-card"
        );

    const categoryDots =
        document.querySelectorAll(
            ".category-dots span"
        );

    if (
        !categorySlider ||
        categoryCards.length === 0 ||
        categoryDots.length === 0
    ) {
        return;
    }

    function updateCategoryDot() {

        const sliderCenter =
            categorySlider.scrollLeft +
            categorySlider.clientWidth / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        categoryCards.forEach(function (card, index) {

            const cardCenter =
                card.offsetLeft +
                card.offsetWidth / 2;

            const distance =
                Math.abs(
                    cardCenter - sliderCenter
                );

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        categoryDots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === closestIndex
            );

        });
    }

    categorySlider.addEventListener(
        "scroll",
        updateCategoryDot,
        { passive: true }
    );

    categoryDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            if (!categoryCards[index]) {
                return;
            }

            categoryCards[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        });

    });

    updateCategoryDot();

});