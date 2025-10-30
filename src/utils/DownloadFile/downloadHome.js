import React, { useState, useEffect } from "react";
import DownloadManager from "../DownloadManager";

const animationData = {
    vardani: {
        animationId: "Vardani_Bargad",
        animationUrl: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/VardaniBargad.json",
        animationFile: "Vardani_Bargad.json",
    },
    shivalya: {
        animationId: "shivlinga",
        animationUrl: "https://astroonemedia.s3.ap-south-1.amazonaws.com/assetsImages/Json/shivlya.json",
        animationFile: "shivlinga1.json",
    }
};

// ✅ Reusable hook to automatically download + get playable URI for Lottie JSON
export const useAutoVideoDownload = (animationKey) => {
    const [source, setSource] = useState(null);
    const [loadingVideo, setLoadingVideo] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        const animation = animationData[animationKey];

        if (!animation) {
            console.error(`❌ No animation found for key: ${animationKey}`);
            setLoadingVideo(false);
            return;
        }

        (async () => {
            try {
                await DownloadManager.init();

                const local = await DownloadManager.getLocalPath(animation.animationId);
                if (!mounted) return;

                if (local) {
                    // ✅ Use local cached JSON file for Lottie
                    console.log("📂 Using local Lottie JSON:", local);
                    setSource({ uri: "file://" + local });
                } else {
                    // 🌐 Use remote JSON and download in background
                    console.log("🌐 Using remote Lottie JSON:", animation.animationUrl);
                    setSource({ uri: animation.animationUrl });

                    // Download JSON file in background
                    DownloadManager.preloadList(
                        [
                            {
                                id: animation.animationId,
                                url: animation.animationUrl,
                                filename: animation.animationFile,
                            },
                        ],
                        { wifiOnly: false, concurrent: 1 }
                    );
                }
            } catch (err) {
                console.error("❌ Error in useAutoVideoDownload:", err);
                if (mounted) {
                    setError(err.message);
                    // Fallback to remote URL
                    setSource({ uri: animation.animationUrl });
                }
            } finally {
                if (mounted) {
                    setLoadingVideo(false);
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [animationKey]);

    return { source, loadingVideo, error };
};

// ✅ Updated hook for Santan with better JSON handling
export const useSantanLocal = (item) => {
    const [localUri, setLocalUri] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchLocalUri = async () => {
            if (!item) {
                setLoading(false);
                return;
            }

            try {
                const filename = item.split('/').pop(); // e.g. "animation.json"
                console.log('📁 JSON File:', filename);

                const remoteUrl = item; // full remote path

                // Initialize DownloadManager once
                await DownloadManager.init();

                // Check if JSON file already downloaded
                const local = await DownloadManager.getLocalPath(filename);

                if (!mounted) return;

                if (local) {
                    console.log('📂 Using local JSON:', local);
                    setLocalUri('file://' + local);
                } else {
                    console.log('🌐 Using remote JSON:', remoteUrl);
                    setLocalUri(remoteUrl);

                    // Start background download for JSON
                    const animation = {
                        id: filename,
                        url: remoteUrl,
                        filename: filename,
                    };
                    DownloadManager.preloadList([animation], { wifiOnly: false, concurrent: 1 });
                }
            } catch (err) {
                console.error("❌ Error in useSantanLocal:", err);
                if (mounted) {
                    setError(err.message);
                    setLocalUri(item); // Fallback to original URL
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchLocalUri();

        return () => {
            mounted = false;
        };
    }, [item]);

    return { localUri, loading, error };
};

// ✅ Alternative hook specifically for Lottie animations
export const useLottieAnimation = (animationKey, customUrl = null) => {
    const [animationSource, setAnimationSource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const loadAnimation = async () => {
            try {
                setLoading(true);
                
                // If custom URL is provided, use it directly
                if (customUrl) {
                    console.log("🎨 Using custom Lottie URL:", customUrl);
                    setAnimationSource({ uri: customUrl });
                    setLoading(false);
                    return;
                }

                // Use predefined animation data
                const animation = animationData[animationKey];
                if (!animation) {
                    throw new Error(`No animation found for key: ${animationKey}`);
                }

                await DownloadManager.init();

                // Try to get local file first
                const localPath = await DownloadManager.getLocalPath(animation.animationId);
                
                if (!mounted) return;

                if (localPath) {
                    console.log("📂 Lottie using local file:", localPath);
                    setAnimationSource({ uri: "file://" + localPath });
                } else {
                    console.log("🌐 Lottie using remote URL:", animation.animationUrl);
                    setAnimationSource({ uri: animation.animationUrl });

                    // Download in background for next time
                    DownloadManager.preloadList(
                        [{
                            id: animation.animationId,
                            url: animation.animationUrl,
                            filename: animation.animationFile,
                        }],
                        { wifiOnly: false, concurrent: 1 }
                    );
                }
            } catch (err) {
                console.error("❌ Error loading Lottie animation:", err);
                if (mounted) {
                    setError(err.message);
                    // Fallback logic
                    const fallbackAnimation = animationData[animationKey];
                    if (fallbackAnimation) {
                        setAnimationSource({ uri: fallbackAnimation.animationUrl });
                    }
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        loadAnimation();

        return () => {
            mounted = false;
        };
    }, [animationKey, customUrl]);

    return { animationSource, loading, error };
};