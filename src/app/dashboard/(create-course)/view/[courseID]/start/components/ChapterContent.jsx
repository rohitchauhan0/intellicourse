import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

const ChapterContent = ({ chapter, content }) => {
  const [videoDimensions, setVideoDimensions] = useState({
    height: 300,
    width: 300,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVideoDimensions({ height: 200, width: 200 });
      } else if (width < 1024) {
        setVideoDimensions({ height: 250, width: 250 });
      } else {
        setVideoDimensions({ height: 390, width: 640 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const opts = {
    height: videoDimensions.height,
    width: videoDimensions.width,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="">
      {chapter ? (
        <>
          <h2 className="prata-regular my-3 font-bold text-softRed sm:text-left text-xl">
            {chapter.chapter_name}
          </h2>

          <p className="sm:text-lg text-sm">{chapter.about}</p>

          <div className="flex justify-center my-5">
            {content?.videoId ? (
              <YouTube videoId={content.videoId} opts={opts} />
            ) : (
              <p>No video available.</p>
            )}
          </div>

          <div className="">
            {content?.content?.map((item, index) => (
              <div
                key={index}
                className="p-5 bg-muted-foreground rounded-lg text-secondary mb-3"
              >
                <h2 className="font-medium text-lg">{item.title}</h2>
                <ReactMarkdown>{item.description}</ReactMarkdown>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p className="text-center text-2xl font-bold">
            No Chapter Selected yet! Please select a chapter.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChapterContent;
