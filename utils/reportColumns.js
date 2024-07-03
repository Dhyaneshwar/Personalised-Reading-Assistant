export const detailedReportColumn = [
  {
    field: "index",
    headerName: "Serial No.",
    width: 100,
    type: "number",
  },
  {
    field: "sentenceNumber",
    headerName: "Sentence Number",
    width: 150,
    type: "number",
  },
  { field: "word", headerName: "Word", width: 200, sortable: false },
  {
    field: "isPresentInSentence",
    headerName: "Present in Sentence",
    width: 150,
    sortable: false,
  },
  {
    field: "fixationCount",
    headerName: "Fixation Count",
    type: "number",
    width: 150,
  },
  {
    field: "cumulativeTotalTime",
    headerName: "Read Time per Word (ms)",
    width: 200,
    valueGetter: (value) => Math.round(value * 100) / 100,
  },
  {
    field: "sentenceReadTime",
    headerName: "Read Time per Sentence (ms)",
    width: 220,
    valueGetter: (value) => Math.round(value * 100) / 100,
  },
];

export const maxTimeWordsPerSentenceColumn = [
  {
    field: "index",
    headerName: "Serial No.",
    width: 100,
    type: "number",
  },
  {
    field: "sentenceNumber",
    headerName: "Sentence Number",
    width: 130,
    type: "number",
  },
  { field: "rank", headerName: "Rank", width: 90 },
  { field: "word", headerName: "Word", width: 190, sortable: false },
  {
    field: "cumulativeTotalTime",
    headerName: "Read Time per Word (ms)",
    width: 175,
    valueGetter: (value) => Math.round(value * 100) / 100,
  },
  // {
  //   field: "fixationCount",
  //   headerName: "Fixation Count",
  //   type: "number",
  //   width: 125,
  // },
];

export const maxFixationWordsPerSentenceColumn = [
  {
    field: "index",
    headerName: "Serial No.",
    width: 100,
    type: "number",
  },
  {
    field: "sentenceNumber",
    headerName: "Sentence Number",
    width: 130,
    type: "number",
  },
  { field: "rank", headerName: "Rank", width: 90 },
  { field: "word", headerName: "Word", width: 200, sortable: false },

  {
    field: "fixationCount",
    headerName: "Fixation Count",
    type: "number",
    width: 125,
  },
  // {
  //   field: "cumulativeTotalTime",
  //   headerName: "Read Time per Word (ms)",
  //   width: 185,
  //   valueGetter: (value) => Math.round(value * 100) / 100,
  // },
];

export const saccadeDetailedReportColumn = [
  {
    field: "index",
    headerName: "Serial No.",
    width: 90,
    type: "number",
  },
  {
    field: "sentenceNumber",
    headerName: "Saccade Sentence",
    width: 130,
    type: "number",
  },
  {
    field: "from",
    headerName: "Ending Sentence",
    width: 125,
    type: "number",
    sortable: false,
  },
  {
    field: "to",
    headerName: "Starting Sentence",
    width: 125,
    type: "number",
    sortable: false,
  },
  {
    field: "cumulativeTotalTime",
    headerName: "Saccade Time For Sentence (ms)",
    width: 230,
    valueGetter: (value) => Math.round(value * 100) / 100,
  },
];

export const columnDetailsAbout = [
  <ul
    key="1"
    className="text-justify px-10 list-disc list-inside "
    style={{ paddingBottom: "2rem" }}
  >
    Key data points include:
    <li>
      <span>
        <bold className="font-bold">Serial No.: </bold>Numbering for each row
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Sentence Number: </bold>Position of the
        sentence in the content.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Rank: </bold>Rank of the word based on the
        reading time/fixation within its sentence.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Word: </bold>The specific word being
        analyzed.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Present in Sentence: </bold>Confirmation if
        the word is in the sentence.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Fixation Count: </bold>Number of times the
        reader gaze fixated on the word.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Read Time per Word (ms): </bold>Time taken
        to read the word, in milliseconds.
      </span>
    </li>
    <li>
      <span>
        <bold className="font-bold">Read Time per Sentence (ms): </bold>Total
        time taken to read the entire sentence, in milliseconds.
      </span>
    </li>
  </ul>,
];

export const detailedReportAbout = [
  "This table presents detailed eye-tracking data capturing reading behavior for specific words within sentences. Each row records the analysis for a single word, providing information on its occurrence and engagement metrics.",
  "This summary aids in understanding reading patterns, highlighting words that attract more attention and variations in reading times.",
];

