// Banner background videos (optimised files in /public/videos, built by scripts/optimize-videos.mjs).
// Each clip has a matching .webp poster shown instantly while the video loads. Each clip is used on one page only.
const v = (slug: string) => `/videos/${slug}.mp4`;
export const posterOf = (clip: string) => clip.replace(/\.mp4$/, ".webp");
export const CLIP = {
  childrenPark: v("children-park"),
  city: v("city"),
  clubHouse: v("club-house"),
  entranceNight: v("entrance-night-view"),
  entrance: v("entrance"),
  house: v("house"),
  roundabout: v("no-name"),
  tennis: v("tennis"),
  cityBoards: v("city-name-boards"),
  family: v("family"),
  globe: v("globe"),
  openPlot: v("open-plot"),
  shakeHand: v("shake-hand"),
  youngerPeople: v("younger-people"),
  // logo intros, not used behind headings: logo, logo2, opening-shot, closing-video
};

/** Per-city banner clips (city pages share one template). */
export const CITY_CLIPS: Record<string, string[]> = {
  hyderabad: [CLIP.cityBoards, CLIP.entrance],
  visakhapatnam: [CLIP.entranceNight],
  vijayawada: [CLIP.house],
};
