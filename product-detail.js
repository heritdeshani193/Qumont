// Product Database
const productsDatabase = {
    1: {
        id: 1,
        name: "Premium Towel Rack",
        price: 1299.00,
        images: [
            'https://via.placeholder.com/600x600?text=Towel+Rack+1',
            'https://via.placeholder.com/600x600?text=Towel+Rack+2',
            'https://via.placeholder.com/600x600?text=Towel+Rack+3',
            'https://via.placeholder.com/600x600?text=Towel+Rack+4'
        ],
        shortDesc: "Elegant and modern towel rack with premium finish. Perfect for adding a touch of luxury to your bathroom.",
        detailedDesc: `
            <p>Transform your bathroom into a spa-like sanctuary with our Premium Towel Rack. Crafted with meticulous attention to detail, this stunning piece combines functionality with timeless elegance.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Premium stainless steel construction with anti-rust coating</li>
                <li>Space-efficient design holds up to 4 large bath towels</li>
                <li>Smooth, rounded edges for safety</li>
                <li>Easy installation with included mounting hardware</li>
                <li>Waterproof and easy to clean</li>
            </ul>
            <p>Perfect for modern bathrooms, guest rooms, or spa facilities. This towel rack not only organizes your space but also adds a sophisticated touch to your interior design.</p>
        `,
        specifications: {
            'Material': 'Stainless Steel',
            'Finish': 'Brushed Chrome',
            'Dimensions': '24" x 12" x 8"',
            'Weight Capacity': '15 kg',
            'Installation': 'Wall Mounted',
            'Warranty': '2 Years'
        },
        sku: 'QM-TR-001',
        category: 'Towel Accessories'
    },
    2: {
        id: 2,
        name: "Automatic Soap Dispenser",
        price: 2499.00,
        images: [
            'https://via.placeholder.com/600x600?text=Soap+Dispenser+1',
            'https://via.placeholder.com/600x600?text=Soap+Dispenser+2',
            'https://via.placeholder.com/600x600?text=Soap+Dispenser+3',
            'https://via.placeholder.com/600x600?text=Soap+Dispenser+4'
        ],
        shortDesc: "Touchless automatic soap dispenser with sensor technology. Hygienic and modern solution for your bathroom.",
        detailedDesc: `
            <p>Experience the future of bathroom hygiene with our Automatic Soap Dispenser. This intelligent device uses advanced infrared sensor technology to dispense the perfect amount of soap without any physical contact.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Infrared motion sensor for touchless operation</li>
                <li>Long-lasting battery (up to 3 months)</li>
                <li>Large 300ml capacity refillable container</li>
                <li>Waterproof IPX4 rating</li>
                <li>Adjustable foam volume settings</li>
                <li>LED indicator for low battery</li>
            </ul>
            <p>Ideal for homes, offices, and commercial spaces. Helps maintain cleanliness and reduces germ transmission. Compatible with most liquid soaps and hand sanitizers.</p>
        `,
        specifications: {
            'Technology': 'Infrared Sensor',
            'Battery': '4 AA Batteries (not included)',
            'Capacity': '300ml',
            'Material': 'ABS Plastic',
            'Color': 'White',
            'Waterproof': 'IPX4',
            'Warranty': '2 Years'
        },
        sku: 'QM-SD-002',
        category: 'Hygiene Products'
    },
    3: {
        id: 3,
        name: "Rain Shower Head",
        price: 3999.00,
        images: [
            'https://via.placeholder.com/600x600?text=Shower+Head+1',
            'https://via.placeholder.com/600x600?text=Shower+Head+2',
            'https://via.placeholder.com/600x600?text=Shower+Head+3',
            'https://via.placeholder.com/600x600?text=Shower+Head+4'
        ],
        shortDesc: "Luxurious rain shower head with multiple spray settings. Enjoy a spa-like experience every day.",
        detailedDesc: `
            <p>Indulge in the ultimate showering experience with our Rain Shower Head. Designed to simulate natural rainfall, this premium fixture delivers a gentle, full-body coverage that transforms your daily routine into a luxurious escape.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>8-inch wide rain face for maximum coverage</li>
                <li>3 spray modes: Rainfall, Massage, and Mixed</li>
                <li>Self-cleaning silicone nozzles</li>
                <li>Anti-clog technology</li>
                <li>Chrome finish resistant to water spots</li>
                <li>Easy installation with standard connections</li>
            </ul>
            <p>Perfect for creating a spa-like atmosphere in your bathroom. The gentle rainfall pattern provides a relaxing experience while maintaining water efficiency.</p>
        `,
        specifications: {
            'Size': '8 inches',
            'Flow Rate': '2.5 GPM',
            'Material': 'Brass with Chrome Finish',
            'Nozzles': 'Self-Cleaning Silicone',
            'Spray Modes': '3 Settings',
            'Connection': 'Standard 1/2" NPT',
            'Warranty': '2 Years'
        },
        sku: 'QM-SH-003',
        category: 'Shower Accessories'
    },
    4: {
        id: 4,
        name: "LED Bathroom Mirror",
        price: 5499.00,
        images: [
            'https://via.placeholder.com/600x600?text=LED+Mirror+1',
            'https://via.placeholder.com/600x600?text=LED+Mirror+2',
            'https://via.placeholder.com/600x600?text=LED+Mirror+3',
            'https://via.placeholder.com/600x600?text=LED+Mirror+4'
        ],
        shortDesc: "Modern LED bathroom mirror with anti-fog technology and adjustable brightness. Perfect illumination for your grooming routine.",
        detailedDesc: `
            <p>Illuminate your bathroom with style using our LED Bathroom Mirror. This cutting-edge mirror combines sleek design with advanced features to enhance your daily grooming experience.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Built-in LED strip lighting with dimmable brightness</li>
                <li>Anti-fog technology for clear vision always</li>
                <li>Touch control for easy operation</li>
                <li>Memory function for preferred brightness</li>
                <li>Shatterproof glass with aluminum frame</li>
                <li>Energy-efficient LED technology</li>
            </ul>
            <p>Perfect for modern bathrooms, providing excellent lighting for shaving, makeup application, and general grooming. The anti-fog feature ensures crystal-clear reflection even after a hot shower.</p>
        `,
        specifications: {
            'Size': '24" x 36"',
            'Power': 'AC Adapter Included',
            'LED Type': 'Warm White 3000K',
            'Brightness': 'Dimmable 0-100%',
            'Material': 'Aluminum Frame, Tempered Glass',
            'Anti-Fog': 'Yes',
            'Warranty': '2 Years'
        },
        sku: 'QM-LM-004',
        category: 'Mirrors'
    },
    5: {
        id: 5,
        name: "Wall Mount Toothbrush Holder",
        price: 899.00,
        images: [
            'https://via.placeholder.com/600x600?text=Toothbrush+Holder+1',
            'https://via.placeholder.com/600x600?text=Toothbrush+Holder+2',
            'https://via.placeholder.com/600x600?text=Toothbrush+Holder+3',
            'https://via.placeholder.com/600x600?text=Toothbrush+Holder+4'
        ],
        shortDesc: "Space-saving wall-mounted toothbrush holder with multiple slots. Keeps your countertop organized and hygienic.",
        detailedDesc: `
            <p>Keep your bathroom organized and hygienic with our Wall Mount Toothbrush Holder. This compact yet spacious organizer holds up to 4 toothbrushes and keeps them elevated and dry.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Holds up to 4 toothbrushes</li>
                <li>Built-in drainage holes for quick drying</li>
                <li>Ventilated design prevents bacterial growth</li>
                <li>Strong adhesive mounting (no drilling required)</li>
                <li>Easy to clean and maintain</li>
                <li>Compact design saves counter space</li>
            </ul>
            <p>Perfect for families or shared bathrooms. The elevated design keeps brushes dry and prevents cross-contamination. Easy installation with strong adhesive backing.</p>
        `,
        specifications: {
            'Capacity': '4 Toothbrushes',
            'Mounting': 'Adhesive (No Drilling)',
            'Material': 'BPA-Free Plastic',
            'Dimensions': '8" x 3" x 2"',
            'Drainage': 'Yes',
            'Color': 'White',
            'Warranty': '1 Year'
        },
        sku: 'QM-TH-005',
        category: 'Organizers'
    },
    6: {
        id: 6,
        name: "Premium Tissue Holder",
        price: 699.00,
        images: [
            'https://via.placeholder.com/600x600?text=Tissue+Holder+1',
            'https://via.placeholder.com/600x600?text=Tissue+Holder+2',
            'https://via.placeholder.com/600x600?text=Tissue+Holder+3',
            'https://via.placeholder.com/600x600?text=Tissue+Holder+4'
        ],
        shortDesc: "Elegant tissue holder with easy-access design. Adds sophistication while keeping tissues within reach.",
        detailedDesc: `
            <p>Add a touch of elegance to your bathroom with our Premium Tissue Holder. This beautifully designed holder keeps tissues organized and easily accessible while maintaining a sophisticated aesthetic.</p>
            <h3>Key Features:</h3>
            <ul>
                <li>Standard size fits all tissue boxes</li>
                <li>Easy top-loading design</li>
                <li>Durable metal construction</li>
                <li>Wall mount or countertop placement</li>
                <li>Scratch-resistant finish</li>
                <li>Complements any bathroom decor</li>
            </ul>
            <p>Perfect for keeping your bathroom neat and organized. The elegant design blends seamlessly with modern and traditional bathroom styles alike.</p>
        `,
        specifications: {
            'Material': 'Stainless Steel',
            'Finish': 'Brushed Chrome',
            'Compatibility': 'Standard Tissue Boxes',
            'Mounting': 'Wall or Countertop',
            'Dimensions': '5" x 5" x 8"',
            'Warranty': '1 Year'
        },
        sku: 'QM-TH-006',
        category: 'Organizers'
    }
};

