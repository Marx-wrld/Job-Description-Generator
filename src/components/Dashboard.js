import React, { useState } from "react"; 
//importing the useState hook from react in which hooks are functions that allow us use react features like defining state.
//useState allows you to track the state, which is data in a functional component
//Here we are using the useState hook to track the value of all input fields
export default function Dashboard() {
    //Defining states
  const [jobDescription, setJobDescription] = useState(""); 
  //Is for the job description sent by the ChatGPT API

  const [jobTitle, setJobTitle] = useState(""); //The below are states for all the form fields(title, industry, keywords, setTone, setNumWords)
  const [industry, setIndustry] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false); //Tracks whether the request is being processed after the user hits the Generate button
  const [isCopied, setIsCopied] = useState(false); //Follows whether the user has copied the job description output successfully

  //handleCopy function to copy the jobDescription state to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jobDescription);
    setIsCopied(true);
  };

  //handleSubmit function which prevents the page from reloading using e.preventDefault() when the form is submitted.
  const handleSubmit = async (e) => {
    e.preventDefault();
  //Updating the isGenerating state to true using setIsGenerating(true)
    setIsGenerating(true);
    const res = await fetch("/api/returnJobDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    //we again use the fetch API to send a POST request to our NextJS API route (returnJobDescription) with the user input values in the requests body
      body: JSON.stringify({
        jobTitle,
        industry,
        keyWords,
        tone,
        numWords,
      }),
    });
    setIsGenerating(false); //setting the isGenerating state back to false then converting the response to JSON format and setting it to the jobDescription state
    const data = await res.json();
    setJobDescription(data.jobDescription.trim());
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {/* Using tailwindcss to create a grid of two columns, one for user input and one for the output*/}
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
            {/*Creating a form element and defining its input fields*/}
          <form onSubmit={(e) => handleSubmit(e)}> 
          {/* updating the form with the onSubmit event and passing the handleSubmit function to it*/}
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="jobTitle">
                Job Title
              </label>
              {/*The job title field is the only required field in the form to generate the description*/}
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="jobTitle"
                placeholder="Job Title"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="industry" className="sr-only">
                Industry
              </label>
              <input
              //we use a textarea for the user to enter any relevant info or keywords for the job description
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Industry (Optional)"
                type="text"
                name="industry"
                id="industry"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="keywords" className="sr-only">
                Keywords for AI (Optional)
              </label>
              <textarea
                rows={7}
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
                name="keyWords"
                id="keyWords"
                placeholder="Keywords for AI (Optional)"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="tone">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
              >
                {/* select field for the job description which is optional for the user depending on the tone of the job description he/she wants*/}
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="words" className="sr-only">
                Words (Optional)
              </label>
              <input
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Number Of Words - Default 200 (Optional)"
                name="words"
                id="words"
              />
            </div>
            
            {/*Button to trigger the generation of the job description*/}
            <button
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
                ${
                  isGenerating || jobTitle === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              disabled={isGenerating || jobTitle === ""}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                jobDescription === ""
                  ? 7
                  : jobDescription.split("\n").length + 12
              }
              name="output"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={jobDescription === ""}
              id="output"
              placeholder="AI Generated Job Description"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={jobDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}