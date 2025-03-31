document.addEventListener("DOMContentLoaded", function () {
    // Các icon nổi
    let icons = [
        { src: "images/book.png", speed: 3 },
        { src: "images/but.png", speed: 5 },
        { src: "images/feather.png", speed: 4 },
        { src: "images/scroll.png", speed: 6 }
    ];

    // Tạo container riêng cho icon
    let container = document.createElement("div");
    container.className = "floating-container";
    document.body.appendChild(container);

    // Tạo icon gốc + nhân bản thêm icon
    icons.forEach(icon => {
        for (let i = 0; i < 4; i++) {
            let img = document.createElement("img");
            img.src = icon.src;
            img.className = "floating";
            img.dataset.speed = icon.speed;

            let x, y, isOverlap;
            do {
                x = Math.random() * 100;
                y = Math.random() * 100;
                isOverlap = (x > 40 && x < 60) && (y > 25 && y < 75);
            } while (isOverlap);

            img.style.left = x + "vw";
            img.style.top = y + "vh";
            container.appendChild(img);
        }
    });

    // Tạo thêm icon ngẫu nhiên
    for (let i = 0; i < 10; i++) {
        let newIcon = document.createElement("img");
        let images = ["images/book.png", "images/feather.png", "images/scroll.png", "images/but.png"];
        newIcon.src = images[Math.floor(Math.random() * images.length)];
        newIcon.classList.add("floating");
        newIcon.style.position = "absolute";
        newIcon.style.width = Math.random() * 40 + 40 + "px"; // Kích thước ngẫu nhiên từ 40px - 80px
        newIcon.style.left = Math.random() * 100 + "vw";
        newIcon.style.top = Math.random() * 100 + "vh";
        newIcon.dataset.speed = Math.random() * 5 + 2;
        container.appendChild(newIcon);
    }

    // Hiệu ứng di chuyển theo cuộn trang
    window.addEventListener("scroll", function () {
        let scrollY = window.scrollY;
        document.querySelectorAll(".floating").forEach(icon => {
            let speed = parseFloat(icon.dataset.speed) || 5;
            icon.style.transform = `translateY(${scrollY / speed}px)`;
        });
    });

    // Hiệu ứng di chuyển theo chuột (sử dụng requestAnimationFrame để tránh lag)
    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    function updateMouseEffect() {
        document.querySelectorAll(".floating").forEach(icon => {
            let speed = parseFloat(icon.dataset.speed) || 5;
            let moveX = (mouseX - 0.5) * speed * 2;
            let moveY = (mouseY - 0.5) * speed * 2;
            icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        requestAnimationFrame(updateMouseEffect);
    }
    updateMouseEffect();

    // Hiệu ứng trôi nổi nhẹ
    setInterval(() => {
        document.querySelectorAll(".floating").forEach(icon => {
            let xOffset = (Math.random() - 0.5) * 5;
            let yOffset = (Math.random() - 0.5) * 5;
            let currentTransform = icon.style.transform.replace(/translate\(.*?\)/, "");
            icon.style.transform = `${currentTransform} translate(${xOffset}px, ${yOffset}px)`;
        });
    }, 1000);

    // Các nút đã có
    let btnIntroduction = document.getElementById("btn-introduction");
    let btnLife = document.getElementById("btn-life");
    let btnCareer = document.getElementById("btn-career");
    let btnHonor = document.getElementById("btn-honor");

    // Các nội dung cần hiển thị
    let introductionContent = document.getElementById("introduction-content");
    let lifeContent = document.getElementById("life-content");
    let careerContent = document.getElementById("career-content");
    let honorContent = document.getElementById("honor-content");

    // Thêm sự kiện click cho các nút
    btnIntroduction.addEventListener("click", function () {
        introductionContent.classList.toggle("hidden");
        lifeContent.classList.add("hidden");
        careerContent.classList.add("hidden");
        honorContent.classList.add("hidden");
    });

    btnLife.addEventListener("click", function () {
        lifeContent.classList.toggle("hidden");
        introductionContent.classList.add("hidden");
        careerContent.classList.add("hidden");
        honorContent.classList.add("hidden");
    });

    btnCareer.addEventListener("click", function () {
        careerContent.classList.toggle("hidden");
        introductionContent.classList.add("hidden");
        lifeContent.classList.add("hidden");
        honorContent.classList.add("hidden");
    });

    btnHonor.addEventListener("click", function () {
        honorContent.classList.toggle("hidden");
        introductionContent.classList.add("hidden");
        lifeContent.classList.add("hidden");
        careerContent.classList.add("hidden");
    });
});
