const serverUrl = `${import.meta.env.VITE_SERVER_URL}/api`;

export const getVideoInfo = async (url: string) => {
  const response = await fetch(`${serverUrl}/info`, {
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
  const response = await fetch(`${serverUrl}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format }),
  });

  if (!response.ok) {
    throw new Error("Failed to download video");
  }

  return response.blob();
};
