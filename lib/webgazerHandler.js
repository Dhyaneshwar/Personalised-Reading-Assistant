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

function getLinesFromParagraph(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const words = container.innerText.split(" ");
    const containerWidth = container.clientWidth;
    const lines = [];
    let line = "";
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = window.getComputedStyle(container).font;
    context.wordSpacing = window.getComputedStyle(container).wordSpacing;

    words.forEach((word) => {
      const testLine = line + word + " ";
      const metrics = context.measureText(testLine.trim());
      const testWidth = metrics.width;

      if (testWidth > containerWidth && line !== "") {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    });

    lines.push(line.trim());
    return lines;
  }

  return [];
}

export const initialWebgazerSetup = (webgazer, options = {}) => {
  // const words =
  //   "News is information about current events. This may be provided through many different media: word of mouth, printing, postal systems, broadcasting, electronic communication, or through the testimony of observers and witnesses to events.";
  // webgazer.wordAtPixel = words.split();
  webgazer.wordAtPixel = [];
  webgazer.wordReadAt = [];
  webgazer.lines = getLinesFromParagraph("ContentArea");

  const {
    saveDataAcrossSessions = true,
    showVideoPreview = true,
    showPredictionPoints = true,
  } = options;
  window.saveDataAcrossSessions = saveDataAcrossSessions;
  webgazer.params.videoViewerHeight = 120;
  webgazer.params.videoViewerWidth = 160;
  webgazer
    .setGazeListener((data, elapsedTime) => {
      if (!data) {
        return;
      }
      const webgazerVideoContainer = document.getElementById(
        "webgazerVideoContainer"
      );
      if (webgazerVideoContainer) {
        webgazerVideoContainer.style.top = "61px";
      }
      const container = document.getElementById("ContentArea");
      if (container) {
        const { top, left, right, bottom } = container.getBoundingClientRect();
        const { x, y } = data;
        if (left < x && x < right && top < y && y < bottom) {
          const text = container.textContent.trim();
          const words = text.split(/\s+/);
          container.textContent = "";

          const fragment = document.createDocumentFragment();
          const spans = [];

          words.forEach((word) => {
            const spanElem = document.createElement("span");
            spanElem.textContent = word + " ";
            fragment.appendChild(spanElem);
            spans.push(spanElem);
          });

          container.appendChild(fragment);

          spans.forEach((spanElem) => {
            const rect = spanElem.getBoundingClientRect();
            if (
              x >= rect.left - 20 &&
              x <= rect.right + 20 &&
              y >= rect.top - 20 &&
              y <= rect.bottom + 20
            ) {
              if (
                webgazer.wordAtPixel[webgazer.wordAtPixel.length - 1] !==
                spanElem.textContent.trim()
              ) {
                webgazer.wordAtPixel.push(spanElem.textContent.trim());
                webgazer.wordReadAt.push({
                  word: spanElem.textContent.trim(),
                  timestamp: elapsedTime,
                });
              }
            }
          });

          container.textContent = text;
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
