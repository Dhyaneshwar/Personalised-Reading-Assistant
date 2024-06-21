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
  let wordAtPixel = [];
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
      const container = document.getElementById("ContentArea");
      if (container) {
        const { top, left, right, bottom } = container.getBoundingClientRect();
        const { x, y } = data;
        if (left < x && x < right && top < y && y < bottom) {
          const text = container.textContent.trim();
          const words = text.split(/\s+/);
          container.textContent = "";

          words.forEach((word) => {
            const tempSpan = document.createElement("span");
            tempSpan.textContent = word + " ";
            container.appendChild(tempSpan);
            const rect = tempSpan.getBoundingClientRect();
            if (
              x >= rect.left - 25 &&
              x <= rect.right + 25 &&
              y >= rect.top - 25 &&
              y <= rect.bottom + 25
            ) {
              if (wordAtPixel[wordAtPixel.length - 1] !== word) {
                wordAtPixel.push(word);
              }

              console.log(wordAtPixel.join(" "));
            }
          });

          container.textContent = text;

          return wordAtPixel;
        }
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
