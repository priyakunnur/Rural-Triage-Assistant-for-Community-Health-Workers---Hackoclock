export interface VisualAnalysis {
  hasRedness: boolean; // Simulates rash/bleeding
  hasYellowing: boolean; // Simulates jaundice
}

export async function analyzeImage(file: File): Promise<VisualAnalysis> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        URL.revokeObjectURL(url);
        return resolve({ hasRedness: false, hasYellowing: false });
      }

      // Resize for performance
      const MAX_DIM = 300;
      let width = img.width;
      let height = img.height;
      if (width > height && width > MAX_DIM) {
        height *= MAX_DIM / width;
        width = MAX_DIM;
      } else if (height > MAX_DIM) {
        width *= MAX_DIM / height;
        height = MAX_DIM;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      
      let redCount = 0;
      let yellowCount = 0;
      const totalPixels = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Simple heuristic for prominent redness (Rash / Bleeding)
        if (r > 150 && r > g * 1.5 && r > b * 1.5) {
          redCount++;
        }
        
        // Simple heuristic for yellowing (Jaundice)
        if (r > 150 && g > 150 && b < 100 && Math.abs(r - g) < 50) {
          yellowCount++;
        }
      }
      
      URL.revokeObjectURL(url);
      
      resolve({
        hasRedness: (redCount / totalPixels) > 0.05, // More than 5% prominent red
        hasYellowing: (yellowCount / totalPixels) > 0.05 // More than 5% prominent yellow
      });
    };
    
    img.onerror = () => resolve({ hasRedness: false, hasYellowing: false });
    img.src = url;
  });
}
