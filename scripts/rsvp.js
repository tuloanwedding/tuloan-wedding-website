// Toast notification function
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    
    // Toast icon based on type
    const iconSvg = type === 'error' 
        ? '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>'
        : '<svg class="toast-icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>';
    
    toast.innerHTML = `
        ${iconSvg}
        <div class="toast-message">${message}</div>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 4000);
}

const submitButtonReadyHTML = `
<svg fill="currentColor" viewBox="0 0 20 20" style="width: 1.25rem; height: 1.25rem;">
    <path id="rsvp-submit-svg" d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
</svg>
Gửi xác nhận
`

const submitButtonLoadingHTML = `
<div class="loading-spinner"></div>
Đang gửi
`

// Set loading state for button
function setButtonLoading(button, isLoading) {
    
    if (isLoading) {
        button.disabled = true;
        
        // Replace icon with loading spinner
        button.innerHTML = submitButtonLoadingHTML;
    } else {
        button.disabled = false;
        // Restore original icon and text
        button.innerHTML = submitButtonReadyHTML;
    }
}

const rsvpSubmitButton = document.getElementById('submit-rsvp');
rsvpSubmitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    
    // Validate form
    const name = document.querySelector('#guest-name').value.trim();
    const attendingElement = document.querySelector('input[name="attendance"]:checked');
    
    if (!name) {
        showToast('Vui lòng nhập họ và tên của bạn!', 'error');
        return;
    }
    
    if (!attendingElement) {
        showToast('Vui lòng cho biết bạn có thể tham dự không!', 'error');
        return;
    }
    
    const attending = attendingElement.value;
    const guests = document.querySelector('#guest-count').value;
    const message = document.querySelector('#guest-wishes').value;
    
    // Set loading state
    setButtonLoading(rsvpSubmitButton, true);
    
    const googleSheetAppScriptURL = 'https://script.google.com/macros/s/AKfycby5giosede14eAUK3OnWdNhy2srXpPH28qaPfUd8Ob2JZkf0iz1PXDx_nlhNeKmHUdg5g/exec'
    
    fetch(googleSheetAppScriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'attending': attending,
            'guests': guests,
            'message': message
        })
    })
    .then(response => {
        // Remove loading state
        setButtonLoading(rsvpSubmitButton, false);
        
        // Show success toast
        if (attending === 'yes') {
            showToast('🎉 Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được gặp bạn tại đám cưới.', 'success');
        } else {
            showToast('🙏 Cảm ơn bạn đã thông báo! Chúng tôi sẽ nhớ bạn trong ngày đặc biệt của mình.', 'success');
        }
        
        // Reset form sau khi submit
        document.querySelector('.rsvp-form').reset();
    })
    .catch(error => {
        // Remove loading state
        setButtonLoading(rsvpSubmitButton, false);
        
        // Show error toast
        showToast('⚠️ Đã có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.', 'error');
        console.error('Error!', error.message);
    });
});