// Get product ID from URL
function getProductId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Current product and quantity
let currentProduct = null;
let currentQuantity = 1;

// Initialize product detail page
function initializeProductDetail() {
    const productId = getProductId();
    currentProduct = productsDatabase[productId];
    
    if (!currentProduct) {
        alert('Product not found!');
        window.location.href = 'Homepage.html';
        return;
    }
    
    // Populate product information
    document.getElementById('productName').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = formatPrice(currentProduct.price);
    document.getElementById('productShortDesc').textContent = currentProduct.shortDesc;
    document.getElementById('detailedDescription').innerHTML = currentProduct.detailedDesc;
    document.getElementById('productSKU').textContent = currentProduct.sku;
    document.getElementById('productCategory').textContent = currentProduct.category;
    
    // Set main image
    document.getElementById('mainImage').src = currentProduct.images[0];
    document.getElementById('mainImage').alt = currentProduct.name;
    
    // Create thumbnails
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    thumbnailGallery.innerHTML = '';
    currentProduct.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `${currentProduct.name} ${index + 1}`;
        thumb.className = index === 0 ? 'thumbnail active' : 'thumbnail';
        thumb.onclick = () => changeMainImage(index);
        thumbnailGallery.appendChild(thumb);
    });
    
    // Populate specifications table
    const specsTable = document.getElementById('specificationsTable');
    specsTable.innerHTML = '';
    Object.entries(currentProduct.specifications).forEach(([key, value]) => {
        const row = specsTable.insertRow();
        const keyCell = row.insertCell(0);
        const valueCell = row.insertCell(1);
        keyCell.textContent = key;
        keyCell.className = 'spec-key';
        valueCell.textContent = value;
        valueCell.className = 'spec-value';
    });
}

