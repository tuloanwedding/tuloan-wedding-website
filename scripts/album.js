// Wedding Album Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize album animations
    initAlbumAnimations();
    
    function initAlbumAnimations() {
        // Create intersection observer for album items
        const albumObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when item comes into view
                    const item = entry.target;
                    if (item.classList.contains('fly-left')) {
                        item.style.animationPlayState = 'running';
                    } else if (item.classList.contains('fly-right')) {
                        item.style.animationPlayState = 'running';
                    }
                    
                    // Stop observing this item
                    albumObserver.unobserve(item);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        // Observe all album items
        const albumItems = document.querySelectorAll('.album-item');
        albumItems.forEach(item => {
            // Initially pause animations
            item.style.animationPlayState = 'paused';
            albumObserver.observe(item);
        });
    }
    
    // Add click handlers for album images (optional lightbox effect)
    const albumImages = document.querySelectorAll('.album-image');
    albumImages.forEach(image => {
        image.addEventListener('click', function() {
            // Simple zoom effect on click
            if (this.style.transform === 'scale(1.2)') {
                this.style.transform = 'scale(1)';
                this.style.position = 'relative';
                this.style.zIndex = '1';
                this.style.transition = 'transform 0.3s ease';
            } else {
                this.style.transform = 'scale(1.2)';
                this.style.position = 'relative';
                this.style.zIndex = '10';
                this.style.transition = 'transform 0.3s ease';
            }
        });
    });
    
    // Reset zoom when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('album-image')) {
            albumImages.forEach(img => {
                img.style.transform = 'scale(1)';
                img.style.position = 'relative';
                img.style.zIndex = '1';
            });
        }
    });
});