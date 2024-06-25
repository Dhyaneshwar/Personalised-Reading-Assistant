import { streamlineGazeContentHandler } from "../groq/streamlineGazeContent/route";
import { extractOriginalContentHandler } from "../groq/extractOriginal/route";

function transformExtractContent(extractedSentences) {
  let extractedOriginal = "";

  for (const prop in extractedSentences) {
    const sentence = extractedSentences[prop];
    extractedOriginal += sentence.originalLine;
  }
  return extractedOriginal;
}

export async function streamlineAndExtractOriginal(prompt) {
  const { originalContent, gazeContent } = prompt;
  const { gazeContent: streamLinedGazeContent } = JSON.parse(
    await streamlineGazeContentHandler(gazeContent)
  );
  const { totalNoLines, ...extractedSentences } = JSON.parse(
    await extractOriginalContentHandler({
      original: originalContent,
      modified: streamLinedGazeContent,
    })
  );
  const extractedOriginal = transformExtractContent(extractedSentences);
  return extractedOriginal;
}