export const maxTimeWordsPerSentenceAbout = [
  "This table highlights the top three words in each sentence that required the most reading time. Each entry provides detailed eye-tracking data to analyze reading behavior, focusing on the most time-consuming words.",
  "This table is useful for identifying which words in each sentence captured the most attention, helping to understand reading patterns and cognitive load during reading.",
];

export const maxFixationWordsPerSentenceAbout = [
  "This table highlights the top three words in each sentence that received the highest number of fixations during reading. Each entry provides detailed eye-tracking data to analyze reading behavior, focusing on the most fixated words.",
  "This table is useful for identifying which words in each sentence captured the most attention, helping to understand reading patterns and cognitive load during reading.",
];

export const saccadeDetailedReportAbout = [
  "This table details the saccadic movements recorded during reading, highlighting the transition times between words in each sentence. Each entry includes the serial number, sentence number, the ending and starting sentence, and the total saccade time for the sentence in milliseconds.",
  "This data is crucial for understanding the eye movement dynamics and reading patterns.",
];

export const defaultPrompt = {
  topicId: "t5",
  contentId: "te2",
  originalLines: [
    "Pioneering biohybrid robotics, Takeuchi and his Biohybrid Systems Laboratory",
    "have developed cutting-edge innovations, including robots that walk using",
    "biological muscle tissue, lab-grown meat, and engineered skin capable of",
    "healing. The latest breakthrough focuses on enhancing robotic skin, addressing",
    "the need for better adhesion between robotic components and the skin's",
    "subcutaneous structure. Takeuchi's team devised a method to bind skin to",
    "complex structures by mimicking human skin-ligament structures and employing",
    "V-shaped perforations in solid materials. This technique, combined with collagen",
    "gel adhesion and plasma treatment, allows for the skin to flex and adhere",
    "without tearing, surpassing previous methods that used anchors or hooks.",
    "This advancement facilitates applying skin to various surface shapes, enhancing",
    "the robot's durability and movement capabilities. Beyond proving feasibility, this",
    "research aims to revolutionize medical research applications, such as creating",
    "a 'face-on-a-chip' for studying skin aging, cosmetics, surgical procedures, and",
    "plastic surgery. Additionally, embedding sensors in the skin could enhance",
    "robots' environmental awareness and interaction abilities. The ultimate goal is",
    "to develop robots with self-healing skin, incorporating features like sweat",
    "glands, blood vessels, and nerves for a more realistic human appearance",
    "and movement. This innovation promises robots with enhanced sensory",
    "capabilities and humanlike dexterity, driving forward the future of biohybrid",
    "robotics.",
  ],
  gazeContent:
    "better structure. better structure. better adhesion better adhesion breakthrough adhesion breakthrough cutting-edge innovations, lab-grown Takeuchi innovations, robotics, Pioneering biohybrid robotics, biohybrid robotics, biohybrid robotics, biohybrid robotics, Takeuchi and his Biohybrid Systems Laboratory Systems Laboratory Systems Laboratory Biohybrid and his including innovations, robotics, Takeuchi biohybrid robotics, cutting-edge Pioneering biohybrid developed have developed cutting-edge innovations, including robots that robots that robots that walk using walk Systems Laboratory that walk Systems that robots including Takeuchi innovations, robotics, Takeuchi cutting-edge innovations, cutting-edge developed have biological muscle tissue, lab-grown meat, and engineered skin engineered skin capable of capable of capable of capable skin that engineered skin engineered including robots engineered innovations, meat, innovations, lab-grown tissue, lab-grown tissue, muscle tissue, muscle biological muscle The healing. The healing. The latest The latest breakthrough focuses meat, focuses meat, and engineered enhancing robotic enhancing robotic enhancing robotic enhancing robotic enhancing robotic enhancing robotic enhancing robotic enhancing robotic skin, robotic skin, addressing skin, addressing capable skin, addressing robotic and engineered enhancing meat, focuses on breakthrough focuses breakthrough latest healing. The need the need the need for need for better for better adhesion better adhesion between robotic between robotic components and the skin's the skin's the skin's the skin's the skin's skin to addressing skin, addressing robotic enhancing robotic between adhesion better adhesion for better need for need subcutaneous the need subcutaneous complex subcutaneous complex subcutaneous structure. better adhesion structure. Takeuchi's adhesion innovations, lab-grown meat,",
  wordReadTime: [
    {
      word: "better",
      timestamp: 17.299999952316284,
    },
    {
      word: "structure.",
      timestamp: 17.299999952316284,
    },
    {
      word: "better",
      timestamp: 2991.399999976158,
    },
    {
      word: "structure.",
      timestamp: 2991.399999976158,
    },
    {
      word: "better",
      timestamp: 3070.899999976158,
    },
    {
      word: "adhesion",
      timestamp: 3070.899999976158,
    },
    {
      word: "better",
      timestamp: 3151.600000023842,
    },
    {
      word: "adhesion",
      timestamp: 3151.600000023842,
    },
    {
      word: "breakthrough",
      timestamp: 3216.100000023842,
    },
    {
      word: "adhesion",
      timestamp: 3216.100000023842,
    },
    {
      word: "breakthrough",
      timestamp: 3278.7000000476837,
    },
    {
      word: "cutting-edge",
      timestamp: 3336,
    },
    {
      word: "innovations,",
      timestamp: 3336,
    },
    {
      word: "lab-grown",
      timestamp: 3336,
    },
    {
      word: "Takeuchi",
      timestamp: 3402.600000023842,
    },
    {
      word: "innovations,",
      timestamp: 3402.600000023842,
    },
    {
      word: "robotics,",
      timestamp: 3463.600000023842,
    },
    {
      word: "Pioneering",
      timestamp: 4655.200000047684,
    },
    {
      word: "biohybrid",
      timestamp: 4791.200000047684,
    },
    {
      word: "robotics,",
      timestamp: 5006,
    },
    {
      word: "biohybrid",
      timestamp: 5085.899999976158,
    },
    {
      word: "robotics,",
      timestamp: 5085.899999976158,
    },
    {
      word: "biohybrid",
      timestamp: 5155.100000023842,
    },
    {
      word: "robotics,",
      timestamp: 5155.100000023842,
    },
    {
      word: "biohybrid",
      timestamp: 5235.700000047684,
    },
    {
      word: "robotics,",
      timestamp: 5235.700000047684,
    },
    {
      word: "Takeuchi",
      timestamp: 5539.399999976158,
    },
    {
      word: "and",
      timestamp: 5717.799999952316,
    },
    {
      word: "his",
      timestamp: 5802.299999952316,
    },
    {
      word: "Biohybrid",
      timestamp: 5868.299999952316,
    },
    {
      word: "Systems",
      timestamp: 6413.700000047684,
    },
    {
      word: "Laboratory",
      timestamp: 6749.5,
    },
    {
      word: "Systems",
      timestamp: 6810.200000047684,
    },
    {
      word: "Laboratory",
      timestamp: 6810.200000047684,
    },
    {
      word: "Systems",
      timestamp: 7433.299999952316,
    },
    {
      word: "Laboratory",
      timestamp: 7433.299999952316,
    },
    {
      word: "Biohybrid",
      timestamp: 7502.100000023842,
    },
    {
      word: "and",
      timestamp: 7570.799999952316,
    },
    {
      word: "his",
      timestamp: 7570.799999952316,
    },
    {
      word: "including",
      timestamp: 7570.799999952316,
    },
    {
      word: "innovations,",
      timestamp: 7635.899999976158,
    },
    {
      word: "robotics,",
      timestamp: 7711.700000047684,
    },
    {
      word: "Takeuchi",
      timestamp: 7711.700000047684,
    },
    {
      word: "biohybrid",
      timestamp: 7790.700000047684,
    },
    {
      word: "robotics,",
      timestamp: 7790.700000047684,
    },
    {
      word: "cutting-edge",
      timestamp: 7790.700000047684,
    },
    {
      word: "Pioneering",
      timestamp: 7848.899999976158,
    },
    {
      word: "biohybrid",
      timestamp: 7848.899999976158,
    },
    {
      word: "developed",
      timestamp: 7848.899999976158,
    },
    {
      word: "have",
      timestamp: 7927.200000047684,
    },
    {
      word: "developed",
      timestamp: 8702.200000047684,
    },
    {
      word: "cutting-edge",
      timestamp: 9145.200000047684,
    },
    {
      word: "innovations,",
      timestamp: 9353.399999976158,
    },
    {
      word: "including",
      timestamp: 9634.5,
    },
    {
      word: "robots",
      timestamp: 9835.200000047684,
    },
    {
      word: "that",
      timestamp: 10272.700000047684,
    },
    {
      word: "robots",
      timestamp: 10353,
    },
    {
      word: "that",
      timestamp: 10353,
    },
    {
      word: "robots",
      timestamp: 10429,
    },
    {
      word: "that",
      timestamp: 10429,
    },
    {
      word: "walk",
      timestamp: 10627.399999976158,
    },
    {
      word: "using",
      timestamp: 10825.5,
    },
    {
      word: "walk",
      timestamp: 11082.100000023842,
    },
    {
      word: "Systems",
      timestamp: 11143,
    },
    {
      word: "Laboratory",
      timestamp: 11143,
    },
    {
      word: "that",
      timestamp: 11143,
    },
    {
      word: "walk",
      timestamp: 11143,
    },
    {
      word: "Systems",
      timestamp: 11210.299999952316,
    },
    {
      word: "that",
      timestamp: 11210.299999952316,
    },
    {
      word: "robots",
      timestamp: 11270.700000047684,
    },
    {
      word: "including",
      timestamp: 11341.200000047684,
    },
    {
      word: "Takeuchi",
      timestamp: 11416.100000023842,
    },
    {
      word: "innovations,",
      timestamp: 11416.100000023842,
    },
    {
      word: "robotics,",
      timestamp: 11477.600000023842,
    },
    {
      word: "Takeuchi",
      timestamp: 11477.600000023842,
    },
    {
      word: "cutting-edge",
      timestamp: 11477.600000023842,
    },
    {
      word: "innovations,",
      timestamp: 11477.600000023842,
    },
    {
      word: "cutting-edge",
      timestamp: 11546,
    },
    {
      word: "developed",
      timestamp: 11620.399999976158,
    },
    {
      word: "have",
      timestamp: 11760.299999952316,
    },
    {
      word: "biological",
      timestamp: 12387.399999976158,
    },
    {
      word: "muscle",
      timestamp: 12630.100000023842,
    },
    {
      word: "tissue,",
      timestamp: 12917,
    },
    {
      word: "lab-grown",
      timestamp: 13179.100000023842,
    },
    {
      word: "meat,",
      timestamp: 13461.100000023842,
    },
    {
      word: "and",
      timestamp: 13594.600000023842,
    },
    {
      word: "engineered",
      timestamp: 13717.100000023842,
    },
    {
      word: "skin",
      timestamp: 14327.200000047684,
    },
    {
      word: "engineered",
      timestamp: 14394.600000023842,
    },
    {
      word: "skin",
      timestamp: 14394.600000023842,
    },
    {
      word: "capable",
      timestamp: 14700.600000023842,
    },
    {
      word: "of",
      timestamp: 15320.399999976158,
    },
    {
      word: "capable",
      timestamp: 15381.5,
    },
    {
      word: "of",
      timestamp: 15381.5,
    },
    {
      word: "capable",
      timestamp: 15449.700000047684,
    },
    {
      word: "of",
      timestamp: 15449.700000047684,
    },
    {
      word: "capable",
      timestamp: 15513.100000023842,
    },
    {
      word: "skin",
      timestamp: 15711.299999952316,
    },
    {
      word: "that",
      timestamp: 15777.200000047684,
    },
    {
      word: "engineered",
      timestamp: 15777.200000047684,
    },
    {
      word: "skin",
      timestamp: 15777.200000047684,
    },
    {
      word: "engineered",
      timestamp: 15849.299999952316,
    },
    {
      word: "including",
      timestamp: 15924.5,
    },
    {
      word: "robots",
      timestamp: 15924.5,
    },
    {
      word: "engineered",
      timestamp: 15924.5,
    },
    {
      word: "innovations,",
      timestamp: 15981.299999952316,
    },
    {
      word: "meat,",
      timestamp: 15981.299999952316,
    },
    {
      word: "innovations,",
      timestamp: 16047.100000023842,
    },
    {
      word: "lab-grown",
      timestamp: 16047.100000023842,
    },
    {
      word: "tissue,",
      timestamp: 16112.5,
    },
    {
      word: "lab-grown",
      timestamp: 16112.5,
    },
    {
      word: "tissue,",
      timestamp: 16187,
    },
    {
      word: "muscle",
      timestamp: 16258.100000023842,
    },
    {
      word: "tissue,",
      timestamp: 16258.100000023842,
    },
    {
      word: "muscle",
      timestamp: 16322.899999976158,
    },
    {
      word: "biological",
      timestamp: 16454.200000047684,
    },
    {
      word: "muscle",
      timestamp: 16454.200000047684,
    },
    {
      word: "The",
      timestamp: 16454.200000047684,
    },
    {
      word: "healing.",
      timestamp: 16532.200000047684,
    },
    {
      word: "The",
      timestamp: 17383.100000023842,
    },
    {
      word: "healing.",
      timestamp: 17456.899999976158,
    },
    {
      word: "The",
      timestamp: 17456.899999976158,
    },
    {
      word: "latest",
      timestamp: 17596.700000047684,
    },
    {
      word: "The",
      timestamp: 17667.5,
    },
    {
      word: "latest",
      timestamp: 17667.5,
    },
    {
      word: "breakthrough",
      timestamp: 17823.700000047684,
    },
    {
      word: "focuses",
      timestamp: 18030.100000023842,
    },
    {
      word: "meat,",
      timestamp: 18179.700000047684,
    },
    {
      word: "focuses",
      timestamp: 18179.700000047684,
    },
    {
      word: "meat,",
      timestamp: 18253.299999952316,
    },
    {
      word: "and",
      timestamp: 18253.299999952316,
    },
    {
      word: "engineered",
      timestamp: 18321.600000023842,
    },
    {
      word: "enhancing",
      timestamp: 18854.799999952316,
    },
    {
      word: "robotic",
      timestamp: 18854.799999952316,
    },
    {
      word: "enhancing",
      timestamp: 18929.5,
    },
    {
      word: "robotic",
      timestamp: 18929.5,
    },
    {
      word: "enhancing",
      timestamp: 19022.799999952316,
    },
    {
      word: "robotic",
      timestamp: 19022.799999952316,
    },
    {
      word: "enhancing",
      timestamp: 19090.399999976158,
    },
    {
      word: "robotic",
      timestamp: 19090.399999976158,
    },
    {
      word: "enhancing",
      timestamp: 19155.799999952316,
    },
    {
      word: "robotic",
      timestamp: 19155.799999952316,
    },
    {
      word: "enhancing",
      timestamp: 19224.399999976158,
    },
    {
      word: "robotic",
      timestamp: 19657.5,
    },
    {
      word: "enhancing",
      timestamp: 19726.5,
    },
    {
      word: "robotic",
      timestamp: 19726.5,
    },
    {
      word: "enhancing",
      timestamp: 19790.700000047684,
    },
    {
      word: "robotic",
      timestamp: 19866,
    },
    {
      word: "skin,",
      timestamp: 19935.100000023842,
    },
    {
      word: "robotic",
      timestamp: 20010.299999952316,
    },
    {
      word: "skin,",
      timestamp: 20010.299999952316,
    },
    {
      word: "addressing",
      timestamp: 20084.100000023842,
    },
    {
      word: "skin,",
      timestamp: 20154.299999952316,
    },
    {
      word: "addressing",
      timestamp: 20154.299999952316,
    },
    {
      word: "capable",
      timestamp: 21150.899999976158,
    },
    {
      word: "skin,",
      timestamp: 21150.899999976158,
    },
    {
      word: "addressing",
      timestamp: 21150.899999976158,
    },
    {
      word: "robotic",
      timestamp: 21220.799999952316,
    },
    {
      word: "and",
      timestamp: 21300.100000023842,
    },
    {
      word: "engineered",
      timestamp: 21300.100000023842,
    },
    {
      word: "enhancing",
      timestamp: 21300.100000023842,
    },
    {
      word: "meat,",
      timestamp: 21364.399999976158,
    },
    {
      word: "focuses",
      timestamp: 21364.399999976158,
    },
    {
      word: "on",
      timestamp: 21364.399999976158,
    },
    {
      word: "breakthrough",
      timestamp: 21429.700000047684,
    },
    {
      word: "focuses",
      timestamp: 21429.700000047684,
    },
    {
      word: "breakthrough",
      timestamp: 21498.200000047684,
    },
    {
      word: "latest",
      timestamp: 21570.5,
    },
    {
      word: "healing.",
      timestamp: 21641.299999952316,
    },
    {
      word: "The",
      timestamp: 21641.299999952316,
    },
    {
      word: "need",
      timestamp: 21641.299999952316,
    },
    {
      word: "the",
      timestamp: 21711.200000047684,
    },
    {
      word: "need",
      timestamp: 22619.200000047684,
    },
    {
      word: "the",
      timestamp: 22745.600000023842,
    },
    {
      word: "need",
      timestamp: 22745.600000023842,
    },
    {
      word: "for",
      timestamp: 23011.5,
    },
    {
      word: "need",
      timestamp: 23148.700000047684,
    },
    {
      word: "for",
      timestamp: 23148.700000047684,
    },
    {
      word: "better",
      timestamp: 23221.799999952316,
    },
    {
      word: "for",
      timestamp: 23295.399999976158,
    },
    {
      word: "better",
      timestamp: 23295.399999976158,
    },
    {
      word: "adhesion",
      timestamp: 23509.299999952316,
    },
    {
      word: "better",
      timestamp: 23591.299999952316,
    },
    {
      word: "adhesion",
      timestamp: 23591.299999952316,
    },
    {
      word: "between",
      timestamp: 23909.5,
    },
    {
      word: "robotic",
      timestamp: 24091.399999976158,
    },
    {
      word: "between",
      timestamp: 24147.299999952316,
    },
    {
      word: "robotic",
      timestamp: 24147.299999952316,
    },
    {
      word: "components",
      timestamp: 24647.299999952316,
    },
    {
      word: "and",
      timestamp: 25040.799999952316,
    },
    {
      word: "the",
      timestamp: 25274.399999976158,
    },
    {
      word: "skin's",
      timestamp: 25457.5,
    },
    {
      word: "the",
      timestamp: 25517.299999952316,
    },
    {
      word: "skin's",
      timestamp: 25517.299999952316,
    },
    {
      word: "the",
      timestamp: 25577.200000047684,
    },
    {
      word: "skin's",
      timestamp: 25577.200000047684,
    },
    {
      word: "the",
      timestamp: 25633.200000047684,
    },
    {
      word: "skin's",
      timestamp: 25763.299999952316,
    },
    {
      word: "the",
      timestamp: 25825.100000023842,
    },
    {
      word: "skin's",
      timestamp: 25825.100000023842,
    },
    {
      word: "skin",
      timestamp: 25976,
    },
    {
      word: "to",
      timestamp: 25976,
    },
    {
      word: "addressing",
      timestamp: 26513.399999976158,
    },
    {
      word: "skin,",
      timestamp: 26595.899999976158,
    },
    {
      word: "addressing",
      timestamp: 26595.899999976158,
    },
    {
      word: "robotic",
      timestamp: 26676.5,
    },
    {
      word: "enhancing",
      timestamp: 26756.799999952316,
    },
    {
      word: "robotic",
      timestamp: 26756.799999952316,
    },
    {
      word: "between",
      timestamp: 26827,
    },
    {
      word: "adhesion",
      timestamp: 26907,
    },
    {
      word: "better",
      timestamp: 26981.299999952316,
    },
    {
      word: "adhesion",
      timestamp: 26981.299999952316,
    },
    {
      word: "for",
      timestamp: 27048.299999952316,
    },
    {
      word: "better",
      timestamp: 27048.299999952316,
    },
    {
      word: "need",
      timestamp: 27127.399999976158,
    },
    {
      word: "for",
      timestamp: 27127.399999976158,
    },
    {
      word: "need",
      timestamp: 27215.600000023842,
    },
    {
      word: "subcutaneous",
      timestamp: 27215.600000023842,
    },
    {
      word: "the",
      timestamp: 27293.299999952316,
    },
    {
      word: "need",
      timestamp: 27293.299999952316,
    },
    {
      word: "subcutaneous",
      timestamp: 27378.100000023842,
    },
    {
      word: "complex",
      timestamp: 27825.600000023842,
    },
    {
      word: "subcutaneous",
      timestamp: 27907.600000023842,
    },
    {
      word: "complex",
      timestamp: 27907.600000023842,
    },
    {
      word: "subcutaneous",
      timestamp: 27982.299999952316,
    },
    {
      word: "structure.",
      timestamp: 28486,
    },
    {
      word: "better",
      timestamp: 28863.799999952316,
    },
    {
      word: "adhesion",
      timestamp: 28863.799999952316,
    },
    {
      word: "structure.",
      timestamp: 28863.799999952316,
    },
    {
      word: "Takeuchi's",
      timestamp: 28863.799999952316,
    },
    {
      word: "adhesion",
      timestamp: 28922.700000047684,
    },
    {
      word: "innovations,",
      timestamp: 29149.399999976158,
    },
    {
      word: "lab-grown",
      timestamp: 29149.399999976158,
    },
    {
      word: "meat,",
      timestamp: 29149.399999976158,
    },
  ],
};
