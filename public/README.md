# Nano Banana Image Editor

A simple web application that allows users to upload images and enhance them using Google's Nano Banana AI model.

## Features

- **Image Upload**: Drag & drop or click to select images
- **AI Enhancement**: Uses Google's Nano Banana Edit model for image enhancement
- **Customizable Settings**:
  - Scale factor (1x to 4x)
  - Face enhancement toggle
- **Real-time Preview**: See your image before processing
- **Download Results**: Save enhanced images directly
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Comprehensive error messages and retry functionality

## Supported Formats

- JPEG
- PNG
- WEBP

## File Requirements

- Maximum file size: 10MB
- Minimum dimensions: 32x32 pixels
- Maximum dimensions: 4096x4096 pixels

## How to Use

1. **Upload an Image**:
   - Drag and drop an image onto the upload area, or
   - Click "Choose File" to select an image from your device

2. **Configure Settings** (optional):
   - Adjust the scale factor using the slider (1x to 4x)
   - Toggle face enhancement on/off

3. **Enhance Image**:
   - Click the "Enhance Image" button
   - Wait for the AI processing to complete

4. **Download Result**:
   - Click "Download" to save the enhanced image, or
   - Click "Upload New Image" to start over

## API Integration

This website integrates with the **Nano Banana Edit** API from [kie.ai](https://kie.ai/nano-banana?model=google%2Fnano-banana-edit) using their official API documentation.

### API Workflow

The Nano Banana Edit API uses a **two-step asynchronous process**:

1. **Create Task**: Send enhancement request and receive a task ID
2. **Query Status**: Poll for completion and retrieve results

### API Details
- **Create Task Endpoint**: `POST https://api.kie.ai/api/v1/jobs/createTask`
- **Query Status Endpoint**: `GET https://api.kie.ai/api/v1/jobs/recordInfo`
- **API Key**: `3f0a03e48875c3c6832e2f8c3858535d`
- **Content-Type**: `application/json`
- **Authentication**: `Bearer` token in Authorization header

### Request Format

#### Create Task Request
```json
{
  "model": "google/nano-banana-edit",
  "input": {
    "prompt": "Enhance this image with better lighting and colors",
    "image_urls": ["https://example.com/image.jpg"],
    "output_format": "png",
    "image_size": "auto"
  }
}
```

#### Query Status Request
```
GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=YOUR_TASK_ID
```

### Required Parameters
- **`model`** (string, required): Must be `"google/nano-banana-edit"`
- **`input.prompt`** (string, required): The prompt for image editing instructions (max 5000 chars)
- **`input.image_urls`** (array, required): List of image URLs for editing (up to 5 images, max 10MB each)

### Optional Parameters
- **`input.output_format`** (string): Output format - `"png"` or `"jpeg"` (default: `"png"`)
- **`input.image_size`** (string): Image size/aspect ratio
  - `"auto"` (default) - Native resolution
  - `"1:1"` - Square
  - `"3:4"` - Portrait 3:4
  - `"9:16"` - Portrait 9:16
  - `"4:3"` - Landscape 4:3
  - `"16:9"` - Landscape 16:9
- **`callBackUrl`** (string, optional): URL for completion notifications

### Complete API Workflow Example

#### Step 1: Create Task
```json
POST https://api.kie.ai/api/v1/jobs/createTask
Authorization: Bearer 3f0a03e48875c3c6832e2f8c3858535d
Content-Type: application/json

{
  "model": "google/nano-banana-edit",
  "input": {
    "prompt": "Enhance this image with better lighting and colors",
    "image_urls": ["https://example.com/image.jpg"],
    "output_format": "png",
    "image_size": "auto"
  }
}
```

#### Create Task Response
```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "taskId": "281e5b0*********************f39b9"
  }
}
```

#### Step 2: Query Task Status
```
GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=281e5b0*********************f39b9
Authorization: Bearer 3f0a03e48875c3c6832e2f8c3858535d
```

#### Query Status Response (When Complete)
```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "taskId": "281e5b0*********************f39b9",
    "model": "google/nano-banana-edit",
    "state": "success",
    "resultJson": "{\"resultUrls\":[\"https://file.aiquickdraw.com/generated/result.png\"]}",
    "completeTime": 1757584164490
  }
}
```

### Switching to Real API Mode

1. **Edit `script.js`** and change the demo mode flag:
   ```javascript
   const DEMO_MODE = false; // Change from true to false
   ```

2. **Update the API endpoint** (if needed) in `script.js`:
   ```javascript
   const API_URL = 'https://kie.ai/api/v1/models/google/nano-banana-edit';
   ```

3. **The API format is already correct** - The code has been updated to use the proper JSON format with:
   - `prompt` for editing instructions
   - `image_urls` array for input images
   - `output_format` and `image_size` parameters
   - Proper `Bearer` token authentication

4. **Test with real API** - Once you confirm the endpoint works, the application will automatically use the real Nano Banana Edit API.

### Important Notes

- **✅ API Endpoints**: Now using the correct endpoints from official documentation:
  - Create Task: `https://api.kie.ai/api/v1/jobs/createTask`
  - Query Status: `https://api.kie.ai/api/v1/jobs/recordInfo`
- **✅ Image URL Requirement**: The API requires `image_urls` (array of image URLs). The application converts uploaded files to data URLs for compatibility.
- **✅ Authentication**: The API key `3f0a03e48875c3c6832e2f8c3858535d` is properly configured with Bearer token authentication.
- **⏳ Processing Time**: Real API calls may take 30-180 seconds depending on server load and image complexity.
- **🔄 Asynchronous Processing**: The API uses a task-based system - create task, then poll for completion.

### Task States
- `waiting` - Task is queued for processing
- `success` - Task completed successfully, results available
- `fail` - Task failed, check `failMsg` for details

### Error Handling
- **401**: Authentication failed - check API key
- **402**: Insufficient account balance
- **429**: Rate limit exceeded - wait before retrying
- **500**: Server error - retry later

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with gradients and glassmorphism effects
- **Font**: Inter font from Google Fonts
- **Icons**: Custom SVG icons
- **Responsive**: Mobile-first design approach

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Error Handling

The application includes comprehensive error handling for:
- Invalid file formats
- File size limits
- Network errors
- API timeouts
- Server errors
- Corrupted images

## Development

### Option 1: Simple Python Server (Limited by CORS)
```bash
cd /Users/JAY/Desktop/Study/Cursor\ PlayGround/WEBAIR
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser.

⚠️ **Note**: This will encounter CORS errors when making API calls.

### Option 2: Node.js Proxy Server (Recommended)
```bash
# Install dependencies
npm install

# Start the proxy server
npm start
```
Open `https://cursor-playground-ab79a.web.app` in your browser.

✅ **This setup includes a proxy server that handles CORS issues.**

### Option 3: CORS Proxy (Alternative)
Uncomment the CORS proxy line in `script.js`:
```javascript
const API_URL = 'https://cors-anywhere.herokuapp.com/https://kie.ai/api/v1/models/google/nano-banana-edit';
```
Then use the Python server method above.

## Files Structure

```
WEBAIR/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
├── server.js       # Node.js proxy server (handles CORS)
├── package.json    # Node.js dependencies
└── README.md       # This file
```

## License

This project is for educational and demonstration purposes.

## Credits

- **Nano Banana AI**: Google's image enhancement model
- **KIE.ai**: API provider
- **Inter Font**: Google Fonts
- **Icons**: Custom SVG designs

---

**Note**: This application requires an active internet connection to process images through the Nano Banana AI API.
