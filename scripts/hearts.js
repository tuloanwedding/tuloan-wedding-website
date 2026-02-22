/**
 * ==========================================================================
 * Falling Hearts Animation Script
 * Hiệu ứng trái tim rơi tương tác cho thiệp cưới
 * ==========================================================================
 */

class FallingHearts {
    constructor() {
        this.heartTypes = ['💕', '❤️', '💖', '💗', '💝', '💘', '🥰', '😍'];
        this.isInitialized = false;
        this.autoCreateInterval = null;
        this.init();
    }

    /**
     * Khởi tạo hiệu ứng trái tim rơi
     */
    init() {
        if (this.isInitialized) return;
        
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.startAutoCreation();
            this.setupHeartInteractions();
            this.isInitialized = true;
        });
    }

    /**
     * Thiết lập event listeners cho tương tác
     */
    setupEventListeners() {
        // Click/Touch events để tạo trái tim tại vị trí click
        document.addEventListener('click', (e) => {
            this.createInteractiveHeart(e.clientX, e.clientY);
        });

        // Touch events cho mobile
        // TODO: Fix issue with mobile unable to scroll
        // document.addEventListener('touchstart', (e) => {
        //     e.preventDefault();
        //     const touch = e.touches[0];
        //     this.createInteractiveHeart(touch.clientX, touch.clientY);
        // }, { passive: false });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Enter') {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * (window.innerHeight * 0.3);
                this.createInteractiveHeart(x, y);
            }
        });
    }

    /**
     * Tạo trái tim tương tác tại vị trí click/touch
     */
    createInteractiveHeart(x, y) {
        const heart = this.createHeartElement();
        
        // Set vị trí và style cho trái tim tương tác
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.position = 'fixed';
        heart.style.pointerEvents = 'none';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heart.style.zIndex = '1000';
        heart.style.color = this.getRandomColor();
        
        // Thêm class cho animation đặc biệt
        heart.classList.add('interactive-heart');
        
        document.body.appendChild(heart);
        
        // Tự động xóa sau khi animation hoàn thành
        setTimeout(() => {
            this.removeHeart(heart);
        }, 4000);
    }

    /**
     * Tạo element trái tim
     */
    createHeartElement() {
        const heart = document.createElement('div');
        heart.innerHTML = this.getRandomHeartType();
        heart.className = 'heart';
        
        // Thêm size ngẫu nhiên
        const sizes = ['small', 'medium', 'large'];
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        heart.classList.add(randomSize);
        
        return heart;
    }

    /**
     * Lấy emoji trái tim ngẫu nhiên
     */
    getRandomHeartType() {
        return this.heartTypes[Math.floor(Math.random() * this.heartTypes.length)];
    }

    /**
     * Lấy màu ngẫu nhiên cho trái tim
     */
    getRandomColor() {
        const colors = [
            '#dc2626', '#ef4444', '#f87171', '#fca5a5', 
            '#be185d', '#ec4899', '#f472b6', '#fb7185'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Tự động tạo trái tim ngẫu nhiên
     */
    startAutoCreation() {
        this.autoCreateInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            this.createInteractiveHeart(x, -50);
        }, 3000);
    }

    /**
     * Dừng tự động tạo trái tim
     */
    stopAutoCreation() {
        if (this.autoCreateInterval) {
            clearInterval(this.autoCreateInterval);
            this.autoCreateInterval = null;
        }
    }

    /**
     * Thiết lập tương tác với các trái tim cố định
     */
    setupHeartInteractions() {
        // Thêm hiệu ứng click cho tất cả SVG hearts
        const hearts = document.querySelectorAll('svg.clickable-heart');
        hearts.forEach(heart => {
            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                this.createHeartBurst(e.target);
            });
        });
    }

    /**
     * Tạo hiệu ứng burst khi click vào heart icon
     */
    createHeartBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Tạo nhiều trái tim xung quanh vị trí click
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                this.createInteractiveHeart(centerX + offsetX, centerY + offsetY);
            }, i * 100);
        }

        // Hiệu ứng scale cho element được click
        element.style.transform = 'scale(1.3)';
        setTimeout(() => {
            element.style.transform = '';
        }, 200);
    }

    /**
     * Xóa trái tim khỏi DOM
     */
    removeHeart(heart) {
        if (heart && heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }

    /**
     * Cleanup khi không cần thiết
     */
    destroy() {
        this.stopAutoCreation();
        
        // Xóa tất cả trái tim tương tác
        const interactiveHearts = document.querySelectorAll('.interactive-heart');
        interactiveHearts.forEach(heart => this.removeHeart(heart));
        
        this.isInitialized = false;
    }

    /**
     * Điều chỉnh cho chế độ tiết kiệm pin
     */
    enablePerformanceMode() {
        this.stopAutoCreation();
        
        // Tạo trái tim ít hơn
        this.autoCreateInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            this.createInteractiveHeart(x, -50);
        }, 6000); // Tăng interval từ 3s lên 6s
    }

    /**
     * Kiểm tra và điều chỉnh theo device capabilities
     */
    optimizeForDevice() {
        // Kiểm tra reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.enablePerformanceMode();
        }

        // Kiểm tra device memory (nếu có)
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            this.enablePerformanceMode();
        }

        // Kiểm tra battery status
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    this.enablePerformanceMode();
                }
            });
        }
    }
}

// Khởi tạo hiệu ứng trái tim rơi
const fallingHearts = new FallingHearts();

// Export cho sử dụng ở nơi khác nếu cần
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FallingHearts;
}

// Tối ưu hóa theo device
fallingHearts.optimizeForDevice();