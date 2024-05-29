const { NlpManager } = require('node-nlp');
const express = require('express');
const app = express();
const nlpManager = new NlpManager({ languages: ['en'] });

// Add documents to the NLP manager
const addNlpDocuments = () => {
  nlpManager.addDocument('en', 'repeat', 'repeat');
  nlpManager.addDocument('en', 'say that again', 'repeat'); 
  nlpManager.addDocument('en', 'repeat the question', 'repeat');
  nlpManager.addDocument('en', 'repeating the question', 'repeat');
  nlpManager.addDocument('en', 'repeat that', 'repeat');
  nlpManager.addDocument('en', 'restate the question', 'repeat');
  nlpManager.addDocument('en', 'go over the question again', 'repeat');
  nlpManager.addDocument('en', 'clarify the question', 'repeat');
  nlpManager.addDocument('en', 'saying that again', 'repeat');
  nlpManager.addDocument('en', 'repeat that last part', 'repeat');
  nlpManager.addDocument('en', 'dont understand', 'repeat');
  nlpManager.addDocument('en', 'some clarification', 'repeat');
  nlpManager.addDocument('en', 'dont understand.', 'repeat');
  nlpManager.addDocument('en', 'didnt get the question.', 'repeat');
  nlpManager.addDocument('en', 'dont know', 'unknow');
  nlpManager.addDocument('en', 'not sure', 'unknow');
  nlpManager.addDocument('en', 'missed the question', 'unknow');
};

app.get('/', (req, res) => {
  res.send("hello");
});

// Train the NLP manager and set up the /check route
(async () => {
  try {
    addNlpDocuments();
    await nlpManager.train();
    
    // Omit nlpManager.save() since file system is read-only

    // Check route
    app.get('/check', async (req, res) => {
      try {
        const response = await nlpManager.process('en', req.query.message);
        res.send(response.intent);
      } catch (err) {
        res.status(500).send({ error: 'Error processing NLP' });
      }
    });

    // Start the server
    const PORT =  3002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Error training NLP manager', err);
  }
})();

// Export the app for Vercel
module.exports = app;