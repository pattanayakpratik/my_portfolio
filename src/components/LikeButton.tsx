"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, increment, getDoc, setDoc } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import { db, auth, isFirebaseConfigured } from "../firebase";
import { Heart } from "lucide-react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Fallback to localStorage if Firebase is not configured
    if (!isFirebaseConfigured || !auth || !db) {
      const storedIsLiked = localStorage.getItem("websiteIsLiked");
      if (storedIsLiked) setIsLiked(storedIsLiked === "true");
      return;
    }

    // Authenticate user anonymously
    const unsubscribeAuth = onAuthStateChanged(auth!, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check if user already liked
        const userLikeRef = doc(db!, "userLikes", currentUser.uid);
        const userLikeSnap = await getDoc(userLikeRef);
        if (userLikeSnap.exists() && userLikeSnap.data().hasLiked) {
          setIsLiked(true);
        }
      } else {
        signInAnonymously(auth!).catch(console.error);
      }
    });

    // Listen for realtime updates from Firestore
    const likeDocRef = doc(db!, "likes", "counter");
    const unsubscribeLikes = onSnapshot(likeDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const currentLikes = docSnap.data().likes;
        setLikes(() => Math.max(0, currentLikes));
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeLikes();
    };
  }, []);

  const handleLike = async () => {
    if (isProcessing || isLiked) return;

    // Optimistic Update
    const previousLikes = likes;
    setLikes((prev) => prev + 1);
    setIsLiked(true);
    setIsAnimating(true);
    
    if (!isFirebaseConfigured || !db || !user) {
      localStorage.setItem("websiteIsLiked", "true");
      setTimeout(() => setIsAnimating(false), 600);
      return;
    }

    // Reset animation after it finishes
    setTimeout(() => setIsAnimating(false), 600);

    try {
      setIsProcessing(true);
      
      // Update global counter (using setDoc with merge so it creates the document if not yet initialized)
      const likeDocRef = doc(db!, "likes", "counter");
      await setDoc(
        likeDocRef,
        {
          likes: increment(1),
        },
        { merge: true }
      );

      // Record that this specific user has liked it
      const userLikeRef = doc(db!, "userLikes", user.uid);
      await setDoc(userLikeRef, { hasLiked: true });
      
    } catch (error) {
      console.error("Error updating likes:", error);
      // Rollback on error
      setLikes(previousLikes);
      setIsLiked(false);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex items-center">
      <button
        onClick={handleLike}
        disabled={isProcessing || isLiked}
        className={`
          group relative h-10 px-4 flex items-center justify-center gap-2
          rounded-full transition-all duration-300 ease-in-out border bg-[var(--card-bg)] shadow-sm
          ${
            isLiked
              ? "border-[var(--sec)]/60 text-[var(--sec)] cursor-default shadow-[0_0_15px_-4px_rgba(34,211,238,0.3)]"
              : "border-[var(--white-icon-tr)] text-[var(--white-icon)] hover:text-[var(--white)] hover:border-[var(--sec)]/50 hover:scale-[1.02] cursor-pointer"
          }
          ${isAnimating ? "animate-heart-pulse" : ""}
        `}
      >
        <Heart
          className={`size-4 transition-all duration-300 ${
            isLiked
              ? "fill-[var(--sec)] text-[var(--sec)] scale-110"
              : "text-[var(--white-icon)] group-hover:text-pink-400 group-hover:scale-110"
          }`}
        />
        <span className="text-xs font-medium text-[var(--white)]">
          {isFirebaseConfigured || likes > 0 ? `${likes} Likes` : isLiked ? "Liked" : "Like Portfolio"}
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
