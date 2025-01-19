const serverUrl = import.meta.env.SERVER_URL;

export const getVideoInfo = async (url: string) => {
  const response = await fetch(serverUrl, {
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
  const response = await fetch(serverUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format }),
  });

  if (!response.ok) {
    throw new Error("Failed to download video");
  }

  return response.blob();
};
