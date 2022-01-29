module.exports = (mongoose) => {
  const Owner = mongoose.model(
    "owner",
    mongoose.Schema(
      {
        address: String,
        name: [String],
        dob: String,
        coordinates: [String],
      },
      { timestamps: true }
    )
  );

  return Owner;
};
