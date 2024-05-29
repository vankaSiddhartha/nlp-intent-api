const { NlpManager } = require('node-nlp');
const nlpManager = new NlpManager({ languages: ['en'] });
const express = require('express')
const app = express()
nlpManager.addDocument('en', 'repeat', 'repeat');
nlpManager.addDocument('en', 'say that again', 'repeat'); 
nlpManager.addDocument('en', 'repeat the question', 'repeat');
nlpManager.addDocument('en','repeating the question','repeat')
nlpManager.addDocument('en','repeat that','repeat')
nlpManager.addDocument('en','restate the question','repeat')
nlpManager.addDocument('en','go over the question again','repeat')
nlpManager.addDocument('en','clarify the question,','repeat')
nlpManager.addDocument('en','saying that again','repeat')
nlpManager.addDocument('en','repeat that last part','repeat')
nlpManager.addDocument('en','dont understand','repeat')
nlpManager.addDocument('en','some clarification','repeat')
nlpManager.addDocument('en','dont understand.','repeat')
nlpManager.addDocument('en','didnt get the question.','repeat')
nlpManager.addDocument('en','dont know','unknow')
nlpManager.addDocument('en','not sure','unknow')
nlpManager.addDocument('en','missed the question','unknow')



// Train the NLP manager
nlpManager.train().then( (result) => {
      nlpManager.save()
    app.get('/nlp',async (req,res)=>{
  let responce = await nlpManager.process('en',req.query.message)
  res.send(responce.intent)
    
    })
    app.listen(3002)
  
  
    
}).catch((err) => {
    
});
