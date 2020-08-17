#!/usr/bin/env node

// Custom plugin to make matched terms available in their original form
//  (for the purpose of highlighting in context)
var originalWordMetadata = (builder) => {
  // Define a pipeline function that stores the token length as metadata
  var pipelineFunction = (token) => {
    token.metadata["originalWord"] = token.toString();
    return token;
  };

  // Register the pipeline function so the index can be serialised
  lunr.Pipeline.registerFunction(pipelineFunction, "originalWordMetadata");

  // Add the pipeline function to the indexing pipeline
  builder.pipeline.before(lunr.stemmer, pipelineFunction);

  // Whitelist the tokenLength metadata key
  builder.metadataWhitelist.push("originalWord");
};

var lunr = require("lunr"),
  stdin = process.stdin,
  stdout = process.stdout,
  buffer = [];

stdin.resume();
stdin.setEncoding("utf8");

stdin.on("data", (data) => buffer.push(data));

stdin.on("end", () => {
  var documents = JSON.parse(buffer.join(""));

  var idx = lunr(function () {
    this.ref("id");
    this.field("text");

    this.use(originalWordMetadata);

    documents.forEach((doc) => this.add(doc));
  });

  // Count hits and de-duplicate originalWords
  for (let [term, termIndex] of Object.entries(idx.invertedIndex)) {
    for (let docTermIndex of Object.values(termIndex.text)) {
      docTermIndex.hitCount = [docTermIndex.originalWord.length];
      docTermIndex.originalWord = [...new Set(docTermIndex.originalWord)];
    }
  }

  stdout.write(JSON.stringify(idx));
});