// Change main image
function changeMainImage(index) {
    document.getElementById('mainImage').src = currentProduct.images[index];
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Quantity controls
function increaseQuantity() {
    const qtyInput = document.getElementById('quantityInput');
    const currentQty = parseInt(qtyInput.value);
    if (currentQty < 10) {
        qtyInput.value = currentQty + 1;
        currentQuantity = qtyInput.value;
    }
}

function decreaseQuantity() {
    const qtyInput = document.getElementById('quantityInput');
    const currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
        currentQuantity = qtyInput.value;
    }
}

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// Add to cart from detail page
function addToCartFromDetail() {
    if (!currentProduct) return;
    
    if (typeof addToCart === 'function') {
        addToCart({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.images[0],
            quantity: parseInt(currentQuantity)
        });
        
        // Show success message
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
        btn.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.backgroundColor = '';
        }, 2000);
    } else {
        alert('Cart functionality not available. Please go to homepage first.');
    }
}

// Buy now function
function buyNow() {
    if (!currentProduct) return;
    
    // Add to cart first
    if (typeof addToCart === 'function') {
        addToCart({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.images[0],
            quantity: parseInt(currentQuantity)
        });
    }
    
    // Redirect to checkout
    if (typeof goToCheckout === 'function') {
        goToCheckout();
    } else {
        window.location.href = 'checkout.html';
    }
}

// Image zoom (simple toggle)
function toggleZoom() {
    const mainImage = document.getElementById('mainImage');
    mainImage.classList.toggle('zoomed');
}

// Format price
function formatPrice(price) {
    const formattedPrice = parseFloat(price).toFixed(2);
    const parts = formattedPrice.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '₹' + parts.join('.');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeProductDetail);
