const loadWebGazer = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://webgazer.cs.brown.edu/webgazer.js?";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load WebGazer"));
    document.head.appendChild(script);
  });
};

export const initializeWebGazer = async (setWebGazerLoaded) => {
  try {
    await loadWebGazer();
    const { webgazer } = window;
    if (webgazer) {
      webgazer
        .setGazeListener((data, elapsedTime) => {
          if (data == null) {
            return;
          }
          console.log("Gaze Data:", data);
          console.log("Elapsed Time:", elapsedTime);
        })
        .begin();
      webgazer.showVideoPreview(true);
      webgazer.showPredictionPoints(true);
      setWebGazerLoaded(true);
    }
  } catch (error) {
    console.error(error);
  }
};
