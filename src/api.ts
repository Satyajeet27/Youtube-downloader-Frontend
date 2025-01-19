export const getVideoInfo = async (url: string) => {
  const response = await fetch("http://localhost:3000/api/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch video info");
  }

  return response.json();
};

export const downloadVideo = async (url: string, format = "mp4") => {
  const response = await fetch("http://localhost:3000/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format }),
  });

  if (!response.ok) {
    throw new Error("Failed to download video");
  }

  return response.blob();
};
