// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const removeBtn = document.getElementById('removeBtn');
const enhanceBtn = document.getElementById('enhanceBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultSection = document.getElementById('resultSection');
const resultImage = document.getElementById('resultImage');
const resultImageWrapper = document.getElementById('resultImageWrapper');
const downloadBtn = document.getElementById('downloadBtn');
const promptInput = document.getElementById('promptInput');
const imageSizeSelect = document.getElementById('imageSizeSelect');
const placeholderContent = document.getElementById('placeholderContent');
const demoIndicator = document.getElementById('demoIndicator');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Global variables
let selectedFile = null;
// API endpoint - using Railway backend
const API_URL = 'https://aiar-image-editor.railway.app/api/enhance';

// Demo mode flag - enabled while troubleshooting Railway backend
const DEMO_MODE = true;

// API Key for authentication
const API_KEY = '3f0a03e48875c3c6832e2f8c3858535d';

// Initialize the application
function init() {
    setupEventListeners();
    updateDemoIndicator();
    
    // Mobile-specific initialization
    if (isMobile()) {
        setupMobileOptimizations();
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// Mobile-specific optimizations
function setupMobileOptimizations() {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve touch handling
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
}

// Update demo indicator visibility
function updateDemoIndicator() {
    if (DEMO_MODE && demoIndicator) {
        demoIndicator.style.display = 'inline-flex';
    } else if (demoIndicator) {
        demoIndicator.style.display = 'none';
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Upload area events
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // Preview events
    if (removeBtn) {
        removeBtn.addEventListener('click', removeImage);
    }

    // Action events
    enhanceBtn.addEventListener('click', enhanceImage);

    // Format option events
    setupFormatOptions();
    setupResetButton();
}

// Setup format option buttons
function setupFormatOptions() {
    const formatOptions = document.querySelectorAll('.format-option');
    formatOptions.forEach(option => {
        option.addEventListener('click', () => {
            formatOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
}

// Setup reset button
function setupResetButton() {
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
}

// Reset form to initial state
function resetForm() {
    promptInput.value = 'make it realistic';
    removeImage();
    
    // Reset format options
    const formatOptions = document.querySelectorAll('.format-option');
    formatOptions.forEach(opt => opt.classList.remove('active'));
    document.querySelector('.format-option[data-format="png"]').classList.add('active');
    
    // Reset image size
    imageSizeSelect.value = 'auto';
    
    // Hide result
    hideResult();
}

// Handle drag over event
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255,255,255,0.8)';
}

// Handle file drop
function handleDrop(e) {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255,255,255,0.3)';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Process selected file
function handleFile(file) {
    // Validate file type
    if (!file.type.match('image/(jpeg|png|webp)')) {
        showMessage('Please select a valid image file (JPEG, PNG, or WEBP).', 'error');
        return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        showMessage('File size must be less than 10MB.', 'error');
        return;
    }

    // Validate minimum file size (1KB min to avoid empty/corrupt files)
    if (file.size < 1024) {
        showMessage('File appears to be too small or corrupted. Please select a valid image.', 'error');
        return;
    }

    // Check if file is actually an image by reading it
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Validate minimum dimensions
            if (img.width < 32 || img.height < 32) {
                showMessage('Image dimensions are too small. Please use an image at least 32x32 pixels.', 'error');
                return;
            }
            // Validate maximum dimensions (to prevent memory issues)
            if (img.width > 4096 || img.height > 4096) {
                showMessage('Image dimensions are too large. Please use an image smaller than 4096x4096 pixels.', 'error');
                return;
            }

            selectedFile = file;
            displayPreview(file);
        };
        img.onerror = () => {
            showMessage('Invalid or corrupted image file. Please select a different image.', 'error');
        };
        img.src = e.target.result;
    };
    reader.onerror = () => {
        showMessage('Error reading file. Please try again.', 'error');
    };
    reader.readAsDataURL(file);
}

// Display image preview
function displayPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewSection.style.display = 'block';
        uploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Remove selected image
function removeImage() {
    selectedFile = null;
    previewSection.style.display = 'none';
    uploadArea.style.display = 'block';
    fileInput.value = '';
    hideResult();
}

// Hide result section
function hideResult() {
    resultImage.style.display = 'none';
    placeholderContent.style.display = 'block';
}

// Enhance image using Nano Banana API
async function enhanceImage() {
    if (!selectedFile) {
        showMessage('Please select an image first.', 'error');
        return;
    }

    // Show loading state
    setLoading(true);

    if (DEMO_MODE) {
        // Demo mode - simulate API processing
        await simulateEnhancement();
    } else {
        // Real API mode
        await realEnhancement();
    }
}

// Simulate enhancement for demo purposes
async function simulateEnhancement() {
    try {
        // First upload the image to get a URL
        const imageFormData = new FormData();
        imageFormData.append('image', selectedFile);

        // Upload image to get URL (in demo mode, we'll simulate this)
        const imageUrl = await uploadImageForUrl(selectedFile);

        // Get selected format and image size
        const selectedFormat = document.querySelector('.format-option.active')?.dataset.format || 'png';
        const selectedImageSize = imageSizeSelect.value || 'auto';
        
        updateProgress(20, 'Processing image...');
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        updateProgress(50, 'Applying AI enhancement...');
        
        // Simulate more processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        updateProgress(80, 'Finalizing result...');
        
        // Simulate final processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        updateProgress(100, 'Complete!');
        
        // Use a sample result image for demo
        const demoImageUrl = "https://file.aiquickdraw.com/custom-page/akr/section-images/1756260298615p09gs2nz.webp";
        
        // Display the result
        setTimeout(() => {
            displayResult(demoImageUrl);
            showMessage('Demo: Image enhancement completed! (This is a sample result)', 'success');
        }, 500);

    } catch (error) {
        console.error('Demo enhancement error:', error);
        showMessage('Demo mode: Failed to simulate enhancement.', 'error', true);
    } finally {
        setLoading(false);
    }
}

// Helper function to simulate image URL generation
async function uploadImageForUrl(file) {
    // In a real implementation, you'd upload to a service like imgur, cloudinary, etc.
    // For demo, we'll create a data URL
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

// Upload image to get a public URL for the API
async function uploadImageToCDN(file) {
    updateProgress(10, 'Uploading image...');
    
    try {
        updateProgress(20, 'Processing image...');
        
        // Upload to our backend which handles Imgur upload
        const formData = new FormData();
        formData.append('image', file);
        
        const backendUrl = API_URL.replace('/api/enhance', '/api/upload-image');
        const response = await fetch(backendUrl, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        
        const data = await response.json();
        
        if (data.url) {
            updateProgress(30, 'Image uploaded successfully');
            return data.url;
        } else {
            throw new Error('Invalid response from backend');
        }
        
    } catch (error) {
        console.error('Image upload failed:', error);
        showMessage('Image upload failed, using sample image for testing', 'warning');
        return "https://file.aiquickdraw.com/custom-page/akr/section-images/1756223420389w8xa2jfe.png";
    }
}

// Real API enhancement (when API is available)
async function realEnhancement() {
    try {
        // Upload the user's image to get a public URL
        updateProgress(5, 'Preparing image...');
        const imageUrl = await uploadImageToCDN(selectedFile);

        // Get selected format and image size
        const selectedFormat = document.querySelector('.format-option.active')?.dataset.format || 'png';
        const selectedImageSize = imageSizeSelect.value || 'auto';
        
        // Prepare API request with correct format based on kie.ai documentation
        const requestData = {
            prompt: promptInput.value || 'make it realistic',
            image_urls: [imageUrl],
            output_format: selectedFormat,
            image_size: selectedImageSize
        };

        updateProgress(40, 'Sending request to AI...');

        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(requestData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorMessage = 'Failed to enhance image.';
            if (response.status === 400) {
                errorMessage = 'Invalid image or parameters. Please check your file and try again.';
            } else if (response.status === 413) {
                errorMessage = 'Image file is too large. Please use a smaller image (max 10MB).';
            } else if (response.status === 429) {
                errorMessage = 'Too many requests. Please wait a moment and try again.';
            } else if (response.status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
            throw new Error(`${errorMessage} (${response.status})`);
        }

        const result = await response.json();

        // Validate response structure
        if (!result || typeof result !== 'object') {
            throw new Error('Invalid response format from server.');
        }

        if (result.error) {
            throw new Error(result.error.message || 'API returned an error.');
        }

        updateProgress(80, 'Processing response...');
        
        if (result.image || result.output) {
            const imageUrl = result.image || result.output;
            updateProgress(100, 'Complete!');
            setTimeout(() => {
                displayResult(imageUrl);
            }, 500);
        } else {
            throw new Error('No enhanced image received from server.');
        }

    } catch (error) {
        console.error('Error enhancing image:', error);

        let userMessage = 'Failed to enhance image. Please try again.';

        if (error.name === 'AbortError') {
            userMessage = 'Request timed out. Please check your connection and try again.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            userMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message) {
            userMessage = error.message;
        }

        showMessage(userMessage, 'error', true);
    } finally {
        setLoading(false);
    }
}

// Display enhanced result
function displayResult(imageUrl) {
    resultImage.src = imageUrl;
    resultImageWrapper.style.display = 'flex';
    placeholderContent.style.display = 'none';
    
    // Store the image URL for download
    downloadBtn.onclick = () => downloadImage(imageUrl);
    
    showMessage('Image enhanced successfully!', 'success');
}

// Download image function
function downloadImage(imageUrl) {
    try {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `nano-banana-result-${Date.now()}.png`;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage('Image download started!', 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showMessage('Download failed. Try right-clicking the image and "Save as..."', 'error');
    }
}

// Set loading state
function setLoading(isLoading) {
    const btnText = enhanceBtn.querySelector('.btn-text');
    const spinner = enhanceBtn.querySelector('.loading-spinner');

    if (isLoading) {
        btnText.textContent = 'Processing...';
        spinner.style.display = 'block';
        enhanceBtn.disabled = true;
        enhanceBtn.style.opacity = '0.7';
        progressContainer.style.display = 'block';
        
        // Hide previous results
        resultImageWrapper.style.display = 'none';
        placeholderContent.style.display = 'block';
    } else {
        btnText.textContent = '⭐ 2 Run';
        spinner.style.display = 'none';
        enhanceBtn.disabled = false;
        enhanceBtn.style.opacity = '1';
        progressContainer.style.display = 'none';
        updateProgress(0, '');
    }
}

// Update progress bar
function updateProgress(percentage, text) {
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    if (progressText) {
        progressText.textContent = text;
    }
}

// Show message to user
function showMessage(text, type = 'info', showRetry = false) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message container
    const message = document.createElement('div');
    message.className = `message ${type}`;

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = text;

    // Add retry button if needed
    if (showRetry && type === 'error') {
        const retryBtn = document.createElement('button');
        retryBtn.className = 'retry-btn';
        retryBtn.textContent = 'Retry';
        retryBtn.onclick = () => {
            message.remove();
            enhanceImage();
        };
        messageContent.appendChild(retryBtn);
    }

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => message.remove();

    message.appendChild(messageContent);
    message.appendChild(closeBtn);

    // Insert message at the top of the container
    const container = document.querySelector('.container');
    container.insertBefore(message, container.firstChild);

    // Auto-remove message after 8 seconds for errors, 5 seconds for others
    const timeout = type === 'error' ? 8000 : 5000;
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, timeout);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
