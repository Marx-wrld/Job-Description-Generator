const generateDescription = async ({
  //creating an async function that takes the title, industry, keywords, tone and numwords as arguments
    jobTitle,
    industry,
    keyWords,
    tone,
    numWords,
  }) => {
    try {
      //using a fetch API inside a try/catch block to create a POST request to the OpenAI ChatGPT endpoint
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          //OpenAI API uses the API key we generated previously to authenticate the requests
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          //we add the user input values to a pre-configured prompt for the job description. Can be a string, array of strings, array of tokens or array of token arrays
          body: JSON.stringify({
            prompt: `Write a job description for a  ${jobTitle} role 
            ${industry ? `in the ${industry} industry` : ""} that is around ${
              //Added a default value for numwords and tone in the prompt
              numWords || 200
            } words in a ${tone || "neutral"} tone. ${
              keyWords ? `Incorporate the following keywords: ${keyWords}.` : ""
            }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits.`,
            max_tokens: 300,
            //Tokens are common sequences of characters used to generate the job description
            temperature: 0.5,
            //Temperature specifies the sampling temperature to use. Higher values means the model will take more risks
          }),
        }
      );
      const data = await response.json(); //Parsing the response stream from OpenAI API to JSON format and return it from the function
  
      return data.choices[0].text;
    } catch (err) {
      console.error(err);
    }
  };
  
  export default async function handler(req, res) {
    const { jobTitle, industry, keyWords, tone, numWords } = req.body;
  
    const jobDescription = await generateDescription({
      //generateDescription function is used inside the NextJS API route handler and the output from OpenAI API  is returned from the API route.
      jobTitle,
      industry,
      keyWords,
      tone,
      numWords,
    });
  
    res.status(200).json({
      jobDescription,
    });
  }