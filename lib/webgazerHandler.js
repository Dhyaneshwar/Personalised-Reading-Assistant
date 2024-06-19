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

export const initialWebgazerSetup = (webgazer, options = {}) => {
  const {
    saveDataAcrossSessions = true,
    showVideoPreview = true,
    showPredictionPoints = true,
  } = options;
  window.saveDataAcrossSessions = saveDataAcrossSessions;
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (!data) {
        return;
      }
      const contentArea = document.getElementById("ContentArea");
      const { top, left, right, bottom } = contentArea.getBoundingClientRect();
      const { x, y } = data;
      if (left < x && x < right && top < y && y < bottom) {
        console.log("Gaze Data:", data);
        console.log("Elapsed Time:", elapsedTime);
      }
    })
    .saveDataAcrossSessions(saveDataAcrossSessions)
    .showPredictionPoints(showPredictionPoints)
    .begin();
  handleVideo(webgazer, showVideoPreview);
};

export const initializeWebGazer = async (options = {}) => {
  try {
    await loadWebGazer();
    const { webgazer } = window;
    if (webgazer) {
      initialWebgazerSetup(webgazer, options);
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleVideo = (webgazer, state) => {
  webgazer.showVideo(state);
  webgazer.showVideoPreview(state);
  webgazer.showFaceOverlay(state);
  webgazer.showFaceFeedbackBox(state);
};
