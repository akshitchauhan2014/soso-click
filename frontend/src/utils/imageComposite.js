/**
 * Creates a composite image from multiple photos arranged in a grid layout
 * 
 * Photo arrangement: Vertical cell arrangement (fills top to bottom, then left to right)
 * Example for 2x2 grid:
 *   [1] [3]
 *   [2] [4]
 * 
 * @param {string[]} photos - Array of base64 image data URLs
 * @param {Object} grid - Grid configuration { cols: number, rows: number, id: string }
 * @param {number} dpi - Print resolution (default 300 DPI)
 * @returns {Promise<string>} Base64 data URL of the composite image
 */
export async function createGridComposite(photos, grid, dpi = 300) {
  if (!photos || photos.length === 0) {
    throw new Error('No photos provided');
  }

  if (!grid || !grid.cols || !grid.rows) {
    throw new Error('Invalid grid configuration');
  }

  const totalCells = grid.cols * grid.rows;
  if (photos.length !== totalCells) {
    throw new Error(`Expected ${totalCells} photos, got ${photos.length}`);
  }

  // Map grid IDs to print dimensions (width × height in inches)
  const printDimensions = {
    '4x6-single': { width: 4, height: 6 },
    '2x4-vertical-2': { width: 2, height: 4 },
    '4x6-4cut': { width: 4, height: 6 },
    '5x7-6cut': { width: 5, height: 7 },
  };

  // Get print dimensions from grid ID if available, otherwise derive from grid structure
  let printSize = null;
  if (grid.id && printDimensions[grid.id]) {
    printSize = printDimensions[grid.id];
  } else {
    // Derive print dimensions from grid structure
    // Common aspect ratios: 4x6 = 2:3, 5x7 ≈ 5:7, 2x4 = 1:2
    if (grid.cols === 1 && grid.rows === 1) {
      printSize = { width: 4, height: 6 }; // Single photo
    } else if (grid.cols === 2 && grid.rows === 1) {
      printSize = { width: 2, height: 4 }; // 2 vertical
    } else if (grid.cols === 2 && grid.rows === 2) {
      printSize = { width: 4, height: 6 }; // 4 cut
    } else if (grid.cols === 3 && grid.rows === 2) {
      printSize = { width: 5, height: 7 }; // 6 cut
    } else {
      // Default: calculate based on aspect ratio
      const aspect = grid.cols / grid.rows;
      if (aspect > 1.2) {
        printSize = { width: 4, height: 6 };
      } else {
        printSize = { width: 4, height: 6 };
      }
    }
  }

  // Convert inches to pixels at specified DPI
  const canvasWidth = Math.round(printSize.width * dpi);
  const canvasHeight = Math.round(printSize.height * dpi);

  // Calculate cell dimensions
  const cellWidth = canvasWidth / grid.cols;
  const cellHeight = canvasHeight / grid.rows;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  // Fill background with white
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Load all images
  const imagePromises = photos.map((photoSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = photoSrc;
    });
  });

  try {
    const images = await Promise.all(imagePromises);

    // Composite each image into its corresponding cell
    // Vertical arrangement: Fill top to bottom, then left to right
    images.forEach((img, index) => {
      // Calculate row and column for vertical cell arrangement
      // Row is determined by remainder (0 to rows-1)
      // Column is determined by division (0 to cols-1)
      const row = index % grid.rows;
      const col = Math.floor(index / grid.rows);

      // Calculate cell position on canvas
      const x = col * cellWidth;
      const y = row * cellHeight;

      // Calculate scaling to fill cell while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const cellAspect = cellWidth / cellHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspect > cellAspect) {
        // Image is wider than cell - fit to width
        drawWidth = cellWidth;
        drawHeight = cellWidth / imgAspect;
        drawX = x;
        drawY = y + (cellHeight - drawHeight) / 2;
      } else {
        // Image is taller than cell - fit to height
        drawHeight = cellHeight;
        drawWidth = cellHeight * imgAspect;
        drawX = x + (cellWidth - drawWidth) / 2;
        drawY = y;
      }

      // Draw image centered in cell
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    });

    // Return composite as base64 data URL
    return canvas.toDataURL('image/jpeg', 0.95);
  } catch (error) {
    console.error('Error creating composite:', error);
    throw error;
  }
}

