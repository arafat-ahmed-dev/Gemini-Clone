// import React, { useContext, useState } from "react";
// import assets from "../assets/assets";
// import { AppContext } from "../Context/context";

// const Main = () => {
//   const {
//     isStart,
//     setInput,
//     input,
//     setIsStart,
//     prompt,
//     loading,
//     setLoading,
//     setpreviousPrompt,
//   } = useContext(AppContext);
//   const [text, setText] = useState("");
//   const HandleButton = () => {
//     setLoading(true)
//     setInput(text);
//     setpreviousPrompt((prev) => {
//       return [...prev, text];
//     });
//     setText("");
//     setIsStart(true);
//   };

//   return (
//     <>
//       <div className="w-full h-screen flex flex-col relative">
//         <div className="flex justify-between items-center px-5 py-3">
//           <h1 className="text-3xl">Gemini</h1>
//           <div>
//             <img
//               src={assets.user}
//               alt="user"
//               className="w-8 h-8 rounded-full bg-white cursor-pointer"
//             />
//           </div>
//         </div>
//         {isStart ? (
//           <div className="w-full max-h-[75vh] overflow-y-scroll my-8 px-3">
//             <div className="p-5 flex justify-start gap-7">
//               <div>
//                 <img src={assets.user} className="w-5 fill-white" />
//               </div>
//               <div className="w-[95%]">
//               {input} 
//               </div>
//             </div>
//             <div className="p-5 flex items-start justify-start gap-7">
//               <div>
//                 <img
//                   src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
//                   className="w-5"
//                 />
//               </div>
//               {loading ? (
//                  <h1 className="w-[60%]">
//                  <div className="h-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 animate-expandWidth"></div>
//                  <div className="h-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 animate-expandWidth delay-300"></div>
//                  <div className="h-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-expandWidth "></div>
//                  <div className="h-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 animate-expandWidth delay-900"></div>
//                </h1>
//               ) : (
//                 <pre className="w-[95%] tracking-wider whitespace-pre-wrap">{prompt}</pre>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="w-full h-[75vh] flex items-center justify-center text-5xl">
//             <h1>Hello, Arafat</h1>
//           </div>
//         )}
//         <div className="w-full flex justify-center absolute bottom-4">
//           <div className="w-2/3 flex p-2 bg-[#1E1F20] rounded-2xl justify-between">
//             <input
//               type="text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Ask Gemini"
//               className="w-4/5 rounded-2xl outline-none border-none bg-transparent px-3 py-2"
//             />
//             <div className="px-4 flex items-center justify-between">
//               <img
//                 src={assets.image}
//                 alt="image"
//                 className="w-4 mx-2 cursor-pointer"
//               />
//               <img
//                 src={assets.mic}
//                 alt="mic"
//                 className="w-4 mx-2 cursor-pointer"
//               />
//               <img
//                 src={assets.send}
//                 alt="send"
//                 className="w-4 mx-2 cursor-pointer"
//                 onClick={HandleButton}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Main;
import React, { useContext, useState, useEffect } from "react";
import assets from "../assets/assets";
import { AppContext } from "../Context/context";

const Main = () => {
  const {
    isStart,
    setInput,
    input,
    setIsStart,
    prompt,
    loading,
    setLoading,
    setpreviousPrompt,
  } = useContext(AppContext);

  const [text, setText] = useState("");
  const [displayedPrompt, setDisplayedPrompt] = useState(""); // for typing effect
  const [index, setIndex] = useState(0);

  const HandleButton = () => {
    setLoading(true);
    setInput(text);
    setpreviousPrompt((prev) => {
      return [...prev, text];
    });
    setText("");
    setIsStart(true);
  };

  // Function to replace **bold**, ```code```, and remove #
  const formatText = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/#/g, "");
    formattedText = formattedText.replace(/```(.*?)```/gs, (match, codeBlock) => {
      const lines = codeBlock.split("\n");
      const firstLine = lines[0].trim();
      const codeContent = lines.slice(1).join("\n");

      return `
        <div class="code-container bg-black px-4 text-white flex items-center justify-start">
          <pre class='code-block'>
            <p class="text-left w-full text-red-900 font-semibold">${firstLine}</p>
            <code class="w-full flex">${codeContent}</code>
          </pre>
        </div>
      `;
    });

    return formattedText;
  };

  // Typing effect logic
  useEffect(() => {
    if (!loading && prompt && index < prompt.length) {
      const timeout = setTimeout(() => {
        setDisplayedPrompt((prev) => prev + prompt[index]);
        setIndex(index + 1);
      }, 10); // Adjust speed as desired
      return () => clearTimeout(timeout);
    } else if (loading || !prompt) {
      setDisplayedPrompt("");
      setIndex(0);
    }
  }, [index, prompt, loading]);

  return (
    <>
      <div className="w-full h-screen flex flex-col relative">
        <div className="flex justify-between items-center px-5 py-3">
          <h1 className="text-3xl">Gemini</h1>
          <div>
            <img
              src={assets.user}
              alt="user"
              className="w-8 h-8 rounded-full bg-white cursor-pointer"
            />
          </div>
        </div>
        {isStart ? (
          <div className="w-full max-h-[75vh] overflow-y-scroll my-8 px-3">
            <div className="p-5 flex justify-start gap-7">
              <div>
                <img src={assets.user} className="w-5 fill-white" />
              </div>
              <div className="w-[95%]">{input}</div>
            </div>
            <div className="p-5 flex items-start justify-start gap-7">
              <div>
                <img
                  src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg"
                  className="w-5"
                />
              </div>
              {loading ? (
                <h1 className="w-[60%]">
                  <div className="h-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 animate-expandWidth"></div>
                  <div className="h-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 animate-expandWidth delay-300"></div>
                  <div className="h-5 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-expandWidth "></div>
                  <div className="h-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 animate-expandWidth delay-900"></div>
                </h1>
              ) : (
                <pre
                  className="w-[95%] tracking-wider whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatText(displayedPrompt) }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-[75vh] flex items-center justify-center text-5xl">
            <h1>Hello, Arafat</h1>
          </div>
        )}
        <div className="w-full flex justify-center absolute bottom-4">
          <div className="w-2/3 flex p-2 bg-[#1E1F20] rounded-2xl justify-between">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask Gemini"
              className="w-4/5 rounded-2xl outline-none border-none bg-transparent px-3 py-2"
            />
            <div className="px-4 flex items-center justify-between">
              <img
                src={assets.image}
                alt="image"
                className="w-4 mx-2 cursor-pointer"
              />
              <img
                src={assets.mic}
                alt="mic"
                className="w-4 mx-2 cursor-pointer"
              />
              <img
                src={assets.send}
                alt="send"
                className="w-4 mx-2 cursor-pointer"
                onClick={HandleButton}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
