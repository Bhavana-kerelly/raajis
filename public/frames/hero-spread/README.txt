Drop the extracted frames from your "spotlight sweep across the full
spread" video here, named frame_001.jpg, frame_002.jpg, etc.

Then in src/components/Hero.jsx, set:
  const USE_CINEMATIC_SPREAD = true
  const SPREAD_FRAME_COUNT = <however many frames you have>

The hero text will automatically wait and fade in only after the
sweep finishes playing.
