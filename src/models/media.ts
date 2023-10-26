import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  isTrending: {
    type: Boolean,
    required: true,
  },
  isBookmarked: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
