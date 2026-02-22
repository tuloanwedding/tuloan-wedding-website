const googleMapAPI = ''; // Add your Google Maps API key here if needed
const longitude = 105.84117; // Example longitude
const latitude = 21.02851;   // Example latitude
const placeName = 'Hội trường tiệc cưới Nhà hàng Tiệc Cưới Hòa Bình'; // Example place name

// Initialize Google Maps
function initializeMap() {
    const mapFrame = document.getElementById('google-map');
    const mapLoading = document.getElementById('map-loading');
    // Update map location to this wedding location
    document.querySelector('.map-')
    // Show map after a delay to simulate loading
    setTimeout(() => {
        if (mapFrame && mapLoading) {
            mapLoading.style.display = 'none';
            mapFrame.style.display = 'block';
        }
    }, 1500);

    // Handle map load error
    if (mapFrame) {
        mapFrame.addEventListener('error', function () {
            mapLoading.innerHTML = `
                        <div class="text-center">
                            <svg class="w-8 h-8 mx-auto text-red-400 mb-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            <p class="text-sm text-gray-600">Không thể tải bản đồ</p>
                            <a href="https://maps.google.com/?q=21.0277644,105.8417516" 
                               target="_blank" 
                               class="inline-block mt-2 text-red-600 hover:text-red-800 text-sm font-medium">
                                Mở Google Maps →
                            </a>
                        </div>
                    `;
        });
    }
}

// Share location function
function shareLocation() {
    const latitude = '20.89729843103502';
    const longitude = '105.8878960447076';
    const locationData = {
        title: 'Địa điểm tổ chức tiệc cưới - Bùi Đức Hòa & Nguyễn Diệu Hương',
        text: 'Tham dự lễ cưới của chúng tôi tại:',
        url: `https://maps.google.com/?q=${latitude},${longitude}`
    };

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share(locationData)
            .then(() => console.log('Đã chia sẻ thành công'))
            .catch((error) => console.log('Lỗi khi chia sẻ:', error));
    } else {
        // Fallback: Copy to clipboard
        const textToCopy = `${locationData.title}\n${locationData.text}\n${locationData.url}`;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showNotification('Đã sao chép địa chỉ vào clipboard!');
                })
                .catch(() => {
                    fallbackCopyToClipboard(textToCopy);
                });
        } else {
            fallbackCopyToClipboard(textToCopy);
        }
    }
}

// Fallback copy to clipboard for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Đã sao chép địa chỉ vào clipboard!');
        } else {
            showNotification('Không thể sao chép. Vui lòng thử lại!');
        }
    } catch (err) {
        showNotification('Không thể sao chép. Vui lòng thử lại!');
    }

    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #dc2626;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}