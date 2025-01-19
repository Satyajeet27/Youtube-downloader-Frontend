import { useState } from 'react';
import { VideoInfo } from '../types';
import { downloadVideo, getVideoInfo } from '../api';

function Home() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const info = await getVideoInfo(url);
            setVideoInfo(info);
        } catch (err) {
            setError('Failed to fetch video information');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (format: string) => {
        try {
            const blob = await downloadVideo(url, format);
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `video.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
        } catch (err) {
            setError('Failed to download video');
            console.error(err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-amber-400">
                YouTube Video Downloader
            </h1>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter YouTube URL"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Get Info'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {videoInfo && (
                <div className="bg-black text-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">{videoInfo.videoDetails.title}</h2>
                    <img
                        src={videoInfo.videoDetails.thumbnailUrl}
                        alt="Video thumbnail"
                        className="w-full rounded-lg mb-4"
                    />
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleDownload('mp4')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Download MP4
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;