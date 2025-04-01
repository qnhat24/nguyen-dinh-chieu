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
    function addClickEffect(button) {
        button.addEventListener("click", function () {
            button.classList.add("clicked");
            setTimeout(() => button.classList.remove("clicked"), 300);  // Loại bỏ hiệu ứng sau 300ms
        });
    }

    addClickEffect(btnIntroduction);
    addClickEffect(btnLife);
    addClickEffect(btnCareer);
    addClickEffect(btnHonor);

    // Các sự kiện để hiển thị nội dung khi bấm nút
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

document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        ["Chở bao nhiêu đạo thuyền không khẳm,", "đâm mấy thằng gian bút chẳng tà."],
        ["Thà đui mà giữ đạo nhà,", "còn hơn sáng mắt mà thờ Tây Dương."],
        ["Một lòng trung hiếu hai chữ lo,", "phận sự con tằm đến thác tơ."],
        ["Tấc lòng trung hiếu đền non nước,", "há dễ ai quên được ba quân."]
    ];

    let currentQuoteIndex = Math.floor(Math.random() * quotes.length);
    let quoteTextElement = document.getElementById("quote-text");

    function typeEffect(text1, text2) {
        let textContent = "";
        let index1 = 0, index2 = 0;
        let cursorElement = '<img src="images/chuot.png" class="cursor">';  // Con trỏ hình ảnh

        function typingFirstLine() {
            if (index1 < text1.length) {
                textContent = text1.slice(0, index1 + 1) + cursorElement;  // Con trỏ được thêm vào dòng 1
                quoteTextElement.innerHTML = textContent;
                index1++;
                setTimeout(typingFirstLine, 100);
            } else {
                // Ẩn con trỏ sau khi dòng 1 viết xong
                textContent = text1 + "<br>";  // Ẩn con trỏ dòng 1
                quoteTextElement.innerHTML = textContent;
                setTimeout(function () {
                    // Tạo con trỏ mới ở dòng 2 và tiếp tục gõ dòng 2
                    quoteTextElement.innerHTML = text1 + "<br>" + cursorElement;
                    typingSecondLine();
                }, 500);
            }
        }

        function typingSecondLine() {
            if (index2 < text2.length) {
                textContent = text1 + "<br>" + text2.slice(0, index2 + 1) + cursorElement;  // Con trỏ xuất hiện ở dòng 2
                quoteTextElement.innerHTML = textContent;
                index2++;
                setTimeout(typingSecondLine, 100);
            } else {
                setTimeout(deleteEffect, 1000);
            }
        }

        typingFirstLine();
    }

    function deleteEffect() {
        let text1 = quotes[currentQuoteIndex][0];
        let text2 = quotes[currentQuoteIndex][1];
        let index1 = text1.length;
        let index2 = text2.length;

        function deletingBothLines() {
            // Xóa dòng 2 trước
            if (index2 > 0) {
                let cursorElement = '<img src="images/chuot.png" class="cursor">';  // Con trỏ ở dòng 2 khi xóa
                textContent = text1 + "<br>" + text2.slice(0, index2 - 1) + cursorElement;
                quoteTextElement.innerHTML = textContent;
                index2--;
                setTimeout(deletingBothLines, 50);
            } else if (index1 > 0) {
                // Khi dòng 2 đã xóa xong, xóa tiếp dòng 1
                let cursorElement = '<img src="images/chuot.png" class="cursor">';  // Con trỏ ở dòng 1 khi xóa
                textContent = text1.slice(0, index1 - 1) + cursorElement;
                quoteTextElement.innerHTML = textContent;
                index1--;
                setTimeout(deletingBothLines, 50);
            } else {
                // Sau khi đã xóa hết cả 2 dòng, bắt đầu lại từ đầu
                setTimeout(function () {
                    quoteTextElement.innerHTML = "";
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                    setTimeout(function () {
                        typeEffect(quotes[currentQuoteIndex][0], quotes[currentQuoteIndex][1]);
                    }, 500);
                }, 500);
            }
        }

        deletingBothLines();
    }

    typeEffect(quotes[currentQuoteIndex][0], quotes[currentQuoteIndex][1]);

    // CSS cho con trỏ hình ảnh
    const style = document.createElement("style");
    style.innerHTML = `
        .cursor {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            animation: blink 0.8s infinite;
            position: relative;
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
        #quote-text {
            position: relative;
            font-size: 20px;
            font-family: 'Courier New', Courier, monospace;
            font-weight: bold;
            color: black;
            white-space: nowrap;
            text-align: center;
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;
    document.head.appendChild(style);
});
